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
      value: '120'
    },
    //最小红包
    minMoneyCount: {
      type: String,
      value: '8'
    },
    //开始日前
    startDate: {
      type: String,
      value: util.getStartDate()
    },
    //开始时间
    startTime: {
      type: String,
      value: util.getCurrentStartTime()
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
    inputTimerout:null,
    timeArray:['60','120','180','240','300'],
    index:1
  },
  /**
   * 组件的方法列表
   */
  methods: {

    watchMoney:function(e) {
      var that = this;
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

    bindPickerChange:function(e) {
      var that = this;
      that.setData({
        activityTime:that.data.timeArray[e.detail.value],
        index: e.detail.value
      })
    },

    editedTap: function (e) {
      this.triggerEvent("edited", this.properties);
    }
  }
})
