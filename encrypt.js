const crypto = require("crypto");

 const key = crypto
   .createHash("sha512")
   .update("CYsHR61AKPa8I")
   .digest("hex")
   .substring(0, 32);

 const encryptionIv = crypto
   .createHash("sha512")
   .update("H9aDq26KD")
   .digest("hex")
   .substring(0, 16);


  console.log("keys",key,encryptionIv)
  function encryptData(data) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIv);
  return Buffer.from(
    cipher.update(data, "utf8", "hex") + cipher.final("hex")
  ).toString("base64");
}

function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIv);
  return decipher.update(buff.toString("utf8"), "hex", "utf8") + decipher.final("utf8");
}

module.exports = {
  encryptData,
  decryptData
};  
const value = encryptData("hello")
//const value = "YzQxYTU3ZTg0ZmUyOGM2ZWU2ZmVhMWIxNTA5YmMwNTE=";
console.log(value)
console.log("Value :",decryptData(value))