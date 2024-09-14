const express = require("express")
const userController = require("../controllers/userController")
const userRouter = express.Router()

userRouter.route("/edit")
.put(userController.editUser)


module.exports = userRouter