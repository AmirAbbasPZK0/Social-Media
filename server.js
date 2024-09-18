const express = require("express")
const authRouter = require("./routes/authRouter")
const cors = require("cors")
const uploader = require("./middlewares/multer")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")
const http = require("http")
const commentRouter = require("./routes/commentRouter")


require("./configs/connection")

const corsOptions = { 
    origin : "http://localhost:5173"
}

const port = 8000

const app = express()

const server = http.createServer(app)

app.use(express.static("uploads/profiles/"))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/posts" , postRouter)
app.use("/api/comments" , commentRouter)

app.use("/api/user/upload-profile" , uploader.single("profile"), async (req , res) => {
    res.json(req.file)
})

server.listen(port , () => {
    console.log(`Server is Running on port ${port}`)
})