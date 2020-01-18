// pages/rob/rob.js
const app = getApp();
const pageCount = 10
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allItems: [
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88",state: 0},
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}],
    currentItems: [],
    coinIcon: "../../../images/rob/fu.gif",
    showLoading: false,
    luckyStr: '-- --',
    userName: '--' + '的红包',
    myRank: '--',
    myName: '--',
    myMoney: '--',
    playId: null,
    playType: null,
    iconUrl: null,
    myIconUrl: null
  },

  openGame:function(e) {
    if(this.data.playType == 0) {
      wx.redirectTo({
        url: '../../game/card/card',
      })
    }else if (this.data.playType == 1) {
      wx.redirectTo({
        url: '../../game/rain/rain',
      })
    }
  },

  sendPacket:function(e) {
    wx.switchTab({
      url: "../../start/main/start"
    });
  },

  toShare:function() {
    var that = this;
    if (!that.data.playId)return;
    var urlStr = '../../share/share?';
    var playId = 'palyId=' + that.data.playId;
    
    wx.navigateTo({
      url: '../../share/share?' + 'palyId=' + that.data.playId + 'playType=' + that.data.playType,
    })

    playId: parseInt(options["palyId"]),
    playType: parseInt(options["playType"]),
    playName: options["playName"],
    userName: options["userName"],
    iconUrl: options["iconUrl"],
    luckyStr: options["luckyStr"],
  }

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
    that.setData({
      playId: parseInt(options["palyId"]),
      myIconUrl: app.globalData.userInfo.avatarUrl,
      myName: app.globalData.userInfo.nickname
    });
   wx.setNavigationBarTitle({title: '斗利是'});
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

