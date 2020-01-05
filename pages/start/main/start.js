var util = require('../../../utils/util.js')
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
    redPacketCount:'0',
    serviceFee:'0.00',
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

  handleClickItem({detail}) {
    const index = detail.index;
    if (index == 0) {
      this.setData({
        visible: false,
        'items[0].title': "鼠兆丰年 盛世贺岁"
      });
    }else if(index == 1){
      this.setData({
        visible: false,
        'items[0].title':"恭喜发财 大吉大利"
      });
    }else if(index == 2) {
      this.setData({
        visible: false,
        'items[0].title':"合乐融融 财运滚滚"
      });
    }else if (index == 3) {
      this.setData({
        visible: false,
        'items[0].title':"一帆风顺 二龙腾飞"
      });
    }else if (index == 4) {
      this.setData({
        visible: false,
        'items[0].title':"七星高照 八方来财"
      });
    }else if (index == 5) {
      this.setData({
        visible: false,
        'items[0].title': "鼠你最美 鼠你最棒"
      });
    }
  },

  toTip:function() {
    wx.navigateTo({
      url: '../tip/tip',
    })
  },
  
  toPlay:function() {
    var that = this;
    var index = that.data.playTypes.indexOf(that.data.items[3].type);
    wx.navigateTo({
      url: '../play/play?value=' + JSON.stringify(index),
    })
  },

  watchMoney:function(e) {
    // console.log(e.detail);
    var that = this;
    if (e.detail.value > 0 && e.detail.value > 20000) {
      that.setData({
        'items[1].number': parseFloat(that.data.moneyCount) > 0 ? parseFloat(that.data.moneyCount):null
      })
      $Message({
        content: '单次支付总金额不可超过20000元',
        type: 'warning',
        duration:3
      });
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
      return;
    }else if (e.detail.value == 0) {
      that.setData({
        'items[1].number': null,
        moneyCount: '0.00',
        serviceFee: '0.00'
      })
      return
    }
  
    var num = util.pointNumer(e.detail.value);
    that.setData({
      'items[1].number': num,
      moneyCount: num ? util.moneyFormat(num.toString()) : '0.00',
      serviceFee: num ? util.getServiceFee(num) : '0.00'
    })
    return // 必加，不然输入框可以输入多位小数
  },

  watchCount:function(e) {
    var that = this;
    if (e.detail.value && e.detail.value > 500) {
      that.setData({
        'items[2].number': parseInt(that.data.redPacketCount)
      })
      $Message({
        content: '一次最多发500个红包',
        type: 'warning',
        duration: 3
      });
      return;
    } else if (e.detail.value && e.detail.value < 1) {
      $Message({
        content: '请填写红包个数',
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
       && (that.data.moneyCount / e.detail.value * 1.00) < 0.01) {
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
  },

  payMoney:function() {
    var that = this;
    /*
    wx.request({
      //请求地址
      url: 'http://5c6qfk.natappfree.cc/api/redPackage/send',
      data: {
        "chanceNumber": 1,
        "difficultyLevel": 0,
        "duration": 120,
        "fee": 100,
        "greetings": "新车愉快,大吉大利",
        "integral": 0,
        "needClickNumber": 6,
        "number": 2,
        "payType": 1,
        "type": 0
      },//发送给后台的数据
      header: {//请求头
        "Content-Type": "application/json",
        "accessToken": app.globalData.token
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
       console.log(res);
      },//请求失败
      complete: function (res) {//请求完成
        console.log(res);
        if (res.statusCode == 200 && res.data.code == 0) {
         
        } else {
         
        }
      }//请求完成后执行的函数
    })
   */
    /*
    wx.requestPayment({
      timeStamp: '1577535093',
      nonceStr: 'f6411a0b3e4d4d12818a084f4614dd5f',
      package: 'prepay_id=wx2820113212643211b057a2d61063592500',
      signType: 'MD5',
      paySign: '004651528CD179AC6816BF785908015E',
      success : function (res) {
          console.log(res);
      },
       fail : function (res) {
         console.log(res);
      },
      complete : function (res) {
        console.log(res);
      }
    })
    */
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
    let json = currPage.data.playParameter;
    if (json) {
      var that = this;
      that.setData({
        'items[3].type': json.parameter.title,
        'items[1].title': (json.type <= 1) ? "总金额数" : "我的红包",
        'items[2].title': (json.type <= 1) ? "红包个数" : "凑钱人数"
      });
      console.log(that.data.playParameter);
    }
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  

})


