// require("dotenv").config()
// const User = require("../Models/authModel")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// const register = async(req, res) => {
//     try {
//         const {userName, email, password} = req.body
//         const exist = await User.findOne({email});
//         if (exist) {
//             return res.status(400).json({ message: "Email Already Exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt)
//         const newUser =await User.create({
//             userName,
//             email,
//             password :hashedPassword
//         })
//         const data = {           
//             _id : newUser._id, 
//             userName:newUser.userName,
//             email:newUser.email,
//             // password:newUser.password,
//             createdAt: newUser.createdAt,
//             updatedAt:newUser.updatedAt
//         }
//         res.status(201).json({
//             success:true,
//             data
//         })
//     } catch (error) {
//         console.log(error.message);
//         res.status(404).json({
//             message:"Route not found"
//         })
//     }
// }

// const getAllUsers = async(req, res) => {
//     try {
//         const totalusers = await User.find();
//         res.status(200).json({
//             totalUssers: totalusers.length,
//             totalusers
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const getUserById = async(req, res) => {
//     try {
//         const {id} = req.params;
//         const user = await User.findById(id);
//         if(!user){
//             return res.status(404).json({
//                 message:"User not found"
//             })
//         }
//         res.status(200).json({
//             user
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const deteteUserById = async(req, res) => {
//     try {
//         const {id} = req.params;
//         const user = await User.findById(id);
//         if(!user){
//             return res.status(404).json({
//                 message:"User not found"
//             })
//         }

//         await User.findByIdAndDelete(id)
//         res.status(200).json({
//             message:"User Deleted Successfully"
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const updateuser = async(req, res) => {
//     try {
//         const {userName, email, password} = req.body;
//         const {id} = req.params

//         const findUser = await User.findById(id);
//         if(!findUser){
//             res.status(404).json({
//                 message:"User Not Found"
//             })
//         }
//         if(userName) findUser.userName = userName
//         if(email) findUser.email = email
//         if(password) {
//             const salt = await bcrypt.genSalt(10)
//             const hashedPassword = await bcrypt.hash(password, salt)
//             findUser.password = hashedPassword
//         }

//         const updatedUser = await findUser.save()
        
//         const data = {           
//             _id : updatedUser._id, 
//             userName:updatedUser.userName,
//             email:updatedUser.email,
//             // password:updatedUser.password,
//             createdAt: updatedUser.createdAt,
//             updatedAt:updatedUser.updatedAt
//         }

//         res.status(200).json({
//             success:true,
//             data
//         })
//     } catch (error) {
        
//     }
// }


// const login = async(req, res) => {
//     try {
//         const{email, password} = req.body;
//         const user = await User.findOne({email})

//         if(!user){
//           return  res.status(404).json({
//                 message:"User not found"
//             })
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             res.status(400).json({
//                 message:"Invalid Credential"
//             })
//         }

//         const token = jwt.sign(
//             {id:user._id, email:user.email},
//             process.env.JWT_SECRET,
//             {expiresIn:process.env.JWT_EXPIRE || "1d"}
//         )
//         res.status(200).json({
//             success:true,
//             message:"Login Successfully",
//             token,
//             user:{                
//                 id: user._id,
//                 userName: user.userName,
//                 email: user.email,
//                 createdAt: user.createdAt,
//             }
//         })
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({ message:"Server error", error: error.message })
//     }
// }
// module.exports = {register, getAllUsers, getUserById, deteteUserById, updateuser, login}