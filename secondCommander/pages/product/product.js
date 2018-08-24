// pages/product/product.js
const host = getApp().globalData.host;  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    cid: 1,
    qualityList:[],
    page: 0,
    windowHeight: '',
    flag: true
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id){
      this.setData({
        cid: options.id
      })
      wx.setNavigationBarTitle({
        title: options.title
      });
    }
    let that = this;
    wx.getSystemInfo({    //获取设备的高度
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
    
    this.getqualityList();
  },
  getqualityList() {
    if (!this.data.flag) {
      return;
    }
    this.setData({
      flag: false
    })
    let that = this;
    wx.request({
      url: host + '/getExchange', //仅为示例，并非真实的接口地址
      data: {
        cid: that.data.cid,
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var flag;
        if (res.data.length < 10) {
          flag = false;
        } else {
          flag = true;
        }
        let qualityList = that.data.qualityList.concat(res.data);
        that.setData({
          qualityList: qualityList,
          page: that.data.page + 1,
          flag: flag
        })
      }
    })
  },
  commodityDetails(e) {
    wx.navigateTo({
      url: '/pages/commodityDetails/commodityDetails?id=' + e.currentTarget.dataset.id,
    })
  }, 
  loderMoer() {
    this.getqualityList();
  }

  
})