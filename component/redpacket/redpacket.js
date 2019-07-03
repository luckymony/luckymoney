// component/redpacket/redpacket.js
var i = 1;
var currentTimeout = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
  },
  /**
   * 组件的初始数据
   */
  data: {
    imageSrc: "../../images/packet/icon_open_red_packet1.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gif: function () {
      let newSrc = "../../images/packet/icon_open_red_packet" + i + ".png";
      i++;
      if (i > 11) {
        i = 1;
      }
      var that = this;
      // console.log(newSrc);
      currentTimeout = setTimeout(function () {
        that.gif();
      }, 200)
      that.setData({
        imageSrc: newSrc,
      });
    },
  },


  attached: function (e) {
    var that = this;
    currentTimeout = setTimeout(function () {
      that.gif();
    }, 250)
  },
  moved: function () { 
    
  },
  detached: function () { 
    
    clearTimeout(currentTimeout);
  },
})
