const express = require("express")
const router = express.Router()
const Person = require("../models/person.js")

const { jwtAuth, generateToken } = require("../jwt.js")

router.post("/signup", async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);



        const saveUser = await newPerson.save()

        const payload = {
            id: saveUser._id,
            username: saveUser.username

        }

        const token = await generateToken(payload)



        res.status(201).json({
            data: saveUser,
            token: token
        })

    } catch (error) {
        res.status(400).send("data not inserted")

    }

})

router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await Person.findOne({ username });

        const isPasswordMatch = await user.comparePassword(password);

        if (!user || !isPasswordMatch) {
            return res.status(401).send("invalid username or password");
        }

        const payload = {
            id: user._id,
            username: user.username
        }

        const token = await generateToken(payload)

        res.status(201).json({
            token: token
        })
    } catch (error) {
        res.status(501).send("internal server error")
    }
})


router.get('/profile', jwtAuth, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.user.id;  // Corrected path to user ID
        // console.log("User ID: ", userId);
        const user = await Person.findById(userId);
        // console.log("User: ", user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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