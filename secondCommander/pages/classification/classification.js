// pages/classification/classification.js
const host = getApp().globalData.host; 
Page({
  data: {
    ClassificationList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassificationList();
  },
  getClassificationList() {
    let that = this;
    wx.request({
      url: host + '/getClassification', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          ClassificationList: res.data
        })

      }
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.url + '&&title=' + e.currentTarget.dataset.title,
    })
  },
  
})