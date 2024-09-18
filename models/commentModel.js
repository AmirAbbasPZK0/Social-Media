const mongoose = require("mongoose")
const {UserSchema} = require('./userModel')

const CommentSchema = new mongoose.Schema(
    {
        description : {
            required : true,
            type : String
        },
        author : {
            type : UserSchema
        },
        post : {
            type : mongoose.Types.ObjectId,
        }
    },
    {
        timestamps : true
    }
)

const commentModel = mongoose.model("Comment" , CommentSchema)

module.exports = commentModel