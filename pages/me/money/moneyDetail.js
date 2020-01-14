// pages/me/money/money-detail.js

const app = getApp()

Page({
  data: {
    receive:true,
    iconUrl: '../../../images/home/login.png',
    noDataIcon: '../../../images/home/no-data.png',
    items: [],
    moneyTotal: 0,
    redPacketNum: 0,
    showLoading:false
  },

  /*
  {
      name: '开门大吉',
      time: '2019-05-01 16:36',
      money: "66.00"
      },
      {
        name: '八方来财',
        time: '2019-05-01 16:36',
        money: "66.00"
      },
      {
        name: '好运连绵',
        time: '2019-05-01 16:36',
        money: "66.00"
      }
  */

  requestGet:function(){
    this.setData({
      iconUrl: app.globalData.userInfo.avatarUrl,
      receive: true
    })
    console.log(this.data.items)
  },

  requestSend:function(){
    this.setData({
      receive: false
    })
  },

  selectType:function(e){
    // console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.type == 1){
      this.requestGet();
    }else {
      this.requestSend();
    }
  },

  pushDeail:function(e){
    var index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../../home/rob/rob?type=' + index,
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