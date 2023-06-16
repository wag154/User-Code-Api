const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const {encryptData,decryptData} = require("./encrypt")

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.post("/yes",(req,res)=>{
    res.send(encryptData(req.body.content))
})
app.post("/no",(req,res)=>{
    res.send(decryptData(req.body.content))
})
const auth_router = require("./routers/user_router")
app.get("/", (req,res)=>{
    res.send("Welcome")
})
app.use("/user",auth_router)
module.exports = app;