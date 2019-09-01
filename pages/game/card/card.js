// pages/game/card/card.js

var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carWidth: '', //卡片宽度
    isCanAction: false,
    number: 10,
    setInter: '',
    stopShaking: true,
    currentIndex: 0,
    flipArray:[],
    isShowRedPacket:false,
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
    });

    this.setData({
      carWidth
    });

    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading',
      duration: 5000
    });

    let timer1 = setTimeout(() => {
      clearTimeout(timer1);
      wx.hideToast();
      const { carWidth, cardData } = this.data;
      this.shuffle(carWidth,true);
      let timer2 = setTimeout(() => {
        clearTimeout(timer2)
        cardData.sort(this.randomsort);
        this.addPosition(cardData)
        this.shuffle(0,true)
        let timer3 = setTimeout(() => {
          clearTimeout(timer3)
          this.shuffle(carWidth, false);
          let timer4 = setTimeout(() => {
            clearTimeout(timer4)
            cardData.sort(this.randomsort);
            this.addPosition(cardData)
            this.shuffle(0, false)
            let timer5 = setTimeout(()=>{
              clearTimeout(timer5)
              this.setData({
                stopShaking : false,
                isCanAction : true
              })
              this.shaking()
            },1000)
          },1000)
        },3000)
      }, 1000)
    }, 5000) 
  },

  randomsort(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  },
   
  getFlipCard(){
    var that = this;
    let { flipArray } = that.data;
    flipArray = [];
    that.setData({ flipArray });
    while(flipArray.length < 5) {
      var index = that.rand(0, 24);
      if (flipArray.indexOf(index) <= -1) { //不包含
        flipArray.push(index);
      }
      that.setData({ flipArray });
    }
  },

  // 洗牌函数
  shuffle(translateUnit,isShow) {
    var that = this;
    if (isShow) {
      that.getFlipCard();
    }
    let { cardData } = that.data;
    let { flipArray } = that.data;
    cardData.map((item, index) => {
      let animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      })
      const translateUnitX = translateUnit * (2 - item.twoArry.x)
      const translateUnitY = translateUnit * (2 - item.twoArry.y)
      animation.translate(translateUnitX, translateUnitY).step()
      item.animationData = animation.export()
      item.opacity = false;
      if (item.showClass) {
        item.showClass = false;
      }
      if (isShow) {
        if (flipArray.indexOf(index) >= 0) {
          item.showClass = true;
        }
      }
    })
    this.setData({
      cardData
    })
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

  //摇晃动画
  shaking() {
    // 1: 创建动画实例animation:
    var that = this;
    if (that.data.stopShaking) return;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    var next = true;
    //连续动画关键步骤
    that.data.setInter = setInterval(function () {
      if (that.data.stopShaking) return;
      //console.log('间隔摇摆')
      //2: 调用动画实例方法来描述动画
      if (next) {
        animation.translateX(4).step();
        animation.rotate(19).step()
        next = !next;
      } else {
        animation.translateX(-4).step();
        animation.rotate(-19).step()
        next = !next;
      }
      let animationData = 'cardData[' + that.data.currentIndex + '].animationData';
      //3: 将动画export导出，把动画数据传递组件animation的属性 
      that.setData({
        [animationData]: animation.export()
      })
    }, 300)

    let timer = setTimeout(() => {
      clearTimeout(timer);
      clearInterval(that.data.setInter);
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
      })
      animation.translateX(0).step();
      animation.rotate(0).step();
      let animationData = 'cardData[' + that.data.currentIndex + '].animationData';
      that.setData({
        [animationData]: animation.export()
      })
      if (!that.data.stopShaking) {
        that.setData({
          currentIndex: that.rand(0, 24)
        });
        that.shaking();
      }
    }, 2000)
  },

  handleCurClick(event) {
    let { isCanAction } = this.data;
    if (!isCanAction)return;

    let curId = event.currentTarget.dataset.id;
    // 每次点击时获取被点击拍的disable 属性，
    let disabled = event.currentTarget.dataset.disabled;
    //如果为true 就返回不继续向下执行
    if (disabled) {
      return;
    }
    let { cardData, number, carWidth } = this.data;
    let money = '';
    cardData.forEach(item => {
      item.disabled = true;  // 点击一张拍以后，把所有的牌的disabled 属性改成true ，
      if (item.id === curId) {
        item.showClass = true;
        money = item.money;
      } else {
        item.opacity = true
      }
    })
    number -= 1;
    this.setData({
      cardData,
      number
    })

    this.setData({
      stopShaking: true
    });
    
    let that = this;
    let timer1 = setTimeout(() => {
      clearTimeout(timer1)
      that.setData({
        isCanAction:false,
        isShowRedPacket: true
      });
      that.redpacket = that.selectComponent("#redpacket");
      that.redpacket.startOpenReadPacket();
      that.redpacket.openReadPacketSuccess();
    },2025)
  },

  toRedPacketRecord: function () {
    wx.redirectTo({
      url: '../../me/withdraw/withdraw',
    })
  },

  rand(min, max) {
    return parseInt(Math.random() * (max - min) + min);
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
    clearInterval(this.data.setInter)
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