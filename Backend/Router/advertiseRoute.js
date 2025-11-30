const express = require('express');
const Router = express.Router();
const advertiseController = require('../Controllers/advertiseController');
const uploads = require('../Middleware/upload');   
const middleware = require('../Middleware/authMiddleware'); 

Router.post('/advertise', uploads.single('image'),middleware.authMiddleware,middleware.roleMiddleware("admin"), advertiseController.createAdvertise);
Router.get('/advertise', advertiseController.getAllAdvertise);
Router.get('/advertise/:id', advertiseController.getAllAdvertisesById);
Router.put('/advertise/:id', uploads.single('image'),middleware.authMiddleware,middleware.roleMiddleware("admin"), advertiseController.updateAdvertise);
Router.patch('/advertise/toggle/:id',middleware.authMiddleware,middleware.roleMiddleware("admin"), advertiseController.toggleActiveStatus);
Router.delete('/advertise/:id',middleware.authMiddleware,middleware.roleMiddleware("admin"), advertiseController.deleteAdvertise);

module.exports = Router;