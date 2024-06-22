const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/hotel", {})

const db = mongoose.connection;

db.on("connected", () => {
    console.log("database connected successfully...")
})

db.on("error", () => {
    console.log("database connection failed...")
})

module.exports = db;
