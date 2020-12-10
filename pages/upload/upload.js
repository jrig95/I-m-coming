// pages/index/upload.js
const app = getApp()
import moment from 'moment';
Page({
    data: {
        items: [{
                name: 'Yes',
                value: 'Yes'
            },
            {
                name: 'No',
                value: 'No'
            }
        ],
        image: null,
        events: [{id: 1, text: "Loading..."}]
    },

    getPhoto: function() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                const File = new wx.BaaS.File();
                const fileParams = { filePath: result.tempFilePaths[0] };
                const metadata = { categoryName: "event_testing" };
                File.upload(fileParams, metadata).then((res) => {
                    console.log("upload image res", res);
                    this.setData({ image: res.data.path });
                })
            }
        }) 
    },


    datechanger: function(e) {
        console.log("date", e);
        this.setData({
            date: e.detail.value
        })
    },

    timechanger: function(a) {
        console.log(a);
        this.setData({
            time: a.detail.value
        })
    },

    getLocation: function(location) {
        wx.chooseLocation({
            success: (res) => {
                console.log(location)
                let latitude = res.latitude
                let longitude = res.longitude
                let address = res.address

                this.setData({
                    latitude,
                    longitude,
                    address
                })
            }
        })
    },
    

    radioChange: function(e) {
        console.log('radio triggers a change event that carries the value of ', e.detail.value)
        if (e.detail.value === "Yes") {
            this.setData({
                decision: true
            })
        } else {
            this.setData({
                decision: false
            })
        }
    },

    createEvent: function(event){
        const date_and_time = moment(`${this.data.date} ${this.data.time}`).toISOString();
        
        const Events = new wx.BaaS.TableObject("events_planning");
        const newEvent = Events.create();
        newEvent.set({
            date_and_time,
            name: event.detail.value.name,
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            address: this.data.address,
            description: event.detail.value.description,
            image: this.data.image,
            decision: this.data.decision,
            creator: this.data.user.id
        })
        newEvent.save().then((res) => { wx.switchTab({ url: '/pages/index/index' }) })
    },
    submitEvent: function(event) {
        let user = wx.getStorageSync('user')
        if (user) this.createEvent(event);
    },

    userInfoHandler: function (data) {
        wx.BaaS.auth.loginWithWechat(data).then(user => {
          wx.setStorageSync('user', user);
          this.setData({user})
        })
    },

    onLoad: function (options) {
        const user = wx.getStorageSync('user');
        this.setData({ user }) 
      },
    
})