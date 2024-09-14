const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    firstname : {
        required : true,
        type : String
    },
    lastname : {
        required : true,
        type : String
    },
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String
    },
    profile : {
        required : false,
        type : String
    }
})

const userModel = mongoose.model("User" , UserSchema)


module.exports = userModel