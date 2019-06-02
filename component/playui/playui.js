
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
    
    //显示时间
    isShowTime: {
      type: Boolean,
      value: false
    },

    //隐藏空红包
    isEmptyMoney: {
      type: Boolean,
      value: true
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

    timeItems: {
      type: Array,
      value: []
    },

    timeIndex: {
      type: Number,
      value: 0
    },
   
    longTime: {
       type: Number,
       value: 86400
    },
  },

  methods: {
    difficultyTap: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        selectIndex : index,
      });
    },

    getTimeIndex: function (timeItems, currentTime) {
      console.log(timeItems,currentTime);
      for (var i = 0; i < timeItems.length; i++) {
        let oneTime = timeItems[i];
        console.log(oneTime);
        if (oneTime == currentTime) {
          return i;
        }
      }
      return 0;
    },
    
    activityTimeTap: function (e) {
      this.setData({
        isShowTime:true,
        timeIndex: this.getTimeIndex(this.properties.timeItems, this.properties.longTime),
      });
      this.triggerEvent("activityTimeChange", e.currentTarget.id);
    },
    editedTap:function (e) {
      this.triggerEvent("edited", this.properties);
    },
    itemTimeTap:function (e) {
      let index = e.currentTarget.id;
      let data = this.properties.timeItems[index];
       this.setData({
         activityTime:
           data >= 86400 ? ((data / 3600) + '小时') : ((data / 60) + '分钟'),
           timeIndex: index,
         longTime: data
       })
    },
  },
});
