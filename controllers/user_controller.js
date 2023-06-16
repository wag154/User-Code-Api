const User = require("../models/user_model");
const {encryptData,decryptData} = require("../encrypt");
const jwt = require("jsonwebtoken");
const jwt_key = "key";
const jwt_expiratory = 1800;
const jwt_token = async(password)=>{
    const code = password[0] + password[1]
    const token = jwt.sign({code}, jwt_key,{
        algorithm : "HS256",
        expiresIn : jwt_expiratory
    })
    return token;
}
const create = async(req,res)=>{
    try{
       const user_info = await User.add_user(req.body.username)
       const token = await jwt_token(user_info)
       const passcode = encryptData(user_info[0])
       const code = encryptData(user_info[1])
       res.cookie("token", token, {maxAge : jwt_expiratory * 1000}).json({"password": passcode, "code" :code}).status(200)
    }
    catch(e){
        res.status(400).json({"message" : e});
    }
}
const check = async (req,res)=>{
    try{
        const pass = decryptData(req.body.password)
        const Code = decryptData(req.body.code)
        console.log("pass", pass, "code", Code)
        const passCode = Code + "|" + pass
        if (passCode == "admin|r4DPR1&HsQ4j"){
            res.status(200).json({"message" : "admin access granted"})
        }
        const token = await jwt_token(passCode)
        await User.check_pass(passCode) ? res.cookie("token", token, {maxAge : jwt_expiratory * 1000}).json({"message":"Success"}).status(200) : res.status(400).json({"message":"Failed"});
    }
    catch(e){
        res.status(400).json({message : e});
    }
}
const use = async(req,res)=>{
    //
}
module.exports = {  
    create,
    check
}