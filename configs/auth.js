const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")

exports.generateToken = (data) => {
    const token = jwt.sign({...data} , "my_private_key" , {expiresIn : "24h"})
    return token
}

exports.hashPass = async (password) => {
    const hashedPass = await bcryptjs.hash(`${password}` , 12)
    return hashedPass
}

exports.verifyPass = async (password , hashedPassword) => {
    const isValid = await bcryptjs.compare(password , hashedPassword)
    return isValid
}

exports.takePayloadFromToken = (token) => {
    try{
        const tokenPayload = jwt.verify(token , "my_private_key")
        return tokenPayload
    }catch(err){
        console.log(err)
    }
}