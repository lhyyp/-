// pages/photo/photo.js
const host = getApp().globalData.host;  

Page({

  /**
   * 页面的初始数据
   */
  data: {
     src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  toCamera(){
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        that.setData({
          src: tempFilePaths
        })
      }
    })
  },
  upload(){
    console.log(this.data.src)
    let that = this;
    var tempFilePaths = this.data.src
    wx.uploadFile({
      url: host + '/imgupload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      success: function (res) {
        var data = res.data;
        that.setData({
          src: tempFilePaths
        })
        //do something
      }
    })
  },
  doCode(){    //扫码
  let that=this;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        that.getProductInfo(res.result)

      }
    })
  },
  getProductInfo(code){
    wx.request({
      url: host +'/getProductInfo', //仅为示例，并非真实的接口地址
      data: {
        code: code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: '/pages/commodityDetails/commodityDetails?id=' + res.data[0].id,
        })
        
      }
    })
  }
})