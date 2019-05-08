Page({
  data: {
    items: [
      {value : "恭喜发财 大吉大利"},
      {value : "50"},
      {value : 4 },
      {value : { 
                 index  : 0,
                 types: [
                          "开门大吉",
                          "八方来财",
                          "敬请期待"
                        ],
                 time  : "24小时", 
                 count : 0, 
                 chance: 1,
                 difficulty: 1
               }
       }
    ],

    visible: false,

    actions: [
      {
        name: '恭喜发财 大吉大利',
      },
      {
        name: '合乐融融 财运滚滚',
      },
      {
        name: '一帆风顺 二龙腾飞',
      },
      {
        name: '七星高照 八方来财',
      }
    ],
  },

  sentiment: function (e) {
    this.setData({
      visible: true
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({detail}) {
    const index = detail.index;
    if(index == 0){
      this.setData({
        visible: false,
        'items[0].value':"恭喜发财 大吉大利"
      });
    }else if(index == 1) {
      this.setData({
        visible: false,
        'items[0].value':"合乐融融 财运滚滚"
      });
    }else if (index == 2) {
      this.setData({
        visible: false,
        'items[0].value':"一帆风顺 二龙腾飞"
      });
    }else if (index == 3) {
      this.setData({
        visible: false,
        'items[0].value':"七星高照 八方来财"
      });
    }
  },
  
  toPlay:function() {
    wx.navigateTo({
      url: '../play/play?value=' + JSON.stringify(this.data.items[3].value),
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '发红包' }); 
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

})
