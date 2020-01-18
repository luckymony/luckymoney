// pages/me/money/money-detail.js
const app = getApp()
Page({
  data: {
    receive:true,
    iconUrl: '../../../images/home/icon.png',
    noDataIcon: '../../../images/home/no-data.png',
    items: [],
    moneyTotal: 0,
    redPacketNum: 0,
    showLoading:false
  },

  requestSend:function(){
    this.setData({
      iconUrl: app.globalData.userInfo.avatarUrl,
      receive: true
    })
  },

  requestGet:function(){
    this.setData({
      iconUrl: app.globalData.userInfo.avatarUrl,
      receive: false
    })
  },

  selectType:function(e){
    if (e.currentTarget.dataset.type == 1){ //发出去
      this.requestSend();
    }else { //抢到的
      this.requestGet();
    }
  },

  pushDeail:function(e){
    var index = e.currentTarget.dataset['index'];
    var redPackage = that.data.items[index];
    var urlStr = '';
    
    wx.navigateTo({
      url: '../../home/rob/rob?playId=' + index,
    })
  },

  onPullDownRefresh: function() {
    wx.showNavigationBarLoading();
    setTimeout(() => {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    }, 2000);
  },

  onReachBottom: function () {
    this.setData({
      showLoading: true,
    });
    setTimeout(() => {
      this.setData({
        showLoading: false,
      });
    }, 2000);
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
      this.requestGet();
      wx.setNavigationBarTitle({ title: '红包记录' }); 
  },


})