const db = require("../database/connect");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class User{
    constructor ({id,username, user_password}){
        this.id = id;
        this.username = username,
        this.user_password = user_password
    }
    static async add_user (username){
        const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYRZ"
        const letters = "abcdefghijklmnopqrstuvwxyrz"
        const numbers = "0123456789"
        const symbols = "#~@+-£$%&"
        let gen_code = ""
        for (let i = 0; i != 10 ; i++){
            const randomChoice = Math.floor(Math.random()*4)
            switch (randomChoice){
                case 0:
                    gen_code += LETTERS[Math.floor(Math.random()*LETTERS.length)]
                    break;
                case 1: 
                    gen_code += letters[Math.floor(Math.random()*letters.length)]
                    break;
                case 2:
                    gen_code += numbers[Math.floor(Math.random()*numbers.length)]
                    break;
                case 3: 
                    gen_code += symbols[Math.floor(Math.random()*symbols.length)]
                    break;
                default:
                    throw new Error("Index out of range")
                }
            }
        let new_gen_pass = ""
        for (let i = 0; i != 18 ; i++){
            const randomChoice = Math.floor(Math.random()*4)
            switch (randomChoice){
                case 0:
                    new_gen_pass += LETTERS[Math.floor(Math.random()*LETTERS.length)]
                    break;
                case 1: 
                    new_gen_pass += letters[Math.floor(Math.random()*letters.length)]
                    break;
                case 2:
                    new_gen_pass += numbers[Math.floor(Math.random()*numbers.length)]
                    break;
                case 3: 
                    new_gen_pass += symbols[Math.floor(Math.random()*symbols.length)]
                    break;
                default:
                    throw new Error("Index out of range")
                }
        }
        const salt = await bcrypt.genSalt();
        let hashed = await bcrypt.hash(new_gen_pass,salt);
        try{
            const res = await db.query("INSERT INTO example(username,user_password,gen_code) VALUES ($1,$2,$3)",[username,hashed,gen_code])
            return [new_gen_pass,gen_code];
        }
        catch (e){
            throw new Error(e)
        }
    }
    static async check_pass(code){
        try{
            const new_code = code.split("|")
            const gen_code = new_code[0];
            const gen_pas = new_code[1];
            
            const resp = await db.query("SELECT user_password FROM example WHERE gen_code = $1;",[gen_code])
            if (resp.rowCount != 0){
                const hashed_code = resp.rows[0].user_password
                const matched = await bcrypt.compare(gen_pas,hashed_code)
                return matched;
            }
            return false;
        }
        catch(e){
            throw new Error(e)
        }
    }
}
module.exports = User;
