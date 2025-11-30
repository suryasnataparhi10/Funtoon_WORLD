require("dotenv").config()
const express = require("express");
const authRouter = require("./Router/authRouter");
const app = express();
const router = express.Router()
const database = require("./Utils/db")
const cors = require("cors")


const authRoute = require('./Router/authRouter');
const profile = require("./Router/profileRoutes");
const heroBannerRoute = require("./Router/heroBannerRoute");
const adventureRoute = require("./Router/advertiseRoute");
const characterGalleryRoute = require("./Router/characterGalleryRoute");

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/auth", authRoute)
app.use("/api", profile)
app.use("/api", heroBannerRoute);
app.use("/api", adventureRoute)
app.use("/api", characterGalleryRoute);

app.get("/",(req, res) => {
    res.status(200)
    .json({
        success:true,
        message:"Hello World"
    })
    // .send("Hello Developers")
})

app.get("/surya", (req, res) => {
    res.status(200).json({message:"Hello Suryasnata, You successfully doen the first step."})
})

PORT = 5000

database().then(
    app.listen(PORT, () =>{
         console.log(`Server is running on port ${PORT}`)
    })
)
