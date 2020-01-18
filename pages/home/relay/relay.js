const app = getApp();
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
    currentItems: [],
    coinIcon: "../../../images/rob/fu.gif",
    showLoading: false,
    playType: 0,
    money:'--',
    showPay:false,
    palyId:null,
    myIconUrl:null,
    myName:null
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      playType: parseInt(options["playType"]),
      palyId: parseInt(options["palyId"]),
      myIconUrl: app.globalData.userInfo.avatarUrl,
      myName: app.globalData.userInfo.nickname
    });
   wx.setNavigationBarTitle({ title: options['playName'] });
  //  let newItems = [];
  //   if (that.data.allItems.length > 5) {
  //     newItems = that.data.allItems.slice(0, 5)
  //   } else {
  //     newItems = that.data.allItems
  //   }
  //   that.setData({
  //     currentItems: newItems,
  //   });
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
    console.log("下啦加载");
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    console.log("上啦加载");
    let currentLength = this.data.allItems.length - this.data.currentItems.length;
    if (currentLength <= 0) {
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
      let newArray = this.data.allItems.slice(currentIndex, (currentIndex + currentLength));
      this.setData({
        currentItems: this.data.currentItems.concat(newArray),
        showLoading: false,
      });
    }, 2000);
  },

})