// pages/ShoppingCart/ShoppingCart.js
const host = getApp().globalData.host;  
const helper = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getlist:[],
    isclose:true,
    isreduce: true,
    isShow:true,
    userInfo:{},
    hasUserInfo: false,
    Statistics:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          getApp().globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (this.data.isclose){
      this.getlist();   
      this.setData({
        isclose: false
      })
    }
    
  },
  onShow: function () {
    if (!this.data.isclose) {
      this.getlist();
    }
  },
  getlist(){
    wx.request({
      url: host + '/getShoppingCartlist?openid=' + this.data.userInfo.nickName, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:  (res) => {
        for (var i = 0; i < res.data.length;i++){
          res.data[i].checked=true
        }
        this.setData({
          getlist: res.data
        },()=>{
          this.isShow();
          this.Statistics();
        })

      }
    })
  },
  reduce(e){
    var number = this.data.getlist[e.currentTarget.dataset.index].number;
    if(this.data.isreduce){
      this.setData({
        isreduce: false
      })
      if(number>1){
        this.reduceAjax(e.currentTarget.dataset.code,0,()=>{
          number = number - 1;
          var up = "getlist[" + e.currentTarget.dataset.index + "].number";
          this.setData({
            [up]: number
          },()=>{
            this.Statistics();
          });
        });
      }else if(number==1){
        wx.showModal({
          title: '提示',
          content: '确定要删除该商品么？',
          success: (res)=> {
            if (res.confirm) {
              var getlist = helper.remove(this.data.getlist, e.currentTarget.dataset.index);
              console.log(getlist)
              this.reduceAjax(e.currentTarget.dataset.code,0,()=>{
                
                this.setData({
                  getlist: getlist
                },()=>{
                  this.isShow();
                  this.Statistics();
                })
              });
            } else{
              this.setData({
                isreduce: true
              })
            }
          }
        })
      }
    } 

  },
  add(e){
    if (this.data.isreduce){
      this.setData({
        isreduce: false
      })
      var number = this.data.getlist[e.currentTarget.dataset.index].number;
      this.reduceAjax(e.currentTarget.dataset.code, 1, () => {
        number = number + 1;
        var up = "getlist[" + e.currentTarget.dataset.index + "].number";
        this.setData({
          [up]: number
        },()=>{
          this.Statistics();
        });
      });
    }
   
  },
  reduceAjax(code,act,cb){
    wx.request({
      url: host + '/reduce', //仅为示例，并非真实的接口地址
      data: {
        openid: getApp().globalData.userInfo.nickName,
        code:code,
        act:act
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if(cb){
          cb();
        }
        this.setData({
          isreduce: true
        })
      }
    })
  },
  isShow(){
    if(this.data.getlist.length>0){
      this.setData({
        isShow:true
      })
    }else{
      this.setData({
        isShow: false
      })
    }
  },
  Statistics(){    //统计选中的总钱数
    var list= this.data.getlist;
    var Statistics=0;
    for(var i=0;i<list.length;i++){
      if (list[i].checked){
        Statistics += list[i].number * list[i].prices
      }
    }
    this.setData({
      Statistics: Statistics
    })
  },
  checkboxChange(e){
    var checked = !this.data.getlist[e.currentTarget.dataset.index].checked;
    var up = "getlist[" + e.currentTarget.dataset.index + "].checked";
    this.setData({
      [up]: checked
    }, () => {
      this.Statistics();
    });
  }

})