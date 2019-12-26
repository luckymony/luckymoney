// component/failed/failed.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
       type:Number,
       value:5
    },

    isShow: {
      type:Boolean,
      value:true
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

    cancelBindtap:function() {
        console.log("放弃")
        this.setData({
          isShow: false
        });
    },

    continueBindtap:function() {
        console.log("继续")
        this.setData({
          isShow: false
        });
    },

    okBindtap:function() {
      console.log("确定")
      this.setData({
        isShow: false
      });
    }
  }
})
