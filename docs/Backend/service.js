// require("dotenv").config()
// const express = require("express");
// const cors = require("cors");
// const db = require("./Utils/db");

// const app = express();
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET", "POST", "PUT", "DELETE"],
//     credentials:true    
// }))

// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use("/api/auth", require("./Router/authRouter"));
// app.use("/api", require("./Router/profileRoutes"));
// app.use("/api", require("./Router/heroBannerRoute"));
// app.use("/api", require("./Router/advertiseRoute"));
// app.use("/api", require("./Router/characterGalleryRoute"));

// app.get("/", (req, res) => {res.status(200).json({message:"Hello world"})});

// // const PORT = process.env.PORT || 5000;
// const PORT=5000;

// db().then(() => app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// }))
