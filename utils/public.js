var CryptoJS = require('aes.js');  //引用AES源码js
let miyao = wx.getStorageSync('key')
var key = CryptoJS.enc.Utf8.parse('2506957b1ea89b71');//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse('0123456789');//十六位十六进制数作为秘钥偏移量
//解密方法
function Decrypt(word) {
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function Encrypt(word) {
  console.log(CryptoJS)
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  let hexStr = encrypted.ciphertext.toString()
  console.log('hexStr->' + hexStr);
  var oldHexStr = CryptoJS.enc.Hex.parse(hexStr);
  // 将密文转为Base64的字符串
  var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);
  console.log('base64Str->' + base64Str);
  return base64Str;
}

//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;
