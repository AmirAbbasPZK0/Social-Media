const {userModel} = require("../models/userModel")
const authConfig = require("../configs/auth")

module.exports.editUser = async (req , res) => {
    
    const {firstname, lastname, email, username, _id , profile} = req.body

    const user = await userModel.findOneAndUpdate({_id} , {
        firstname,
        email,
        lastname,
        username,
        profile
    })

    if(user){
        res.json({message : "User Updated Successfully"})
    }else{
        res.status(409).json({message : "Unknown Error"})
    }

}