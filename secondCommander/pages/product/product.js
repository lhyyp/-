// pages/product/product.js
const host = getApp().globalData.host;  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    cid: '',
    qualityList:[]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.getqualityList();
  },
  getqualityList() {
    let that = this;
    wx.request({
      url: host + '/getExchange', //仅为示例，并非真实的接口地址
      data: {
        cid: that.data.cid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          qualityList: res.data
        })
      }
    })
  },

  
})