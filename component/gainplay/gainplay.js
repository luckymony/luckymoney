// component/gainplay/gainplay.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //活动限时
    activityTime: {
      type: Number,
      value: 120
    },

    //红包积分
    integralCount: {
      type: Number,
      value: 200
    },

    //机会个数
    chanceCount: {
      type: Number,
      value: 1
    },

    //选择难度
    selectIndex: {
      type: Number,
      value: 0
    },

    //设置难度
    difficulty: {
      type: Array,
      value: [{ name: "简单", level: 0 },
      { name: "正常", level: 1 },
      { name: "困难", level: 2 }]
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