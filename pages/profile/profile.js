// pages/profile/profile.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const currentUser = wx.getStorageSync('user');
    if (currentUser) {
      this.setData({
        currentUser: currentUser,
      })
    }
  },

  userInfoHandler: function(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      this.setData({
        currentUser: user,
      })
        console.log('user', user);
      }, err => {
        console.log("It's an error!", error)
    })
  },
  

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})