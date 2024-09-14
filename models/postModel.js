const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
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

PostSchema.virtual("comments" , {
    ref : "Comment",
    localField : "_id",
    foreignField : "post"
})

const postModel = mongoose.model("Post" , PostSchema)


module.exports = postModel