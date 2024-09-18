const express = require("express")
const commentController = require("../controllers/commentController")
const commentRouter = express.Router()

commentRouter.route("/:id")
.post(commentController.addComment)

module.exports = commentRouter