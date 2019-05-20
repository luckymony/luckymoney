// Page({
//   data: {
//     // text:"这是一个页面"
//     items:[],
//     currentDic:{
//       activityTime:"15分钟",
//       emptyMoneyCount:"10",
//       chanceCount:"3",
//       difficulty:"1"
//     },
//     isShow:false,
//     selectIndex : 0,
//   },

//   click:function (e) {
//     this.setData({
//         isShow:true,
//         selectIndex: e.currentTarget.dataset.index
//     })
//   },

//   hidden:function (e) {
//     this.setData({
//       isShow: false
//     })
//   },

//   selectDifficulty:function (e) {
//     console.log(e.detail);
//   },

//   activityTimeChange:function (e) {
//     console.log(e.detail);
//   },

//   onLoad: function (options) {
//     var obj = JSON.parse(options.value);
//     this.setData({
//       items: obj.types,
//       selectIndex: obj.index
//     });
//     wx.setNavigationBarTitle({ title: '红包玩法' });
//   },
  
//   onReady: function () {
//     // 页面渲染完成
//   },
//   onShow: function () {
//     // 页面显示
//   },
//   onHide: function () {
//     // 页面隐藏
//   },
//   onUnload: function () {
//     // 页面关闭
//   }
// })

Page({

  data: {
    currentIndex: 0
  },

  onLoad: function (options) {

  },
  /* 这里实现控制中间凸显图片的样式 */
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
})