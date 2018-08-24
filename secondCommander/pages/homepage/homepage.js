// pages/homepage/homepage.js
const host = getApp().globalData.host;  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ClassificationList:[],
    qualityList:[],
    recommendationList:[],
    page:0,
    windowHeight:'',
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassificationList();
    this.getqualityList();
    this.getrecommendationList();
    let that= this;
    wx.getSystemInfo({    //获取设备的高度
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        }) 
      }
    })
  },
  getClassificationList() {
    let that = this ;
    wx.request({
      url: host+'/getClassification', //仅为示例，并非真实的接口地址
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
  getqualityList() {
    let that = this;
    wx.request({
      url: host + '/getExchange', //仅为示例，并非真实的接口地址
      data: {
        cid: 1
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
  getrecommendationList(){
    if (!this.data.flag){
      return ;
    }
    this.setData({
      flag:false
    })
    let that = this;
    wx.request({
      url: host + '/getrecommendation',
      data: {
        page: that.data.page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let recommendationList=that.data.recommendationList.concat(res.data);
        var flag;
        if(res.data.length<10){
          flag=false;
        }else{
          flag=true;
        }
        that.setData({
          recommendationList: recommendationList,
          page: that.data.page+1,
          flag: flag
        })
      }
    })
  },
 
  goDetail(e){
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.url + '&&title=' + e.currentTarget.dataset.title,
    })
  },

  commodityDetails(e) {
    wx.navigateTo({
      url: '/pages/commodityDetails/commodityDetails?id=' + e.currentTarget.dataset.id,
    })
  },
  loderMoer(){
    this.getrecommendationList();
  }

 
})