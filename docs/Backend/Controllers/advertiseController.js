const Advertise = require("../Models/AdvertiseModel");

exports.createAdvertise = async (req, res) => {
    try {
        const { name, description, emoji, isActive } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, "/") : null;  
        const lastAdvertise = await Advertise.findOne().sort({ id: -1 }).exec();
        const newId = lastAdvertise ? lastAdvertise.id + 1 : 1; 
        const advertise = await Advertise.create({
            id: newId,
            name,
            description,
            image,
            emoji,
            isActive: isActive !== undefined ? isActive : true
        });
        const data = {
            _id: advertise._id,
            id: advertise.id,
            name: advertise.name,
            description: advertise.description,
            image: advertise.image,
            emoji: advertise.emoji,
            isActive: advertise.isActive,
            createdAt: advertise.createdAt,
            updatedAt: advertise.updatedAt
        };  
        res.status(201).json({
            success: true,
            data
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

exports.getAllAdvertise = async (req, res) => {
    try {
        const advertise = await Advertise.find({isActive:true}).sort({ id: 1 });      
        res.status(200).json({
            totalAdvertise: advertise.length,
            advertise
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }           
};  


exports.getAllAdvertisesById = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const advertise = await Advertise.findOne({id});
        if(!advertise){
            return res.status(404).json({
                message:"Advertise not found"
            })
        }

        res.json({
            success:true,
            advertise
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.updateAdvertise = async(req, res) => {
    try {
        const id = parseInt(req.params.id);   
        const advertise = await Advertise.findOne({id});
        if(!advertise){
            return res.status(404).json({
                message : "Advertise not found"
            })
        }   

        const { name, description, emoji, isActive  } = req.body;

        const image = req.file ? req.file.path.replace(/\\/g, "/") : advertise.image;   
        advertise.name = name || advertise.name;
        advertise.description = description || advertise.description;
        advertise.image = image;
        advertise.emoji = emoji || advertise.emoji;
        advertise.isActive = isActive !== undefined ? isActive : advertise.isActive;

        await advertise.save();

        res.status(200).json({
            success:true,
            advertise
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })      
    }   
}

exports.toggleActiveStatus = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const advertise = await Advertise.findOne({id});

        if(!advertise){
            return res.status(404).json({
                message : "Advertise not found"
            })
        }
        advertise.isActive = !advertise.isActive
        await advertise.save();
        res.status(200).json({
            success:true,
            advertise
        })      
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteAdvertise = async(req, res) => {
    try {
        const id = parseInt(req.params.id);       
        const advertise = await Advertise.findOne({id});
        if(!advertise){
            return res.status(404).json({
                message : "Advertise not found"
            })
        }

        await Advertise.findOneAndDelete({id});

        res.status(200).json({
            success:true,
            message:"Advertise deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })      
    }   
}