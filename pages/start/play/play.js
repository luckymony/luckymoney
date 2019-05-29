Page({

  data: {
    items: [],
    currentIndex: 0,
    isShow:false
  },

  onLoad: function (options) {
    var obj = JSON.parse(options.value);
    console.log(obj);
    this.setData({
      items: obj.types,
      currentIndex: obj.index
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
})