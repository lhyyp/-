const host = getApp().globalData.host;   
const helper = {
  addcart:(obj)=>{
    wx.request({
      url: host + '/addcart', //仅为示例，并非真实的接口地址
      data: {
        data: obj,
        openid: getApp().globalData.userInfo.nickName
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.switchTab({
          url: "/pages/ShoppingCart/ShoppingCart",
        })
      }
    })
  }
}
module.exports = helper;