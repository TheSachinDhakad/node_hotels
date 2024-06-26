const express = require("express")

const bodyParser = require("body-parser")

const passport = require("./auth.js")

const db = require("./db")
require("dotenv").config()

const app = express();

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate("local", {

    session: false
})

const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")


app.get("/", (req, res) => {
    res.send("hello world")
})

app.use("/person", personRoutes)

app.use("/menu", menuRoutes)

app.listen(PORT, (req, res) => {
    console.log("server start...")
})