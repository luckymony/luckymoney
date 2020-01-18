// pages/me/withdraw/withdraw.js

var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balanceMoney:"88.8",
    inputMoney:"",
    midValue:'0.00',
    serviceFee: '0.00',
    isShowMoreThan:false,
    maxlength:0,
  },

  inputWacth: function (e) {
    var num = util.pointNumer(e.detail.value);
    var that = this;
    if (parseFloat(e.detail.value) > parseFloat(this.data.balanceMoney)) {
      that.setData({
        isShowMoreThan: true
      });
    }else {
      var num = util.pointNumer(e.detail.value);
      that.setData({
        isShowMoreThan: false,
        inputMoney: num,
        serviceFee: num ? util.getServiceFee(num) : '0.00'
      });
    }
  },

  allMoney:function(e) {
    var that = this;
    var money = that.data.balanceMoney;
    that.setData({
      inputMoney: money,
      serviceFee: money > 0 ? util.getServiceFee(money) : '0.00'
    });
  },

  withdrawal:function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '余额提现' }); 
    var that = this;
    that.setData({
      maxlength: that.data.balanceMoney.length
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})