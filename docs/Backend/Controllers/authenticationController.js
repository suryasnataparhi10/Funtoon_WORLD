const bcrypt = require("bcryptjs");
const User = require("../Models/authModel");
const jwt= require("jsonwebtoken")


exports.userRegister = async(req, res) => {
    try {
        const {userName, email, password, role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(404).json({
                messgae : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newuser = await User.create({
            userName,
            email,
            password: hashedPassword,
            role
        })

        res.status(201).json({
            success:true,
            newuser
        })
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}

exports.userLogin = async(req, res) => {
    try {
        const {email, password, role} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
            message : "User not found, Please register first"
            })
        }

        if(role && user.role !== role) {
            return res.status(403).json({
                message : "Access denied: Role mismatch"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }
        const token = jwt.sign({
            userId : user._id,
            email:user.email,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
        )

        res.status(200).json({
            success:true,
            message:"Login Successfully",
            token,
            user:{
                userId : user._id,
                userName : user.userName,
                email : user.email,
                role:user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.getAllUsers = async(req, res) => {
    try {
        const totalUsers = await User.find();
        res.status(200).json({
            sucess:true,
            totalUsers : totalUsers.length,
            totalUsers
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.deleteUserById = async(req, res) => {
    try {
        const {id} = req.params;

        const deletedUser = await User.findByIdAndDelete(id);
        
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
            deletedUser
        })  
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}