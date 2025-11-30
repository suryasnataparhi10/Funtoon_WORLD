const CharacterGallery = require('../Models/CharacterGallery');

exports.createCharacterGallery = async(req, res) => {
    try {
        const { characterName, characterShow, description, powers, funFact, firstAppearance, color, category, voice, isActive } = req.body;
        const image = req.file? req.file.path.replace(/\\/g, '/') : null;

        const lastCharacter = await CharacterGallery.findOne().sort({id: -1}).exec();
        const newId = lastCharacter ? lastCharacter.id + 1 : 1;

        const newCharacterGallery = await CharacterGallery.create({
            id: newId,
            characterName, 
            characterShow,
            description,
            powers: JSON.parse(powers), 
            funFact,
            firstAppearance,
            color,  
            category,
            image: image,
            voice,
            isActive
        })

        res.status(201).json({
            success:true,
            newCharacterGallery
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


exports.getAllCharacterGalleries = async(req, res) => {
    try {
        const characterGalleries = await CharacterGallery.find().sort({id:1});
        res.status(200).json({
            totalCharacterGalleries : characterGalleries.length,
            characterGalleries
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getAllCharacterGalleryById = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const characterGallery = await CharacterGallery.findOne({id});
        if(!characterGallery){
            return res.status(404).json({
                message: "Character Gallery not found"
            })
        }

        res.status(200).json({
            success:true,
            characterGallery
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateCharacterGallery = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const characetrGallery = await CharacterGallery.findOne({id});

        if(!characetrGallery){
            return res.status(404).json({
                message:"Character Gallery is not found"
            })
        }

        const { characterName, characterShow, description, powers, funFact, firstAppearance, color, category, voice, isActive } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : characetrGallery.image;

        characetrGallery.characterName = characterName || characetrGallery.characterName;
        characetrGallery.characterShow = characterShow || characetrGallery.characterShow;
        characetrGallery.description = description || characetrGallery.description;
        characetrGallery.powers = powers ? JSON.parse(powers) : characetrGallery.powers;
        characetrGallery.funFact = funFact || characetrGallery.funFact;
        characetrGallery.firstAppearance = firstAppearance || characetrGallery.firstAppearance;
        characetrGallery.color = color || characetrGallery.color;
        characetrGallery.category = category || characetrGallery.category;
        characetrGallery.image = image;
        characetrGallery.voice = voice || characetrGallery.voice;
        characetrGallery.isActive = isActive !== undefined ? isActive : characetrGallery.isActive;

        await characetrGallery.save();

        res.status(200).json({
            success:true,
            characetrGallery
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


exports.toggleActiveStatus = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const characterGallery = await CharacterGallery.findOne({id});

        if(!characterGallery){
            return res.status(404).json({
                message:"Character Gallery not found"
            })
        }

        characterGallery.isActive = !characterGallery.isActive;
        await characterGallery.save();

        res.status(200).json({
            success:true,
            characterGallery
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })  
    }
}


exports.deleteCharacterGallery = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const characterGallery = await CharacterGallery.findOne({id});

        if(!characterGallery){
            return res.status(404).json({
                message:"Character Gallery not found"
            })
        }
        await CharacterGallery.findOneAndDelete({id});

        res.status(200).json({
            success:true,
            message:"Character Gallery deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })  
    }   
}