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
      type:Number,
      value:null
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
      var that = this;
      that.setData({
        luckyStr : e.detail.value.length > 0 ? e.detail.value : null
      })
    },

    watchMoney: function (e) {

    },

    sentiment:function(){
      this.triggerEvent("sentiment");
    }
  }
})
