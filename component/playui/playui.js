
Component({
  options: {
    multipleSlots: true
  },
  properties:{
    
    //活动限时
    activityTime: {
      type: Number,
      value: 120
    },
    
    //游戏类型
    playType: {
      type: Number,
      value: 1
    },

    //机会个数
    chanceCount: {
      type: Number,
      value: 0
    },
    
    //选择难度
    selectIndex: {
      type: Number,
      value: 0
    },

    //设置难度
    difficulty: {
      type: Array,
      value: [{ name: "简单", level: 0},
              { name: "正常", level: 1}, 
              { name: "困难", level: 2}]
    }
  },

  methods: {
    //选择难度
    difficultyTap: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        selectIndex : index,
      });
    },

    editedTap:function (e) {
      this.triggerEvent("edited", this.properties);
    },

  },
});
