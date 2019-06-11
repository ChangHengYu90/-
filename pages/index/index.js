//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
var Dec = require('../../utils/public.js'); 
var CryptoJS = require('../../utils/aes.js')
Page({
  data: {
  
  },

  onLoad: function () {
    var that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp); 

    var oxNum = timestamp.toString(16);
    console.log(oxNum)
    let jmsj = timestamp + oxNum
    let mdjm = util.md5(jmsj).toLocaleLowerCase()
    console.log(mdjm)
    wx.request({
      url: 'http://39.98.179.244/service/config.initApp',
      method: 'post',
      data: {
        hextime: oxNum,
        token: mdjm
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      success: function (res) {
        console.log(res.data)
        that.getMarketStatus()
        wx.setStorageSync('key', res.data.data.mcryptKey.mcrypt_key)
  
      }
    })
  },
  getMarketStatus(){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    var oxNum = timestamp.toString(16);
    console.log(oxNum)
    let jmsj = timestamp + oxNum
    let mdjm = util.md5(jmsj).toLocaleLowerCase()
    console.log(mdjm)
    let json = {
      hextime: oxNum,
      token: mdjm
    }
    let jsonstr = JSON.stringify(json);
    let keystr = timestamp + '|' + jsonstr
    console.log(keystr)
    let a = Dec.Encrypt(keystr)
    a = a.replace(/\+/g, '-');
    a = a.replace(/\//g, '_');
    console.log(a)
    wx.request({
      url: 'http://39.98.179.244/service/config.getMarketStatus',
      method: 'post',
     
      header: {
        'En-Params': a,
        "Content-Type": "application/json"

      },
      success: function (res) {
        console.log(res.data)
      
        // mcrypt_key: "2506957b1ea89b71

        // 是否显示营销数据。
        // config.getMarketStatus

        // timeSp 当前时间戳
        // timeSpHex  当前时间戳的十六进制
        // token = md5(timeSp + timeSpHex)

        // json = { “hextime”: timeSpHex, ”token”: token }

        // keystr = “timeSp | json”, 用竖杠将timeSp和json进行连接，生成待aes加密的明文

        // 用加密密钥，对keystr进行AES加密(AES128，PKCS7Padding，ECBMode) 。加密iv（向量）: ”0123456789”

        // 对加密的结果（字符串）做如下操作：

        // + 替换成 -
        //   /  替换成 _


        // 把操作后的加密串，放到 header中，HeaderKey 为  En - Params。

        // 然后进行post请求
      }
    })
  }
})
