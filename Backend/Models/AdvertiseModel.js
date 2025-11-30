const mongoose = require('mongoose');

const AdvertiseSchema = mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    name: {
        type: String,       
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    emoji:{
        type: String,
        default:"😊"
    },
    isActive:{
        type: Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Advertise', AdvertiseSchema);