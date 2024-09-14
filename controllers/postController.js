const postModel = require("../models/postModel")

module.exports.getAll = async (req , res) => {
    
    const posts = await postModel.find({}).populate("author" , "username profile -_id")

    if(posts){
        res.json(posts)
    }

} 

module.exports.add = async (req , res) => {

    const {description , author} = req.body

    const createPost = await postModel.create({
        description,
        author
    })

    if(createPost){
        res.json({message : "Post Has Been Submited"})
    }

}