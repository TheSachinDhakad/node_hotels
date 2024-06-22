const express = require("express")
const router = express.Router()
const Person = require("../models/person.js")

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const saveUser = await newPerson.save()

        res.status(201).json({
            data: saveUser
        })

    } catch (error) {
        res.status(400).send("data not inserted")

    }

})


router.get("/", async (req, res) => {
    try {
        const data = await Person.find();

        res.status(201).json({
            data: data
        })

    } catch (error) {
        res.status(400).send("data not found")

    }
})

router.get("/:worktype", async (req, res) => {
    try {
        const worktype = req.params.worktype;

        if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {

            const data = await Person.find({ work: worktype })

            res.status(201).json({
                data: data
            })

        } else {

            res.status(400).send("data not found")

        }

    } catch (error) {
        res.status(501).send("internal server error")

    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const data = req.body;

        const updatePerson = await Person.findByIdAndUpdate(id, data, {
            new: true,

            runValidators: true

        })

        if (!updatePerson) {
            return res.status(400).send("data not found")
        }

        res.status(201).json({
            data: updatePerson
        })

    } catch (error) {
        res.status(501).send("internal server error")

    }

})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletePerson = await Person.findByIdAndDelete(id)

        if (!deletePerson) {
            return res.status(400).send("data not found")
        }

        res.status(201).json({
            msg: "data deleted successfully"
        })

    } catch (error) {
        res.status(501).send("internal server error")

    }

})


module.exports = router;