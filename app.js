//app.js
App({
 
  
    onLaunch: function() {
      wx.BaaS = requirePlugin('sdkPlugin')
      //让插件帮助完成登录、支付等功能
      wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
  
      let clientID = 'f17177e13a6c028af521'  // 应用名称: Collaborate' first MiniApp
      wx.BaaS.init(clientID)
      wx.BaaS.auth.getCurrentUser().then(function(user){
        console.log(`Welcome back ${user.nickname}`)
        wx.setStorageSync('user', user);
  
      }) 
      wx.getLocation({
        type: 'gcj-02',
        success: (res) => {
          console.log('after get location success', res)
        },
        fail: (err) => {
          console.log('after get location fail', err);
        }
      })
    },

  

  globalData: {
    userInfo: null
  }
})