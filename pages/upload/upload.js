// pages/index/upload.js
Page({
  
  data: {
    date: ""
  },
  datechanger:function(e) {
    console.log(e);
    this.setData({
      date: e.detail.value
    })
  },

  timechanger:function(a) {
    console.log(a);
    this.setData({
      time: a.detail.value
    })
  }
})