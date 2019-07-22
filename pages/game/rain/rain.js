
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
    viewHeight:0,
    viewTop:0,
    redPackets:[]
  },

  initPacket: function (i) {
    var width = (windowWidth - 90) / 5;
    var height = (windowWidth - 90) / 5;
    var x = 0;
    var y = 0;
    var packet = {};
    x = 8 * (i % 5) + width * (i % 5);
    var index = parseInt(i / 5);
    y = index * 8 + height * index;
    packet.x = x;
    packet.y = y;
    packet.t_x = 0;
    packet.t_y = 0;
    packet.t_i = 0;
    packet.w = width;
    packet.h = height;
    packet.c = "#ff00ff";
    packet.i = i;
    packet.avg_x = 0;
    packet.avg_y = 0;
    packet.n = 0;
    return packet;
  },

  initRedPackets: function () {
    var that = this;
    for (var i = 0; i < 25; i++) {
      var packet = that.initPacket(i);
      that.data.redPackets.push(packet);
    }
    console.log(that.data.redPackets);
  },

  onLoad:function() {
    this.initRedPackets();
    this.setData({
      viewHeight : (windowWidth - 60)*2,
      viewTop: (windowHeight - (windowWidth - 60)),
    });
  },

});