// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carWidth: '', //卡片宽度
    marginTop: 0,
    number: 10,
    setInter: '',
    stopShaking: true,
    currentIndex: 0,
    cardData: [
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '1',
        showClass: false,  // 控制翻转
        opacity: false, // 控制翻转过来以后的 opacity
        money: 0,
        disabled: false,  // disabled 属性，控制手速点击过快，导致多个牌被翻开, 默认为false 可以点击
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '2',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '3',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '4',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '5',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '6',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '7',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '8',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '9',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '10',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '11',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '12',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '13',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '14',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '15',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '16',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '17',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '18',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '19',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '20',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '21',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '22',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '23',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '24',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      },
      {
        animationData: {},
        front: '../../../images/card/fanmian.png',
        back: '../../../images/card/zhengmian.png',
        id: '25',
        showClass: false,
        opacity: false,
        money: 0,
        disabled: false,
      }
    ],
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '开门大吉' }); 
    let carWidth = 0;
    const { cardData } = this.data;
    this.addPosition(cardData); // 数组添加移动坐标位置
    wx.getSystemInfo({
      success(res) {
        carWidth = parseInt((res.windowWidth - 20) / 5);
      }
    })
    // this.setData({
    //   carWidth
    // })
  },

  // 数组添加移动坐标值 并且把所有的disabled 状态还原会false 
  addPosition(cardData) {
    const lineTotal = 5 // 单行数
    cardData.map((item, index) => {
      let x = index % lineTotal
      let y = parseInt(index / lineTotal)
      item.twoArry = { x, y }
      item.disabled = false;   // 还原所有的disabled 状态
    })
    this.setData({ cardData })
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
    clearInterval(this.interval)
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