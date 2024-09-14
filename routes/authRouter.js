const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/authController")


authRouter.route("/signup")
.post(authController.register)

authRouter.route("/login")
.post(authController.logIn)

authRouter.route("/me")
.get(authController.getUser)

module.exports = authRouter