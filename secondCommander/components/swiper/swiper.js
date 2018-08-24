// components/swiper/seiper.js
const config= require('../../utils/config.js');
const host =config.host;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    BannerList: []
  },
  ready: function () {
    this.getBannerList();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getBannerList(){
      let that = this;
      wx.request({
        url: host+'/getbanner', //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            BannerList: res.data
          });
        }
      })
    },
    runDetail(e){
      wx.navigateTo({
        url: '/pages/new/new?id=' + e.currentTarget.dataset.url,
      })
    }
    
    
  }
})
