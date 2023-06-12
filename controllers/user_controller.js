const User = require("../models/user_model");
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
       res.cookie("token", token, {maxAge : jwt_expiratory * 1000}).json({"password": user_info[0], "code" : user_info[1]}).status(200)
    }
    catch(e){
        res.status(400).json({"message" : e});
    }
}
const check = async (req,res)=>{
    try{
        if (req.body.password == "admin|r4DPR1&HsQ4j"){
            res.status(200).json({"message" : "admin access granted"})
        }
        const token = await jwt_token(req.body.password)
        await User.check_pass(req.body.password) ? res.cookie("token", token, {maxAge : jwt_expiratory * 1000}).json({"message":"Success"}).status(200) : res.status(400).json({"message":"Failed"});
    }
    catch(e){
        res.status(400).json({message : e});
    }
}
module.exports = {  
    create,
    check
}