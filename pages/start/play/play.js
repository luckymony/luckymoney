Page({

  data: {
    items: [],
    currentIndex: 0,
    isShow:false,
    isTime:false,
    longTime:86400,
    timeIndex:0,
    timeItems: [86400, 300, 900, 1800, 2700, 3600]
  },

  onLoad: function (options) {
    var obj = JSON.parse(options.value);
    // console.log(obj);
    this.setData({
      items: obj.types,
      currentIndex: obj.index,
      longTime: obj.time,
      timeItems: obj.timeItems,
      activityTime:
      obj.time >= 86400 ? ((obj.time / 3600) + '小时') : ((obj.time / 60) + '分钟'),
    });
    wx.setNavigationBarTitle({ title: '红包玩法' });
  },
  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current,
      isTime:false
    })
  },
  touchAction: function (e) {
    this.setData({
      isShow: true
    })
  },
  hiddenTap:function (e) {
    this.setData({
      isTime: false,
      isShow: false
    })
  },
  activityTimeChange:function (e) {
    this.setData({
      isTime: true,
    })
  },
  edited:function(e) {
    this.setData({
      isTime: false,
      isShow: false
    })
  },
})