const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
   {
      userName : {
         type: String,
         require : true
      },
      email:{
         type: String,
         require: true
      },
      password:{
         type: String,
         require: true
      },
      role:{
         type:String,
         enum:["admin", "client"],
         default:"client"
      }
   },
   {
      timestamps: true
   }
)

const user = mongoose.model("User", UserSchema)

module.exports = user