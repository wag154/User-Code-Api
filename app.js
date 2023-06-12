const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json())

const auth_router = require("./routers/user_router")
app.get("/", (req,res)=>{
    res.send("Welcome")
})
app.use("/user",auth_router)
module.exports = app;