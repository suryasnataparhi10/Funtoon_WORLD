const userProfile = require("../Models/profileModel")

const calculateAge = (dob) => {
    const birthDate = new Date(dob) ; 
    const todayDate = new Date();

    let age = todayDate.getFullYear() - birthDate.getFullYear();
    
    const monthDiffernece = todayDate.getMonth() - birthDate.getMonth();

    if(monthDiffernece < 0 || (monthDiffernece === 0 && (todayDate.getDate() - birthDate.getDate()) < 0)){
        age--;
    }    
    return age;
}


const createprofile = async(req, res) => {
    try {
        const {name, dob} = req.body;
        const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
        const age = calculateAge(dob)
        const newUserProfile = await userProfile.create({
            name,
            dob,
            age,
            image : imagePath
        })

        res.status(201).json({
            data:newUserProfile
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message:{error}
        })
    }
}

const getUserProfile = async(req, res) => {
    try {
        const totalProfile = await userProfile.find();
        res.status(200).json({
            totalProfiles : totalProfile.length,
            totalProfile
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message:{error}
        })
    }
}

module.exports = {createprofile, getUserProfile}