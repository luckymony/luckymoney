// pages/rob/rob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allItems: [
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88",state: 0},
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "00.00", state: 1}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "88.88", state: 0}, 
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png", name: "张三丰", time: "08-08 10:00", money: "0.00", state: 1}],
    currentItems: [],
    coinIcon:"../../../images/rob/fu.gif",
    showLoading: false,
    playType:0,
    interval:null
  },

  showAllTap:function (e) {
    this.setData({
      currentItems: this.data.allItems,
      showFoot:false
    });
  },

  toMyMoney:function (e) {
    console.log(e);
    wx.switchTab({
        url: "../../me/main/me"
    });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      playType: options["type"]
    });
    let newItems = [];
    if (that.data.allItems.length > 5) {
      newItems = that.data.allItems.slice(0, 5)
    }else {
      newItems = that.data.allItems
    }
    that.setData({
      currentItems: newItems,
    });
    var index = 0;
    that.data.interval = setInterval(function () {
      that.setData({
        //coinIcon: '../../../images/rob/fu_' + (index + 1) + '.png'
      })
      index ++;
      if(index >= 9) {
        index = 0;
      }
    },200);
    wx.setNavigationBarTitle({ title: options['name']}); 
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
    clearInterval(this.data.interval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.interval);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    console.log("下啦加载");
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    console.log("上啦加载");
    let currentLength = this.data.allItems.length - this.data.currentItems.length;
    if (currentLength <= 0){
      console.log("加载完成");
      return;
    }
    this.setData({
      showLoading: true,
    });
    setTimeout(() => {
      let currentIndex = this.data.currentItems.length - 1;
      currentLength = this.data.allItems.length - this.data.currentItems.length;
      if (currentLength >= 5) currentLength = 5;
      let newArray = this.data.allItems.slice(currentIndex,(currentIndex + currentLength));
      this.setData({
        currentItems: this.data.currentItems.concat(newArray),
        showLoading: false,
      });
    }, 2000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})