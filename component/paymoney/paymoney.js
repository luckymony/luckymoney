// component/paymoney/paymoney.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //祝福语
    luckyStr: {
      type: String,
      value: '恭喜发财 大吉大利'
    },
    
    money: {
      type:String,
      value:null
    },

    isCanPay: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindLucky:function(e){
      console.log(e.detail.value);
      this.triggerEvent("bindLucky", e.detail.value);
    },

    watchMoney: function (e) {

    },

    sentiment:function(){
      this.triggerEvent("sentiment");
    },

    watchMoney:function(e){
      var that = this;
      if (e.detail.value > 0 && e.detail.value > 20000) {
        that.setData({
          money : parseFloat(that.data.money) > 0 ? parseFloat(that.data.money) : null
        })
      } else if (e.detail.value > 0 && e.detail.value < 1.0) {
        that.setData({
          money : parseFloat(that.data.money) > 0 ? parseFloat(that.data.money) : null
        })
      } else if (e.detail.value == 0) {
        that.setData({
          money : null
        })
      }
      this.triggerEvent("watchMoney",e.detail.value);
    },

    editedTap:function(e){
       this.triggerEvent("edited", this.properties);
    }
  }
})
