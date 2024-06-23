const jwt = require("jsonwebtoken")
const { model } = require("mongoose")

const jwtAuth = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json("unauthorized")
    }

    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json("unauthorized")
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode
        next()

    } catch (error) {

        return res.status(401).json("unauthorized")

    }
}

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 30000
    })
}

module.exports = { jwtAuth, generateToken }