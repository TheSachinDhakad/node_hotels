const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    test: {
        type: String,
        enum: ["spicy", "salty", "sweet"],
        required: true

    },
    is_drink: {
        type: Boolean,
        default: false

    },
    ingridients: {
        type: [String],
        required: true,
        default: []
    }, sales: {
        type: Number,
        default: 0
    }

})

const Menu = mongoose.model("menu", menuSchema)

module.exports = Menu;