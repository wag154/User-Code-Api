require("dotenv").config();
const fs = require("fs");
const db = require("./connect");
const sql = fs.readFileSync("database/database.sql").toString();
db.query(sql)
    .then((data) =>{
        db.end();
        console.log("Complete")    
    })
    .catch((error) => console.log("Failed :", error))