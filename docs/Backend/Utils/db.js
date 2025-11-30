const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

const connectionDB = async() => {
    try {
        if(!dbURI){
            console.log("MONGO_URI is not defined in environment variables");
            process.exit(1);
        }
        await mongoose.connect(dbURI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Database connected successfully");
        return mongoose.connection;
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

module.exports = connectionDB;