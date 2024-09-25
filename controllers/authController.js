const authConfig = require("../configs/auth")
const {userModel} = require("../models/userModel")

module.exports.register = async (req , res) => {
    
    const {firstname , lastname , email , password , username} = req.body

    const isUserExists = await userModel.findOne({
        $or : [{username} , {email}]
    })

    if(isUserExists){

        res.json({message : "The Username or Email has alredy been taken!"})

    }else{

        const hashedPassword = await authConfig.hashPass(password)

        const createUser = await userModel.create({
            username,
            email,
            password : hashedPassword,
            firstname,
            lastname
        })

        if(createUser){
            const token = authConfig.generateToken({email})
            res.json({token})
        }

    }

}


module.exports.logIn = async (req , res) => {
    
    const {connector , password} = req.body

    const user = await userModel.findOne({
        $or : [{username : connector} , {email : connector}]
    })

    if(!user){
        res.status(404).json({message : "This User Does not Exists"})
    }else{
        const isPasswordValid = await authConfig.verifyPass(password , user?.password)
        if(isPasswordValid){
            const token = authConfig.generateToken({email : user.email})
            res.json({token})
        }else{
            res.status(401).json({message : "Username or Passsword is not Correct"})
        }
    }

}

module.exports.getUser = async (req , res) => {

    const token = req.headers.authorization

    const tokenPayload = authConfig.takePayloadFromToken(token)

    if(!tokenPayload){
        res.status(401).json({message : "Unauthorized"})
    }else{
        if(!tokenPayload.exp){
            res.status(401).json({message : "Token Expired"})
        }else{

            const user = await userModel.findOne({
                $or : [{email : tokenPayload?.email}]
            })
        
            if(user){
                res.json(user)
            }    
        }
    }
}