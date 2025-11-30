const express = require("express")
const Router = express.Router()
const characterGalleryController = require("../Controllers/chracterGalleryController")
const uploads = require("../Middleware/upload");
const middleware = require("../Middleware/authMiddleware");

Router.post('/characterGallery', uploads.single('image'),middleware.authMiddleware,middleware.roleMiddleware("admin"), characterGalleryController.createCharacterGallery);
Router.get('/characterGallery', characterGalleryController.getAllCharacterGalleries);
Router.get('/characterGallery/:id', characterGalleryController.getAllCharacterGalleryById);
Router.put('/characterGallery/:id', uploads.single('image'),middleware.authMiddleware,middleware.roleMiddleware("admin"), characterGalleryController.updateCharacterGallery);
Router.patch('/characterGallery/toggle/:id',middleware.authMiddleware,middleware.roleMiddleware("admin"), characterGalleryController.toggleActiveStatus);
Router.delete('/characterGallery/:id',middleware.authMiddleware,middleware.roleMiddleware("admin"), characterGalleryController.deleteCharacterGallery);  

module.exports = Router