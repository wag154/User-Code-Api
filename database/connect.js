const {Pool} = require("pg");
require("dotenv").config();

const db = new Pool({connectionString:process.env.Db_URL})
module.exports = db;