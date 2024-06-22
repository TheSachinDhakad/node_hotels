const express = require("express")

const bodyParser = require("body-parser")

const db = require("./db")





const app = express();

app.use(bodyParser.json())


const personRoutes = require("./routes/personRoutes")
const menuRoutes = require("./routes/menuRoutes")


app.get("/", (req, res) => {
    res.send("hello world")
})

app.use("/person", personRoutes)

app.use("/menu", menuRoutes)





app.listen(3000, (req, res) => {
    console.log("server start...")
})