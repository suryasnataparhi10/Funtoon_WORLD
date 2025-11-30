// const express = require("express");
// const router = express.Router();
// const auth = require("../Controllers/authController")

// // router.get("/", (req, res) =>{
// //     res.status(200)
// //     .send("Hello Suryasnata, What's Up")
// // })
// router.post("/register", auth.register)
// router.get("/getUsers", auth.getAllUsers)
// router.get("/getById/:id", auth.getUserById)
// router.delete("/:id", auth.deteteUserById)
// router.put("/updateuser/:id", auth.updateuser)
// router.post("/login", auth.login)
// // router.get("/", auth.auth)

// module.exports = router


const express = require("express");
const Router = express.Router();
const authenticationController = require("../Controllers/authenticationController");
const middleware = require("../Middleware/authMiddleware");

Router.post("/user-register", authenticationController.userRegister);
Router.post("/user-login", authenticationController.userLogin);
Router.get("/get-users",middleware.authMiddleware,middleware.roleMiddleware("admin"),authenticationController.getAllUsers);
Router.delete("/delete-user/:id", middleware.authMiddleware, authenticationController.deleteUserById);

module.exports = Router;