const e = require('express');
const mongoose = require('mongoose');
const CharacterGallerySchema = mongoose.Schema({
    id:{
        type: Number,   
        unique: true,
    },
    characterName: {
        type: String,       
        required: true,
        trim: true
    },
    characterShow: {
        type: String,
        required: true,
    },
    description: {
        type: String,   
        required: true, 
    },
    powers: {
        type: [String],
        required: true,
    },
    funFact: {
        type: String,
        required: true,
    },  
    firstAppearance: {
        type: Date,
        required: true, 
    },
    color: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['comedy', 'hero', 'mythology'],
        required: true, 
    },
    image: {
        type: String,
        required: true, 
    },
    voice: {
        type: String,   
        required: true,
    },
    isActive:{
        type: Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model('CharacterGallery', CharacterGallerySchema);