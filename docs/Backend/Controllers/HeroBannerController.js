const HeroBanner = require('../Models/HeroBanner');

exports.createHeroBanner = async(req, res) => {
    try {  
        const { title, subtitle, watchUrl, isActive } = req.body;
        const imageUrl = req.file? req.file.path.replace(/\\/g, "/"): null;

        const lastBanner = await HeroBanner.findOne().sort({ id: -1 }).exec();
        const newId = lastBanner ? lastBanner.id + 1 : 1
        const heroBanner = await HeroBanner.create({
            id: newId,
            title,
            subtitle,
            imageUrl : imageUrl,   
            watchUrl,            
            isActive
        })

        const data = {
            _id: heroBanner._id,
            id: heroBanner.id,
            title: heroBanner.title,
            subtitle: heroBanner.subtitle,      
            imageUrl: heroBanner.imageUrl,
            watchUrl: heroBanner.watchUrl,
            isActive: heroBanner.isActive,
            createdAt: heroBanner.createdAt,
            updatedAt: heroBanner.updatedAt
        }

        res.status(201).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

exports.getAllHeroBanners = async(req, res) => {
    try {
        const heroBanners = await HeroBanner.find().sort({id:1});
        res.status(200).json({
            totalHeroBanners : heroBanners.length,
            heroBanners
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.getHeroBannerById = async(req, res) => {
    try {
        const {id} = parseInt(req.params.id);  
        const heroBanner = await HeroBanner.findOne({id:id});
        if(!heroBanner){
            return res.status(404).json({
                message : "Hero Banner not found"
            })
        
        }
        res.status(200).json({
            heroBanner
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })      
    }   
}

exports.updateHeroBanner = async(req, res) => {
    try {
        const {id} = parseInt(req.params.id);
        const heroBanner = await HeroBanner.findOne(id);
        if(!heroBanner){
            return res.status(404).json({
                message : "Hero Banner not found"
            })
        }

        const { title, subtitle, watchUrl,  isActive } = req.body;
        const imageUrl = req.file? req.file.path.replace(/\\/g, "/"): heroBanner.imageUrl;

        heroBanner.title = title || heroBanner.title;
        heroBanner.subtitle = subtitle || heroBanner.subtitle;
        heroBanner.imageUrl = imageUrl;
        heroBanner.watchUrl = watchUrl || heroBanner.watchUrl;
        heroBanner.isActive = isActive !== undefined ? isActive : heroBanner.isActive;

        await heroBanner.save();

        res.status(200).json({
            success:true,
            heroBanner
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })      
    }
}

exports.deleteHeroBanner = async(req, res) => {
    try {
        const {id} = parseInt(req.params.id);
        const heroBanner = await HeroBanner.findOne(id);
        if(!heroBanner){
            return res.status(404).json({
                message:"Hero Banner not found"
            })
        }

        await HeroBanner.findByIdAndDelete(id);
        res.status(200).json({
            message:"Hero Banner Deleted Successfully"
        })  
    } catch (error) {
        res.status(500).json({
            error:error.message
        })  
    }
}
