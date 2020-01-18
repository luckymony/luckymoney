var util = require('../../../utils/util.js');
const {$Message} = require('../../../dist/base/index');
const app = getApp();
const pageCount = 10
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allItems: [
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0 }
      ],
    actions: [{name: "鼠兆丰年 盛世贺岁"},{name: "恭喜发财 大吉大利"}, 
      {name: "合乐融融 财运滚滚"},{name: "一帆风顺 二龙腾飞"}, 
      {name: "七星高照 八方来财"},{name: "鼠你最美 鼠你最棒"}], 
    currentItems: [],
    coinIcon: "../../../images/rob/fu.gif",
    visible: false,
    showPay: false,
    showLoading: false,
    oneMoney: null,
    playId: null,
    myIconUrl: null,
    countdownTime: null,
    luckyStr: '-- --',
    allMoney: '--',
    myName: '--',
    myRank: '--',
    myMoney: '--',
    startTime: '--:--:--',
    playType: 0,
    timeStamp: 0
  },

  showAllTap: function (e) {
    this.setData({
      currentItems: this.data.allItems,
      showFoot: false
    });
  },

  openGame: function (e) {
    if (this.data.playType == 0) {
      wx.redirectTo({
        url: '../../game/card/card',
      })
    } else if (this.data.playType == 1) {
      wx.redirectTo({
        url: '../../game/rain/rain',
      })
    }
  },

  sendPacket: function (e) {
    this.setData({
      showPay: true
    });
  },

  hiddenTap: function (e) {
    this.setData({
      showPay: false
    })
  },

  toParticipate:function(e) {
    wx.navigateTo({
      url: "../participate/participate",
    })
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem:function(e){
    var that = this;
    that.setData({
      visible: false,
      luckyStr: that.data.actions[e.detail.index].name
    });
  },

  sentiment:function(e){
    this.setData({
      visible: true
    });
  },

  watchMoney:function(value){
    var that = this;
    if (value.detail > 0 && value.detail > 20000) {
      $Message({
        content: '单次支付总金额不可超过20000元',
        type: 'warning',
        duration:3
      });
      return;
    } else if (value.detail > 0 && value.detail < 1.0) {
      $Message({
        content: '单次支付总金额大于1.00元',
        type: 'warning',
        duration: 3
      });
      return;
    } else if (value.detail == 0) {
      return
    }
    that.setData({
      oneMoney : util.pointNumer(value.detail)
    })
    return // 必加，不然输入框可以输入多位小数
  },

  /**
   * 开始倒计时
   */
  startCuntdown:function() {
    var that = this;
    that.data.countdownTime = setInterval(function () {
      var ns = util.getCountdown(that.data.timeStamp);
      var countdown = util.getCountdownTime(ns);
      that.setData({
        startTime : countdown
      })
      if(ns == 0) {//开始进入游戏
        clearInterval(that.data.countdownTime);
        that.setData({
          startTime : '游戏开始'
        })    
    }
    },1000)
  },

  /**
   * 获取第一页面数据
   */
  getFirstPageData:function() {
    var that = this;
    let newItems = [];
    if (that.data.allItems.length > pageCount) {
      newItems = that.data.allItems.slice(0, pageCount)
    } else {
      newItems = that.data.allItems
    }
    that.setData({
      currentItems: newItems,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var time = 1579414957000;
    that.setData({
      timeStamp: time,
      playId: parseInt(options["playId"]),
      myIconUrl: app.globalData.userInfo.avatarUrl,
      myName: app.globalData.userInfo.nickname
    });
   wx.setNavigationBarTitle({ title: '斗利是' });
   that.startCuntdown();
   that.getFirstPageData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    clearInterval(that.data.countdownTime);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    var that = this;
    let currentLength = that.data.allItems.length - that.data.currentItems.length;
    if (currentLength <= 0)return;
    that.setData({
      showLoading: true,
    });
    setTimeout(() => {
      let currentIndex = that.data.currentItems.length - 1;
      currentLength = that.data.allItems.length - that.data.currentItems.length;
      if (currentLength >= pageCount) currentLength = pageCount;
      let newArray = that.data.allItems.slice(currentIndex, (currentIndex + currentLength));
      that.setData({
        currentItems: that.data.currentItems.concat(newArray),
        showLoading: false,
      });
    }, 2000);
  },

})