const {Router} = require("express");
const user_controller = require("../controllers/user_controller");

const user_router= Router();

user_router.post("/check", user_controller.check)
user_router.post("/create", user_controller.create)

module.exports = user_router;