
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

  toRedPacketRecord:function (e) {
    console.log('点击了========');
    wx.showToast({
      title: '点击去红包记录',
      icon: 'success',
      image: '',
      duration: 2000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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