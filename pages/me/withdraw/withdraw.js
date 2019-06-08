// pages/me/withdraw/withdraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balanceMoney:"88.8",
    inputMoney:"",
    isShowTiXian:true,
    isShowMoreThan:false,
  },

  inputWacth: function (e) {
    console.log(e.detail.value);
    console.log(this.data.balanceMoney);
    if (parseFloat(e.detail.value) > parseFloat(this.data.balanceMoney)) {
      this.setData({
        isShowTiXian:false,
        isShowMoreThan: true,
      });
    }else {
      this.setData({
        isShowTiXian: true,
        isShowMoreThan: false,
      });
    }
  },

  allMoney:function(e) {
    this.setData({
      inputMoney: this.data.balanceMoney
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})