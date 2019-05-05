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

    //设置难度
    difficulty: {
      type: Array,
      value: [{ "name": "简单", "level": 0, "selected": 0 },
              { "name": "正常", "level": 1, "selected": 1 }, 
              { "name": "困难", "level": 2, "selected": 0 }]
    },
  },
  methods: {
    difficultyTap: function (e) {
      console.log(e.currentTarget.dataset.index);
      let index = e.currentTarget.dataset.index;
      this.data({
        ['difficulty[index].selected']: 1,
      });
    },
  },

});
