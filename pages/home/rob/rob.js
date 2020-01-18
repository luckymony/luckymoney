// pages/rob/rob.js
const app = getApp();
var util = require('../../../utils/util.js')
var request = require('../../../utils/request.js')
const pageCount = 10
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allItems: [],
    currentItems: [],
    redPacketParameter:{},
    coinIcon: "../../../images/rob/fu.gif",
    showLoading: false,
    luckyStr: '-- --',
    userName: '--' + ' ' + '的红包',
    myRank: '--',
    myName: '--',
    myMoney: '--',
    remainStr: null,
    playId: null,
    playType: null,
    allNumber:0,
    remainNumber:0,
    allFee:0,
    remainFee:0,
    iconUrl: '../../../images/home/icon.png',
    myIconUrl: '../../../images/home/icon.png'
  },

  openGame:function(e) {
    if(this.data.playType == 0) {
      wx.redirectTo({
        url: '../../game/card/card',
      })
    }else if (this.data.playType == 1) {
      wx.redirectTo({
        url: '../../game/rain/rain',
      })
    }
  },

  sendPacket:function(e) {
    wx.switchTab({
      url: "../../start/main/start"
    });
  },

  toShare:function() {
    var that = this;
    if (!that.data.playId)return;
    var urlStr   = '../../share/share?';
    var playId   = 'palyId=' + that.data.playId;
    var playName = 'playName=' + that.data.playName;
    var playType = 'playType=' + that.data.playType;
    var userName = 'userName=' + that.data.userName;
    var iconUrl  = 'iconUrl=' + that.data.iconUrl;
    var luckyStr = 'luckyStr=' + that.data.luckyStr;
    wx.navigateTo({
      url: urlStr + playId + playName + playType + userName + iconUrl + luckyStr,
    })
  },

  /**
   * 获取第一页面数据
   */
  getFirstPageData:function() {
    var that = this;
    let newItems = [];
    if (that.data.allItems.length > pageCount) {
      newItems = that.data.allItems.slice(0, pageCount)
    } else {
      newItems = that.data.allItems
    }
    that.setData({
      currentItems: newItems,
    });
  },
/**
avatarUrl (string, optional): 发送者头像地址 ,
createTime (string, optional): 创建时间 ,
difficultyLevel (integer, optional): 难度等级,0-简单,1-正常,2-困难 ,
duration (integer, optional): 游戏时长,单位为秒 ,
expireTime (string, optional): 过期时间 ,
fee (integer, optional): 红包总金额,单位为分 ,
greetings (string, optional): 祝福语 ,
myFee (integer, optional): 用户抢到的金额,单位为分 ,
myRank (integer, optional): 用户排名 ,
needClickNumber (integer, optional): 需要点击的红包个数 ,
nickname (string, optional): 发送者昵称 ,
number (integer, optional): 红包总个数 ,
rankList (Array[RankItemDto], optional): 排名数据 ,
remainFee (integer, optional): 红包剩余金额,单位为分 ,
remainNumber (integer, optional): 剩余红包个数
 */
  setRedPacketData:function(res) {
    if(!res)return;
    var that = this;
    that.setData({
      iconUrl: res.avatarUrl,
      luckyStr:res.greetings,
      myMoney:res.myFee,
      myRank:res.myRank,
      userName: res.nickname + ' ' + '的红包',
      allFee:res.fee,
      allNumber: res.number,
      remainFee: res.remainFee,
      remainNumber: res.remainNumber,
    })
    that.setRankItems(res.rankList);
  },
/**
  "avatarUrl": "string",
  "nickname": "string",
  "winMoney": 0,
  "winTime": "2020-01-18T14:58:45.718Z"
 */
  setRankItems: function (res) {
     if(res.length == 0)return;
     var that = this;
     var array = [];
     for(var i = 0; i < res.length; i++) {
       var item = res[i];
       var timeStr = util.getTimeStrFromTimeStamp(item.winTime);
       var dic = { icon: item.avatarUrl, 
                   name: item.nickname,
                   money: item.winMoney,
                   time: timeStr};
       array.push(dic);
     }
     that.setData({
       allItems:array
     });
    that.getFirstPageData();
  },
  
  getRedPacketDetail:function() {
    var that = this;
    wx.showLoading({})
    request.kmdjDetail({
      playId:that.data.palyId,
      success: function (res) {
        wx.hideLoading();
        that.setRedPacketData(res);
      },fail:function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '获取红包详情失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var moneyStr = that.data.remainFee + '/' + that.data.allFee + '(元)';
    var numberStr = that.data.remainNumber + '/' + that.data.allNumber + '(个)';
    that.setData({
      remainStr: moneyStr + '&ensp;&ensp;' + numberStr,
      playId: parseInt(options["palyId"]),
      myIconUrl: app.globalData.userInfo.avatarUrl,
      myName: app.globalData.userInfo.nickname
    });
   wx.setNavigationBarTitle({title: '斗利是'});
   that.getRedPacketDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
    var that = this;
    let currentLength = that.data.allItems.length - that.data.currentItems.length;
    if (currentLength <= 0)return;
    that.setData({
      showLoading: true,
    });
    setTimeout(() => {
      let currentIndex = that.data.currentItems.length - 1;
      currentLength = that.data.allItems.length - that.data.currentItems.length;
      if (currentLength >= pageCount) currentLength = pageCount;
      let newArray = that.data.allItems.slice(currentIndex, (currentIndex + currentLength));
      that.setData({
        currentItems: that.data.currentItems.concat(newArray),
        showLoading: false,
      });
    }, 2000);
  },
})

