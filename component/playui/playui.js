Component({
    data:{
       times:["15分钟","30分钟","45分钟","60分钟","24小时"],
       oneIndex: 1,  // 默认选中第几行
    },
    
     timeChange: function (event) {
      this.setData({
        oneIndex: event.detail.value
      });
    },

    cancel: function (event) {
      console.log("取消了");
    },

});
