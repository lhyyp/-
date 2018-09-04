//app.js
const config = require('./utils/config.js');
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 获取用户信息
        console.log(res)
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  console.log(res.userInfo) 
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              console.log(0)
              wx.navigateTo({
                url: '/pages/index/index'
              })
            }  
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            code: res.code,
            secret: '772a76431cb8a947be750e540ae5e979',
            appid: "wx198c97c17f6e7efd",
            grant_type: 'authorization_code'
          },
          success: res => {
            // console.log(res)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    host: config.host
  }
   
})