Component({
  options: {
    multipleSlots: true
  },
  properties:{
    //活动限时
    activityTime: {
      type: String,
      value: "24小时"
    },

    // 空红包个数
    emptyMoneyCount: {
      type: Number,
      value: 0
    },

    //机会个数
    chanceCount: {
      type: Number,
      value: 1
    },
    
    //选择难度
    selectIndex: {
      type: Number,
      value: 2
    },

    //设置难度
    difficulty: {
      type: Array,
      value: [{ name: "简单", level: 0},
              { name: "正常", level: 1}, 
              { name: "困难", level: 2}]
    },
  },

  methods: {
    difficultyTap: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        selectIndex : index,
      });
      this.triggerEvent("selectDifficulty",index);
    },
    activityTimeTap: function (e) {
      // console.log(e.currentTarget.id);
      this.triggerEvent("activityTimeChange", e.currentTarget.id);
    },
  },
});
