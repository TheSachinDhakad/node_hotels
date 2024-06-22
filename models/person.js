const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    work: {
        type: String,
        enum: ["chef", "manager", "waiter"]
    },
    mobile: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true

    },
    salary: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const Person = mongoose.model("Person", userSchema)

module.exports = Person;