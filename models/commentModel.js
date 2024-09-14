const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema("Comment",{
    description : {
        required : true,
        type : String
    },
    author : {
        required : true,
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
})

const commentModel = mongoose.model("Comment" , CommentSchema)

module.exports = commentModel