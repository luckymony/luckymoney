Page({
  
  data: {
    items: [
     { title: "开门大吉", longTime: 120, moneyCount: 5, chanceCount: 1, difficulty: 0 },
     { title: "八方来财", longTime: 120, integralCount: 200, chanceCount: 1, difficulty: 0 }, 
     { title: "好运连绵", longTime: 120, startTime: 200}],
    currentIndex: 0,
    isShow:false,
  },

  onLoad: function (options) {
    var obj = JSON.parse(options.value);
     console.log(obj);
    this.setData({
      currentIndex: obj
    });
    wx.setNavigationBarTitle({ title: '红包玩法' });
  },

  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },

  touchAction: function (e) {
    this.setData({
      isShow: true
    })
  },

  hiddenTap:function (e) {
    this.setData({
      isShow: false
    })
  },

  edited:function(e) {
    console.log(e);
    var that = this;
    that.setData({
      isShow: false
    })
    let timeout = setTimeout(() => {
      clearTimeout(timeout)
      wx.navigateBack({

      })
    }, 250)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      playParameter: {
        type: that.data.currentIndex,
        parameter: that.data.items[that.data.currentIndex]
      }
    })
  },
})