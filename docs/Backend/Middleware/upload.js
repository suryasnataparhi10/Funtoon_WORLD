const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, "uploads/")
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if(allowed.includes(file.mimetype)){
        cb(null, true)
    } else{
        cb(new Error("Only .jpeg, .jpg, .png files are allowed!"), false);
    }
}

const uploads = multer({storage, filefilter})
module.exports = uploads