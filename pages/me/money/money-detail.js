// pages/me/money/money-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send:false,
    receive:true,
    money:{
      money_total:666,
      red_packet_num:68,
      detail:[
        { name:'经典玩法',
          time:'0517 16:36',
          money:"+66.00"
        },
        {
          name: '财源滚滚',
          time: '0518 12:06',
          money: "+66.00"
        },
        {
          name: '四季发财',
          time: '0317 19:16',
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
        money_total: -800,
        red_packet_num: 123,
        detail: [
          {
            name: '经典玩法',
            time: '0517 16:36',
            money: "+166.00"
          },
          {
            name: '财源滚滚',
            time: '0518 12:06',
            money: "+9.00"
          },
          {
            name: '四季发财',
            time: '0317 19:16',
            money: "+17.00"
          },
          {
            name: '天女散花',
            time: '0323 02:36',
            money: "23.00"
          },
          {
            name: '转转盘',
            time: '0417 09:06',
            money: "160.00"
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
            time: '0323 02:36',
            money: "-23.00"
          },
          {
            name: '转转盘',
            time: '0417 09:06',
            money: "-160.00"
          }
        ]
      }
    })
  },

  select:function(e){
    if ('r' == e.currentTarget.dataset.r){
      this.testR()
    }else if ('s' == e.currentTarget.dataset.s){
      this.testS()
    }
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
      this.testR()
  },


})