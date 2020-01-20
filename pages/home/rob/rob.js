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
    playParameter:{},
    coinIcon: "../../../images/rob/fu.gif",
    showLoading: false,
    luckyStr: '-- --',
    userName: '--' + '的红包',
    myRank: '--',
    myName: '--',
    myMoney: '--',
    remainStr: null,
    playId: null,
    playType: null,
    playName: null,
    allNumber:0,
    remainNumber:0,
    allFee:0,
    remainFee:0,
    iconUrl: '../../../images/home/icon.png',
    myIconUrl: '../../../images/home/icon.png'
  },

  openGame:function(e) {
    var that = this;
    wx.showLoading({})
    if(that.data.playType == 0) {
      request.kmdjStart({
        playId:that.data.playId,
        success: function (res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../../game/card/card?' + 'playParameter=' + that.data.playParameter,
          })
        },fail:function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '获取红包详情失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }else if (that.data.playType == 1) {
      request.bflcStart({
        playId:that.data.playId,
        success: function (res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../../game/rain/rain?' + 'playParameter=' + that.data.playParameter,
         })
        },fail:function(res) {
          wx.hideLoading();
          wx.showToast({
            title: '获取红包详情失败',
            icon: 'none',
            duration: 2000
          })
        }
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
    if (!that.data.playId) {
      wx.navigateTo({
        url: '../../share/share',
      })
      return;
    }
    var urlStr   = '../../share/share?';
    var playId =   'playId=' + that.data.playId;
    var playName = '&playName=' + that.data.playName;
    var playType = '&playType=' + that.data.playType;
    var userName = '&userName=' + that.data.userName;
    var iconUrl  = '&iconUrl=' + that.data.iconUrl;
    var luckyStr = '&luckyStr=' + that.data.luckyStr;
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

  setRedPacketData:function(res) {
    if(!res)return;
    var that = this;
    that.setData({
      iconUrl: res.avatarUrl,
      luckyStr: res.greetings,
      myMoney: res.myFee > 0 ? res.myFee : '--',
      myRank: res.myRank > 0 ? es.myRank : '--',
      userName: res.nickname + '的红包',
      allFee: (res.fee/100).toFixed(2),
      allNumber: res.number,
      remainFee: (res.remainFee/100).toFixed(2),
      remainNumber: res.remainNumber,
    })

    var moneyStr = that.data.remainFee + '/' + that.data.allFee + '元';
    var numberStr =  + that.data.remainNumber + '/' + that.data.allNumber + '个';
    that.setData({
      remainStr: '领取' + ' ' + numberStr
    });
    that.setRankItems(res.rankList);
  },

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

  setPlayParameter:function(res) {
      if(!res)return;
      var that = this;
      if(that.data.playType == 0) { // 开门大吉
          that.setData({
            'playParameter.playId' : that.data.playId,
            'playParameter.createTime' : res.createTime,
            'playParameter.expireTime' : res.expireTime,
            'playParameter.difficultyLevel' : res.difficultyLevel,
            'playParameter.duration' : res.duration,
            'playParameter.needClickNumber' : res.needClickNumber
          })
      }else if (that.data.playType == 1) { // 八方来财
        that.setData({
          'playParameter.playId' : that.data.playId,
          'playParameter.createTime' : res.createTime,
          'playParameter.expireTime' : res.expireTime,
          'playParameter.difficultyLevel' : res.difficultyLevel,
          'playParameter.duration' : res.duration,
          'playParameter.needIntegral' : res.needIntegral
        })
      }
  },
  
  getRedPacketDetail:function() {
    var that = this;
    wx.showLoading({})
    if (that.data.playType == 0) {
          that.getKmdjDetail();
    }else if (that.data.playType == 1) {
          that.getBflcDetail();
    }
  },

  getKmdjDetail:function() {
    var that = this;
    request.kmdjDetail({
      playId:that.data.playId,
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

 getBflcDetail:function() {
    var that = this;
    request.bflcDetail({
      playId:that.data.playId,
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
    var moneyStr = that.data.remainFee + '/' + that.data.allFee + '元';
    var numberStr = that.data.remainNumber + '/' + that.data.allNumber + '个';
    var playId = parseInt(options["playId"]);
    var playType = parseInt(options["playType"]);
    that.setData({
      remainStr: '领取' + ' ' + numberStr,
      playName: util.getPlayName(playType),
      playId: playId,
      playType: playType,
      myIconUrl: app.globalData.userInfo.avatarUrl,
      myName: app.globalData.userInfo.nickname
    });
    wx.setNavigationBarTitle({ title: that.data.playName});
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

