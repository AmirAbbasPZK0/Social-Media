const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/postController")

postRouter.route('/')
.get(postController.getAll)
.post(postController.add)

module.exports = postRouter