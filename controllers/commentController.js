const commentModel = require("../models/commentModel")
const {userModel} = require("../models/userModel")

module.exports.addComment = async (req , res) => {

    const {id} = req.params

    const {description , author} = req.body

    const authorDetails = await userModel.findOne({_id : author})

    const comment = await commentModel.create({
        description,
        author : authorDetails,
        post : id
    })

    if(comment){
        res.json({message : authorDetails})
    }

}