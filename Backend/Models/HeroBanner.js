const mongoose = require('mongoose');

const HeroBannerSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    watchUrl: {
        type: String,
        required: false,
    },
    isActive: {     
        type: Boolean,
        default: true,
    },  
}, { timestamps: true });

module.exports = mongoose.model('HeroBanner', HeroBannerSchema);