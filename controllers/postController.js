const postModel = require("../models/postModel")

module.exports.getAll = async (req , res) => {
    
    const posts = await postModel.find({}).populate("author" , "username profile")

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


module.exports.getPost = async (req , res) => {
    
    const {id} = req.params

    const post = await postModel.findOne({_id : id}).populate("author").lean().populate("comments" , "description author")

    if(post){
        res.json(post)
    }

}