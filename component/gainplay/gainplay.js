// component/gainplay/gainplay.js
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

    //红包积分
    integralCount: {
      type: String,
      value: '200'
    },

    //机会个数
    chanceCount: {
      type: String,
      value: '1'
    },

    //选择难度
    selectIndex: {
      type: Number,
      value: 0
    },

    //设置难度
    difficulty: {
      type: Array,
      value: [
      { name: "简单", level: 0 },
      { name: "正常", level: 1 },
      { name: "困难", level: 2 }]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    timeArray: ['60', '120', '180', '240', '300'],
    integralArray: ['100','200','300','400','500'],
    chanceArray: ['1','2','3','4','5'],
    index1:1,
    index2:1,
    index3:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    //游戏时长
    bindPickerChange1:function(e) {
      var that = this;
      that.setData({
        activityTime: that.data.timeArray[e.detail.value],
        index1: e.detail.value
      })
    },

    //红包积分
    bindPickerChange2: function (e) {
      var that = this;
      that.setData({
        integralCount: that.data.integralArray[e.detail.value],
        index2: e.detail.value
      })
    },

    //拥有机会
    bindPickerChange3: function (e) {
      var that = this;
      that.setData({
        chanceCount: that.data.chanceArray[e.detail.value],
        index3: e.detail.value
      })
    },

    //选择难度
    difficultyTap: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        selectIndex: index,
      });
    },

    editedTap: function (e) {
      this.triggerEvent("edited", this.properties);
    },
  }
})