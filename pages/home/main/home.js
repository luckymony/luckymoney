var util = require('../../../utils/util.js')
Page({
  data: {
    // text:"这是一个页面"
    items:[
      {
        icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png",
        name:"张三丰",
        start_time:"1560000090",
        long_time:"60",
        count:"10",
        lucky_str: "恭喜发财,财源广进",
        play_name:"开门大吉",
        play_type:"1",
        play_id: 1,
        is_me:0
       },
      {
        icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png",
        name: "李世民",
        start_time: "1560086490",
        long_time: "60",
        count: "10",
        lucky_str: "七星高照,八方来财",
        play_name: "八方来财",
        play_type: "2",
        play_id:2,
        is_me:1
      },
      {
        icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555004603689&di=6161b038a8a7046bfe88e4d72e975729&imgtype=0&src=http%3A%2F%2Fwww.36588.com.cn%2FImageResourceMongo%2FUploadedFile%2Fdimension%2Fbig%2F7d10bc2b-db5b-4247-925c-0628d65b3f50.png",
        name: "李世民",
        start_time: "1568086490",
        long_time: "60",
        count: "10",
        lucky_str: "一帆风顺,四季平安",
        play_name: "好运连绵",
        play_type: "3",
        play_id: 3,
        is_me: 0
      }
      ],

  },

  grabLuckyMoney: function(e) {
    console.log(e.currentTarget)
    var type = e.currentTarget.dataset['index'];
    var name = e.currentTarget.dataset['title'];
    if (type == 3) {
      wx.navigateTo({
        url: '../relay/relay',
      })
    }else {
      wx.navigateTo({
        url: '../rob/rob?type=' + type + '&name=' + name,
      })
    }
  },
  
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '斗利是' }); 
    for(var i=0;i<this.data.items.length;i++) {
      var itemTimeStr = 'items[' + i + '].start_time';
      this.setData({
        [itemTimeStr]: util.getTimeStrFromTimeStamp(this.data.items[i].start_time),
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    // wx.startPullDownRefresh()
    wx.showNavigationBarLoading() 
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 2000);
  },
  onReachBottom: function () {
    setTimeout(() => {

    }, 2000);
  }
})
