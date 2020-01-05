// component/contplay/contplay.js
var util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //活动限时
    activityTime: {
      type: String,
      value: null
    },
    //最小红包
    minMoneyCount: {
      type: String,
      value: null
    },
    //开始日前
    startDate: {
      type: String,
      value: null
    },
    //开始时间
    startTime: {
      type: String,
      value: null
    },
    //开始时间戳
    startStamp: {
      type: String,
      value: null
    },
    //日前选择器开始日前
    pickerStartDate: {
      type: String,
      value: util.getStartDate()
    },
    //日前选择器结束日前
    pickerEndDate: {
      type: String,
      value: util.getEndDate()
    },
    //日前选择器开始时间
    pickerStartTime: {
      type: String,
      value: util.getCurrentStartTime()
    },
    //日前选择器结束时间
    pickerEndTime: {
      type: String,
      value: '23:59'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentMoney:'0.00',
    inputTimerout:null
  },

  /**
   * 组件的方法列表
   */
  methods: {

    watchTimeLength:function(e) {
      var that = this;
      if (that.data.inputTimerout) {
        clearTimeout(that.data.inputTimerout);
      }
      that.data.inputTimerout = setTimeout(() => {
        clearTimeout(that.data.inputTimerout)
        if (e.detail.value > 0 && e.detail.value < 60) { //小于60秒
          // console.log('小于60秒')
          that.triggerEvent("dataError", '游戏限时需大于等于60秒');
        } else if (e.detail.value > 0 && e.detail.value > 300) { //大于300秒
          // console.log('大于300秒')
          that.triggerEvent("dataError", '游戏限时需小于等于300秒');
        }
      },2000);

      that.setData({
        activityTime: e.detail.value > 0 ? e.detail.value : null
      })
    },

    watchMoney:function(e) {
      var that = this;
      console.log(e.detail);
      if (e.detail.value > 0 && e.detail.value > 20000) {
        that.setData({
          minMoneyCount: parseFloat(that.data.currentMoney) > 0 ? parseFloat(that.data.currentMoney) : null
        })
        that.triggerEvent("dataError", '单次支付总金额不可超过20000元');
        return;
      } else if (e.detail.value > 0 && e.detail.value < 1.0) {
        that.setData({
          minMoneyCount: parseFloat(that.data.currentMoney) > 0 ? parseFloat(that.data.currentMoney) : null
        })
        that.triggerEvent("dataError", '单次支付总金额大于1.00元');
        return;
      } 
      var num = util.pointNumer(e.detail.value);
      that.setData({
        minMoneyCount: num,
        currentMoney: num ? util.moneyFormat(num.toString()) : '0.00'
      })
      return // 必加，不然输入框可以输入多位小数
    },

    bindDateChange:function(e) {
      var that = this;
      that.setData({
        startDate: e.detail.value,
        pickerStartTime: util.getStartTime(e.detail.value)
      })
    },

    bindTimeChange:function(e) {
      var that = this;
      that.setData({
        startTime: e.detail.value
      })
    },

    editedTap: function (e) {
      this.triggerEvent("edited", this.properties);
    }
  }
})
