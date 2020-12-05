//app.js
App({
 
  
    onLaunch: function() {
      wx.BaaS = requirePlugin('sdkPlugin')
      //让插件帮助完成登录、支付等功能
      wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)
  
      let clientID = 'f17177e13a6c028af521'  // 应用名称: Collaborate' first MiniApp
      wx.BaaS.init(clientID)
    },

  

  globalData: {
    userInfo: null
  }
})