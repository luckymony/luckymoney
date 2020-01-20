const {$Message} = require('../../../dist/base/index');
var util = require('../../../utils/util.js');
Page({
  data: {
    items: ["开门大吉","八方来财","好运连绵"],
    currentIndex: 0,
    isShow:false,
  },

  onLoad: function (options) {
    var playType = parseInt(options["playType"]);
    this.setData({
      currentIndex: playType
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

  dataError:function(e) {
    console.log(e.detail);
    $Message({
      content: e.detail,
      type: 'warning',
      duration:3
    });
  },

  edited:function(e) {
    var that = this;
    that.setData({
      isShow: false
    })
    let timeout = setTimeout(() => {
      clearTimeout(timeout)
      wx.navigateBack({})
    }, 250)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      playParameter: {
        type: that.data.currentIndex,
        parameter: e.detail
      }
    })
  },
})