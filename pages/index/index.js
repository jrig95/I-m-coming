//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  
  onLoad: function () {
  
  },
  
  toUpload:function(){
    wx.navigateTo({
         url:"/pages/upload/upload"
    })
  }
})
