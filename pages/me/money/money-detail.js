// pages/me/money/money-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send:false,
    receive:true
  },

  select:function(e){
    if ('w' == e.currentTarget.dataset.w){
      this.setData({
        send:false,
        receive:true
      })
    }else if ('y' == e.currentTarget.dataset.y){
      this.setData({
        send: true,
        receive: false
      })
    }
  },


})