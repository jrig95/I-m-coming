// pages/index/popup.js
Page({
  
  data: {
    Food: [],
    Drinks: [],
    Equipment: [],
  },

  submitEvent: function(e){
    let user = wx.getStorageSync('user')
    if (user.is_authorized) this.createResource(e,user);
  },

  createResource: function(e,user){
    let food = e.detail.value.food
    let drink = e.detail.value.drink
    let equipment = e.detail.value.equipment
    let nothing = e.detail.value.nothing
    let eventId = this.data.eventId

    const Resources = new wx.BaaS.TableObject("event_resources");
    const resource = Resources.create()
    console.log(nothing)
    resource.set({
      food,
      drink,
      equipment,
      nothing,
      resource: user.id,
      events_id: eventId
    })
    resource.save().then((res) => {
      wx.navigateBack({
        delta: 0,
        success: res => {
          wx.showToast({
            title: 'Added!',
          })
        }
      })
    })
  },

  userInfoHandler: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user);
      this.setData({user})
    })
  },

  onLoad: function (options) {
    const user = wx.getStorageSync('user');
    this.setData({ user, eventId: options.id })
  }
})
