// pages/commodityDetails/commodityDetails.js
const host = getApp().globalData.host; 
const helper = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CommodityDetailsList:'',
    id: 1    //商品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        id: options.id
      })
    }
    this.getCommodityDetails();
  },
  getCommodityDetails() {
    let that = this;
    wx.request({
      url: host + '/getCommodityDetails', //仅为示例，并非真实的接口地址
      data:{
        id:that.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          CommodityDetailsList: res.data
        })

      }
    })
  },
  goShoppingCart(){
    wx.switchTab({
      url: "/pages/ShoppingCart/ShoppingCart",
    })
  },
  addShoppingCart(){
    console.log(this.data.CommodityDetailsList)
    helper.addcart(this.data.CommodityDetailsList[0])
  }
})