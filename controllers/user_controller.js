const User = require("../models/user_model");

const create = async(req,res)=>{
    try{
       const user_info = await User.add_user(req.body.username)
       res.json({"password": user_info[0], "code" : user_info[1]}).status(200)
    }
    catch(e){
        res.status(400).json({"message" : e});
    }
}
const check = async (req,res)=>{
    try{
        await User.check_pass(req.body.password) ? res.send("Success").status(200) : console.log("Hello"); res.status(400).send("Failed");
    }
    catch(e){
        console.log(e)
        res.status(400).json({message : e});
    }
}
module.exports = {
    create,
    check
}