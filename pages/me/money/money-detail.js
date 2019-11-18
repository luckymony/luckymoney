// pages/me/money/money-detail.js
Page({
  data: {
    send:false,
    receive:true,
    showLoading:false,
    searchLoadingComplete:false,
    tipText:"",
    money:{
      money_total:666,
      red_packet_num:68,
      detail:[
        { name:'经典玩法',
          time:'2019-05-01 16:36',
          money:"+66.00"
        },
        {
          name: '财源滚滚',
          time: '2019-05-01 16:36',
          money: "+66.00"
        },
        {
          name: '四季发财',
          time: '2019-05-01 16:36',
          money: "+66.00"
        },
      ]
    }
  },

  testR:function(){
    this.setData({
      send: false,
      receive: true,
      money: {
        money_total: +800,
        red_packet_num: 123,
        detail: [
          {
            name: '经典玩法',
            time: '2019-05-01 16:36',
            money: "+166.00"
          },
          {
            name: '财源滚滚',
            time: '2019-05-01 16:36',
            money: "+9.00"
          },
          {
            name: '四季发财',
            time: '2019-05-01 16:36',
            money: "+17.00"
          },
          {
            name: '天女散花',
            time: '2019-05-01 16:36',
            money: "+23.00"
          },
          {
            name: '转转盘',
            time: '2019-05-01 16:36',
            money: "+160.00"
          }
        ]
      }
    })
  },

  testS:function(){
    this.setData({
      send: true,
      receive: false,
      money: {
        money_total: -100,
        red_packet_num: 3,
        detail: [
          {
            name: '天女散花',
            time: '2019-05-01 16:36',
            money: "-23.00"
          },
          {
            name: '转转盘',
            time: '2019-05-01 16:36',
            money: "-160.00"
          }
        ]
      }
    })
  },

  select:function(e){
    if ('r' == e.currentTarget.dataset.r){
      this.testR();
    }else if ('s' == e.currentTarget.dataset.s){
      this.testS();
    }
  },

  pushDeail:function(e){
    var index = e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../../home/rob/rob?type=' + index,
    })
  },

  onPullDownRefresh: function() {
    var self = this;
    console.log('下拉刷新');
    setTimeout(() => {
      // 模拟请求数据，并渲染
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000);
  },

  onReachBottom: function () {
    this.setData({
      showLoading: true,
    });
    setTimeout(() => {
      this.setData({
        showLoading: false,
      });
    }, 2000);
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
      this.testR();
      wx.setNavigationBarTitle({ title: '红包记录' }); 
  },


})