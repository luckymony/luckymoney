// pages/me/money/money-detail.js
const app = getApp()
var util = require('../../../utils/util.js')
var request = require('../../../utils/request.js')
Page({
  data: {
    send: true,
    iconUrl: '../../../images/home/icon.png',
    noDataIcon: '../../../images/home/no-data.png',
    sendItems: [],
    receiveItems: [],
    currentItems:[],
    sendMoney: 0,
    sendNum: 0,
    receiveMoney: 0,
    receiveNum: 0,
    currentMoney: 0,
    currentNum: 0,
    showLoading: false
  },

  requestSend:function(){
    wx.showNavigationBarLoading();
    var that = this;

    that.setData({
      iconUrl: app.globalData.userInfo.avatarUrl,
      send: true,
      currentMoney : that.data.sendMoney,
      currentNum: that.data.sendNum,
      currentItems: that.data.sendItems
    })

    request.getMySendHistory({
      success: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        that.setData({
          currentMoney: (res.totalFee / 100).toFixed(2),
          currentNum: res.count == null ? 0 : res.count,
          sendMoney: (res.totalFee / 100).toFixed(2),
          sendNum: res.count == null ? 0 : res.count,
        })
        that.setItems(res.list);
      },
      fail:function(res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '红包记录请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
  },

  setItems:function(res) {
    if(!res || res.length == 0)return;
    var that = this;
    var array = [];
    for (var i = 0; i < res.length; i++) {
       var item = res[i];
      var dic = {
                  money: (item.fee / 100).toFixed(2),
                  time: util.getTimeStrFromTimeStamp(item.redPackageCreateTime),
                  playId: item.redPackageId,
                  playType: item.redPackageType,
                  playName: util.getPlayName(item.redPackageType)
                }
       array.push(dic);   
    }
    if (that.data.send) { //发出
      that.setData({
         currentItems:array,
         sendItems: array
      })
    }else { //收到
      that.setData({
        currentItems: array,
        receiveItems: array
      })
    }
  },

  requestGet:function(){
    wx.showNavigationBarLoading();
    var that = this;
    that.setData({
      iconUrl: app.globalData.userInfo.avatarUrl,
      send: false,
      currentMoney: that.data.receiveMoney,
      currentNum: that.data.receiveNum,
      currentItems: that.data.receiveItems
    })
    request.getMyWinHistroy({
      success: function (res) {
        console.log (res);
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        that.setData({
          currentMoney: (res.totalFee / 100).toFixed(2),
          currentNum: res.count == null ? 0 : res.count,
          receiveMoney: (res.totalFee / 100).toFixed(2),
          receiveNum: res.count == null ? 0 : res.count,
        })
        that.setItems(res.list);
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: '红包记录请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  selectType:function(e){
    if (e.currentTarget.dataset.type == 1){ //发出去
      wx.startPullDownRefresh();
      this.requestSend();
    }else { //抢到的
      wx.startPullDownRefresh();
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
    var that = this;
    if (that.data.send) { // 发出
       that.requestSend();
    }else { //收到
       that.requestGet();
    }
  },

  onReachBottom: function () {
    this.setData({
      showLoading: true,
    });
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
      wx.startPullDownRefresh();
      wx.setNavigationBarTitle({ title: '红包记录' }); 
  },


})