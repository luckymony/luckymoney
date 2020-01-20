var util = require('../../../utils/util.js');
var pay = require('../../../utils/pay.js');
const {$Message} = require('../../../dist/base/index');
const app = getApp() 
Page({
  data: {
    items: [{ title: "恭喜发财 大吉大利",number:0},{ title: "总金额数", number:null},
    { title: "红包个数", number: null},{ title: "红包玩法", type: "开门大吉"}],
    playTypes:["开门大吉","八方来财","好运连绵"],
    actions: [{name: "鼠兆丰年 盛世贺岁"},{name: "恭喜发财 大吉大利"}, 
              {name: "合乐融融 财运滚滚"},{name: "一帆风顺 二龙腾飞"}, 
              {name: "七星高照 八方来财"},{name: "鼠你最美 鼠你最棒"}], 
    visible: false,
    moneyCount: '0.00',
    redPacketCount: '0',
    serviceFee: '0.00',
    playParameter: null,
    payParameter: null,
    isCanPay: false
  },

  toTip:function(e) {
     
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

  /**
   * 祝福语快速选择
   */
  handleClickItem({detail}) {
    const index = detail.index;
    var that = this;
    if (index == 0) {
      that.setData({
        visible: false,
        'items[0].title': "鼠兆丰年 盛世贺岁"
      });
    }else if(index == 1){
      that.setData({
        visible: false,
        'items[0].title':"恭喜发财 大吉大利"
      });
    }else if(index == 2) {
      that.setData({
        visible: false,
        'items[0].title':"合乐融融 财运滚滚"
      });
    }else if (index == 3) {
      that.setData({
        visible: false,
        'items[0].title':"一帆风顺 二龙腾飞"
      });
    }else if (index == 4) {
      that.setData({
        visible: false,
        'items[0].title':"七星高照 八方来财"
      });
    }else if (index == 5) {
      that.setData({
        visible: false,
        'items[0].title': "鼠你最美 鼠你最棒"
      });
    }
    that.getCanPay();
  },

  /**
   * 跳动红包玩法介绍
   */
  toTip:function() {
    wx.navigateTo({
      url: '../tip/tip',
    })
  },
  
  /**
   * 跳转到红包模式选择页面
   */
  toPlay:function() {
    var that = this;
    var type = that.data.playTypes.indexOf(that.data.items[3].type);
    wx.navigateTo({
      url: '../play/play?playType=' + type,
    })
  },

  /**
   * 红包祝福语监听
   */
  bindLucky:function(e) {
    var that = this;
    that.setData({
      'items[0].title': e.detail.value.length > 0 ? e.detail.value : null
    })
  },

  /**
   * 监听红包金额
   */
  watchMoney:function(e) {
    // console.log(e.detail);
    var that = this;
    /*
    if (e.detail.value > 0 && e.detail.value > 20000) {
      that.setData({
        'items[1].number': parseFloat(that.data.moneyCount) > 0 ? parseFloat(that.data.moneyCount):null
      })
      $Message({
        content: '单次支付总金额不可超过20000元',
        type: 'warning',
        duration:3
      });
      that.getCanPay();
      return;
    } else if (e.detail.value > 0 && e.detail.value < 1.0) {
      $Message({
        content: '单次支付总金额大于1.00元',
        type: 'warning',
        duration: 3
      });
      console.log(parseFloat(that.data.moneyCount).toString())
      that.setData({
        'items[1].number': parseFloat(that.data.moneyCount) > 0 ? parseFloat(that.data.moneyCount):null
      })
      that.getCanPay();
      return;
    } else if (
      e.detail.value > 0
      && that.data.items[2].number > 0
      && (e.detail.value/that.data.items[2].number*1.00) < 0.01) {
      $Message({
        content: '单个最小红包金额不能小于0.01元',
        type: 'warning',
        duration: 3
      });
      that.setData({
        'items[1].number': parseFloat(that.data.moneyCount) > 0 ? parseFloat(that.data.moneyCount):null
      })
      that.getCanPay();
      return;
    }else if (e.detail.value == 0) {
      that.setData({
        'items[1].number': null,
        moneyCount: '0.00',
        serviceFee: '0.00'
      })
      that.getCanPay();
      return
    }
  */
    var num = util.pointNumer(e.detail.value);
    that.setData({
      'items[1].number': num,
      moneyCount: num ? util.moneyFormat(num.toString()) : '0.00',
      serviceFee: num ? util.getServiceFee(num) : '0.00'
    })
    that.getCanPay();
    return // 必加，不然输入框可以输入多位小数
  },

  /**
   * 监听红包个数
   */
  watchCount:function(e) {
    var that = this;
    var type = that.data.playTypes.indexOf(that.data.items[3].type);
    if (e.detail.value && e.detail.value > 500) {
      that.setData({
        'items[2].number': parseInt(that.data.redPacketCount)
      })
      var warningStr = type == 2 ? '最多500个人参与' : '一次最多发500个红包'
      $Message({
        content: warningStr,
        type: 'warning',
        duration: 3
      });
      return;
    } else if (e.detail.value && e.detail.value < 1) {
      var warningStr = type == 2 ? '请填写参与人数' : '请填写红包个数'
      $Message({
        content: warningStr,
        type: 'warning',
        duration: 3
      });
      that.setData({
        'items[2].number': parseInt(that.data.redPacketCount)
      })
      return;
    } else if (
       e.detail.value 
       && that.data.moneyCount > 0 
       && (that.data.moneyCount / e.detail.value * 1.00) < 0.01
       && index != 2) { //好运连绵模式不参与判断
      $Message({
        content: '单个最小红包金额不能小于0.01元',
        type: 'warning',
        duration: 3
      });
      that.setData({
        'items[2].number': parseInt(that.data.redPacketCount)
      })
      return;
    }
    that.setData({
      'items[2].number': e.detail.value,
      redPacketCount: e.detail.value
    })
    that.getCanPay();
    console.log(that.data.isCanPay);
  },

  /**
   * 是否可以支付
   */
  getCanPay:function() {
      var that = this;
      var isCan = (that.data.items[0].title.length > 0 
      && that.data.items[1].number > 0 
      && that.data.items[2].number > 0);
      that.setData({
        isCanPay : isCan
      })
  },

  /**
   * 发起支付
   */
  payMoney:function() {
    var that = this;
    if(!that.data.isCanPay)return;
    var type = that.data.playTypes.indexOf(that.data.items[3].type);
    if (that.data.items[2].number == null) {
      var warningStr = type == 2 ? '请填写参与人数' : '请填写红包个数'
      $Message({
        content: warningStr,
        type: 'warning',
        duration: 3
      });
      return;
    } else if (that.data.items[0].title == null) {
      $Message({
        content: '请填写你的祝福语',
        type: 'warning',
        duration: 3
      });
      return;
    }else if (that.data.items[1].number == null) {
      $Message({
        content: '请填写红包金额',
        type: 'warning',
        duration: 3
      });
      return;
    }
    wx.showLoading({
      title: '微信支付',
    })

    that.setData({
      payParameter:{}
    });
    if (type == 0) { //开门大吉
      that.sendKmdj();
    } else if (type == 1) { //八方来财
       that.sendBflc();
    } else if (type == 2) { //好运连绵
       that.sendHylm();
    }
  },

  sendKmdj:function() {
    var that = this;
    var defaultPar = pay.defaultKmdjParameter();
    var parameter = that.data.playParameter ? that.data.playParameter.parameter : null;

    var chanceNumber = parameter ? parameter.chanceCount : defaultPar.chanceCount;
    var number = that.data.items[2].number;
    var money = parseFloat(that.data.moneyCount)*100;
    var difficultyLevel = parameter ? parameter.difficulty: defaultPar.difficulty;
    var duration = parameter ? parameter.longTime : defaultPar.longTime;
    var needClickNumber = parameter ? parameter.moneyCount : defaultPar.moneyCount;
    that.setData({
      'payParameter.greetings':that.data.items[0].title,
      'payParameter.payType': 1,
      'payParameter.chanceNumber': chanceNumber,
      'payParameter.number': parseInt(number),
      'payParameter.fee': money,
      'payParameter.difficultyLevel': difficultyLevel,
      'payParameter.duration': duration,
      'payParameter.needClickNumber': needClickNumber
    });
    var isFail = false;
    pay.sendKmdj({
        parameter: that.data.payParameter, 
        orderSuccess:function(res) {
            wx.hideLoading({})
        },
        paySuccess:function(res){
          if(!isFail) {
            wx.showToast({
              title: '微信支付成功',
              icon: 'none',
              duration: 2000
            })
            wx.switchTab({
              url: "../../home/main/home"
            });
          }
        },
        payFail:function(res) {
          isFail = true;
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '微信支付失败',
                icon: 'none',
                duration: 2000
              })
            },
          })
        }
    });
  },

  sendBflc:function() {
    var that = this;
    var defaultPar = pay.defaultBflcParameter();
    var parameter = that.data.playParameter ? that.data.playParameter.parameter : null;

    var chanceNumber = parameter ? parameter.chanceCount : defaultPar.chanceCount;
    var number = that.data.items[2].number;
    var money = parseFloat(that.data.moneyCount)*100;
    var difficultyLevel = parameter ? parameter.difficulty: defaultPar.difficulty;
    var duration = parameter ? parameter.longTime : defaultPar.longTime;
    var needIntegral = parameter ? parameter.integralCount : defaultPar.integralCount;
    that.setData({
      'payParameter.greetings':that.data.items[0].title,
      'payParameter.payType': 1,
      'payParameter.chanceNumber': chanceNumber,
      'payParameter.number': parseInt(number),
      'payParameter.fee': money,
      'payParameter.difficultyLevel': difficultyLevel,
      'payParameter.duration': duration,
      'payParameter.needIntegral': needIntegral
    });
    var isFail = false;
    pay.sendBflc({
        parameter: that.data.payParameter, 
        orderSuccess:function(res) {
            wx.hideLoading({})
        },
        paySuccess:function(res){
          if(!isFail) {
            wx.showToast({
              title: '微信支付成功',
              icon: 'none',
              duration: 2000,
            })
            wx.switchTab({
              url: "../../home/main/home"
            });
          }
        },payFail:function(res) {
          isFail = true;
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '微信支付失败',
                icon: 'none',
                duration: 2000
              })
            },
          })
        }
    });
  },

  sendHylm:function(){
    var that = this;
    var defaultPar = pay.defaultHylmParameeter();
    var parameter = that.data.playParameter ? that.data.playParameter.parameter : null;

    var minMoney = parameter ? parameter.minMoney : defaultPar.minMoney;
    var number = that.data.items[2].number;
    var money = parseFloat(that.data.moneyCount) * 100;
    var startTime = parameter ? parameter.startTime : defaultPar.startTime;
    var duration = parameter ? parameter.longTime : defaultPar.longTime;
    that.setData({
      'payParameter.greetings': that.data.items[0].title,
      'payParameter.payType': 1,
      'payParameter.minMoney': minMoney,
      'payParameter.number': parseInt(number),
      'payParameter.fee': money,
      'payParameter.startTime': startTime,
      'payParameter.duration': duration
    });
    var isFail = false;
    pay.sendHylm({
      parameter: that.data.payParameter,
      orderSuccess: function (res) {
        wx.hideLoading({})
      },
      paySuccess: function (res) {
        if (!isFail) {
          wx.showToast({
            title: '微信支付成功',
            icon: 'none',
            duration: 2000,
          })
          wx.switchTab({
            url: "../../home/main/home"
          });
        }
      }, payFail: function (res) {
        isFail = true;
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: '微信支付失败',
              icon: 'none',
              duration: 2000
            })
          },
        })
      }
    });
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '发红包' }); 
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    let playParameter = currPage.data.playParameter;
    try {
      var that = this;
      that.setData({
        'items[3].type': util.getPlayName(playParameter.type),
        'items[1].title': (playParameter.type <= 1) ? "总金额数" : "我的红包",
        'items[2].title': (playParameter.type <= 1) ? "红包个数" : "凑钱人数",
      });
    } catch (e) {

    }
    // console.log(that.data.playParameter);
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  

})


