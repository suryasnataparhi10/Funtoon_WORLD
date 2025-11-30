const mongoose = require("mongoose");

const profile = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type: String,
        require:true
    },
    age:{
        type:Number,
        require:false
    },
    image:{
        type:String,
        require:true
    }
})

const userProfile = mongoose.model("Profile", profile);

module.exports = userProfile