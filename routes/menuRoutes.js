const express = require("express")
const router = express.Router()
const Menu = require("../models/menu")

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const newMenu = new Menu(data);

        const saveMenu = await newMenu.save()

        res.status(201).json({
            data: saveMenu
        })

    } catch (error) {
        res.status(400).send("data not inserted")

    }

})

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();

        res.status(201).json({
            data: data
        })

    } catch (error) {
        res.status(400).send("data not found")

    }
})
module.exports = router