const express = require("express");
const Router = express.Router();
const heroBannerController = require("../Controllers/HeroBannerController");
const uploads = require("../Middleware/upload");
const middleware = require("../Middleware/authMiddleware");

Router.post("/hero-banner",uploads.single("imageUrl"),middleware.authMiddleware,middleware.roleMiddleware("admin"), heroBannerController.createHeroBanner);
Router.get("/hero-banner", heroBannerController.getAllHeroBanners);
Router.get("/hero-banner/:id", heroBannerController.getHeroBannerById);
Router.put("/hero-banner/:id",uploads.single("imageUrl"),middleware.authMiddleware,middleware.roleMiddleware("admin"), heroBannerController.updateHeroBanner);
Router.delete("/hero-banner/:id",middleware.authMiddleware,middleware.roleMiddleware("admin"), heroBannerController.deleteHeroBanner);

module.exports = Router;