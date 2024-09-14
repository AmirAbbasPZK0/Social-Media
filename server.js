const express = require("express")
const authRouter = require("./routes/authRouter")
const cors = require("cors")
const uploader = require("./middlewares/multer")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")


require("./configs/connection")

const corsOptions = { 
    origin : "http://localhost:5173"
}

const port = 8000

const app = express()


app.use(express.static("uploads/profiles/"))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded())


app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/posts" , postRouter)

app.use("/api/user/upload-profile" , uploader.single("profile"), async (req , res) => {
    console.log(res.file)
    res.json(req.file)
})

app.listen(port , () => {
    console.log(`Server is Running on port ${port}`)
})