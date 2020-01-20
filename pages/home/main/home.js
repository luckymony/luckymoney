var util = require('../../../utils/util.js')
var request = require('../../../utils/request.js')
const app = getApp();
Page({
  data: {
    items:[],
    isRequest:false,
    noDataIcon:'../../../images/home/no-data.png'
  },

  grabLuckyMoney: function(e) {
    var that = this;
    var index = e.currentTarget.dataset['index'];
    try {
    var item = that.data.items[index];
    if (!item)return;
    var playId = item.playId;
    var playType = item.playType;
    var urlStr = (playType == 2) ? '../relay/relay?' : '../rob/rob?';
    wx.navigateTo({
      url: urlStr + 'playId=' + playId + '&playType=' + playType,
    })
    } catch (res) {
       console.log(res);
    }
  },
  
  onLoad: function (options) {
    var that = this;
    var array = app.getStorage('homeList');
    that.setData({
      items: array ? array : []
    })
    wx.setNavigationBarTitle({ title: '斗利是' }); 
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
    wx.startPullDownRefresh();
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  onPullDownRefresh: function () {
     this.requestList();
  },

  onReachBottom: function () {
  
  },

  requestList:function() {
    var that = this;
    wx.showNavigationBarLoading() 
    request.getSendList({
      success:function(res){
        //  console.log(res);
         wx.hideNavigationBarLoading()
         wx.stopPullDownRefresh()
         var array = []
         for(var i = 0;i < res.length; i++) {
             var value = res[i];
             var item = {
              icon: value.avatarUrl,
              startTime: util.getTimeStrFromTimeStamp(value.redPackageCreateTime),
              luckyStr: value.redPackageGreetings,
              playName: util.getPlayName(value.redPackageType),
              playType: value.redPackageType,
              playId: value.redPackageId,
              isMe: value.isMe
             }
             array.push(item);
         }
         app.setStorage('homeList',array);
         that.setData({
          items:array
         })
      },fail:function(res) {
       console.log(res);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '红包列表请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
