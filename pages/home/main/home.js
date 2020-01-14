var util = require('../../../utils/util.js')
var request = require('../../../utils/request.js')
Page({
  data: {
    items:[],
    isRequest:false
  },

  grabLuckyMoney: function(e) {
    console.log(e.currentTarget)
    var type = e.currentTarget.dataset['index'];
    var name = e.currentTarget.dataset['title'];
    var urlStr = type == 3 ? '../relay/relay?' : '../rob/rob?';
    wx.navigateTo({
      url: urlStr + 'type=' + type + '&name=' + name,
    })
  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '斗利是' }); 
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
    this.requestList();
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
    if(that.data.isRequest)return;
    that.setData({
       isRequest:true
    })
    wx.showNavigationBarLoading() 
    wx.startPullDownRefresh()
    request.getSendList({
      success:function(res){
        //  console.log(res);
         wx.hideNavigationBarLoading()
         wx.stopPullDownRefresh()
         for(var i = 0;i < res.length; i++) {
             var value = res[i];
             var item = {
              icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png",
              name: "李世民",
              startTime: util.getTimeStrFromTimeStamp(value.redPackageCreateTime),
              luckyStr: value.redPackageGreetings,
              playName: util.getPlayName(value.redPackageType),
              playType: value.redPackageType,
              playId: value.redPackageId,
              isMe: 0
             }
             that.data.items.push(item);
         }
         that.setData({
          isRequest:false
         })
      },
      fail:function(res) {
        console.log(res);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        that.setData({
          isRequest:false
        })
        wx.showToast({
          title: '红包列表请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
