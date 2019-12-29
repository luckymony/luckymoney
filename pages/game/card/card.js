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
    shakTimeout:'',
    stopShaking: true,
    currentIndex: 0,
    flipArray:[],
    isShowRedPacket:false,
    cardTimes:[],
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
    let that = this;
    const { cardData } = that.data;
    that.addPosition(cardData); // 数组添加移动坐标位置
    wx.getSystemInfo({
      success(res) {
        carWidth = parseInt((res.windowWidth - 20)/5);
      }
    });

    that.setData({
      carWidth
    });

    let timer1 = setTimeout(() => {
      clearTimeout(timer1);
      that.data.cardTimes.splice(0,1)
      const {carWidth,cardData} = that.data;
      that.shuffle(carWidth,false);
      let timer2 = setTimeout(() => {
        clearTimeout(timer2)
        that.data.cardTimes.splice(1,1)
        cardData.sort(this.randomsort);
        that.addPosition(cardData)
        that.shuffle(0,true)
        let timer3 = setTimeout(() => {
          clearTimeout(timer3)
          that.data.cardTimes.splice(2, 1)
          that.shuffle(carWidth,false);
          let timer4 = setTimeout(() => {
            clearTimeout(timer4)
            that.data.cardTimes.splice(3, 1)
            cardData.sort(that.randomsort);
            that.addPosition(cardData)
            that.shuffle(0,false)
            let timer5 = setTimeout(()=>{
              clearTimeout(timer5)
              that.data.cardTimes.splice(4, 1)
              that.setData({
                stopShaking : false,
                isCanAction : true
              })
              that.shaking()
            },1000)
            that.data.cardTimes.push(timer5); 
          },1000)
          that.data.cardTimes.push(timer4); 
        },5000) //设置展示时间
        that.data.cardTimes.push(timer3); 
      },1000)
      that.data.cardTimes.push(timer2); 
    },2000)
    that.data.cardTimes.push(timer1); 
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
      var index = that.rand(0,24);
      if (flipArray.indexOf(index) <= -1) { //不包含
          flipArray.push(index);
      }
      that.setData({ flipArray });
    }
    //console.log(that.data.flipArray);
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
      // console.log(item);
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
    that.setData({
      cardData
    })
    // console.log(that.data.cardData);
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

    that.data.shakTimeout = setTimeout(() => {
      clearTimeout(that.data.shakTimeout);
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
    let {isCanAction} = this.data;
    if (!isCanAction)return;
    let curId = event.currentTarget.dataset.id;
    console.log(curId);
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
    
    let that = this;
    let timer1 = setTimeout(() => {
      clearTimeout(timer1)
      that.data.cardTimes.splice(that.data.cardTimes.length - 1, 1)
      that.setData({
        isCanAction:false,
        isShowRedPacket: true
      });
      that.redpacket = that.selectComponent("#redpacket");
      that.redpacket.startOpenReadPacket();
      that.redpacket.openReadPacketSuccess();
    },2025)
    that.data.cardTimes.push(timer1);
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
    clearInterval(this.data.setInter);
    clearTimeout(this.data.shakTimeout);
    for(var i = 0;i<this.data.cardTimes.count;i++) {
      var time = this.data.cardTimes.count;
      clearTimeout(time);
    }
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