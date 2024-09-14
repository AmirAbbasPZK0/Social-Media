const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null , "uploads/profiles/")
    },
    filename : function(req , file , cb){
        const filename = Date.now() + Math.random()
        const ext = path.extname(file.originalname)
        cb(null , `${filename}${ext}`)
    }
})


const uploader = multer({storage})

module.exports = uploader