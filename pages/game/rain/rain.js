
var windowWidth  = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;

Page({

  data: {
   animation:{},
   hidden:false
  },

  onLoad:function() {

  },

  openRedPacket:function(e) {
    console.log('打开红包');
    this.setData({
        hidden:true
    });
    this.redpacket = this.selectComponent("#redpacket");
    this.redpacket.startOpenReadPacket();
  },

  openRedPacketSuccess:function() {
    this.redpacket = this.selectComponent("#redpacket");
    this.redpacket.openReadPacketSuccess();
  },
  openRedPacketFailed:function() {
    this.redpacket = this.selectComponent("#redpacket");
    this.redpacket.openRedPakcetFailed();
  },

});