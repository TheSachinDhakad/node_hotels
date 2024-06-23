const mongoose = require("mongoose")
require("dotenv").config()
MONGO_URL = process.env.MONGO_URL

// mongoose.connect(MONGO_URL, {})
mongoose.connect("mongodb://localhost:27017/hotel", {})


const db = mongoose.connection;

db.on("connected", () => {
    console.log("database connected successfully...")
})

db.on("error", () => {
    console.log("database connection failed...")
})

module.exports = db;
