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

    },

    getPhoto: function() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: (result) => {
                console.log('getPhoto success', result);
                this.setData({
                    image: result.tempFilePaths[0],
                })
                const File = new wx.BaaS.File();
                const fileParams = {
                  filePath: result.tempFilePaths[0]
                };
                const metadata = {
                  categoryName: "event_testing"
                };

                wx.showLoading({
                  title: 'Loading',
                  mask: true,
                  success: (result) => {
                      console.log("result", result)
                  },
                  fail: () => {},
                  complete: () => {}
                  });

                  File.upload(fileParams, metadata).then(
                    (res) => {
                        console.log("upload image res", res);
                        const Events = new wx.BaaS.TableObject("events_planning");
        
                       
        
                        Events.set({
                            image: res.data.path,
                        });

                      })
        
                       

                  


            },
            fail: (err) => {
                console.log('getPhoto err', err);
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

    submitEvent: function(event) {
        let date = this.data.date
        let time = this.data.time
        let name = event.detail.value.name
        let latitude = this.data.latitude
        let longitude = this.data.longitude
        let address = this.data.address
        let description = this.data.description
        let image = this.data.image
        let decision = this.data.decision
        const date_and_time = moment(`${date} ${time}`).toISOString();
        const Events = new wx.BaaS.TableObject("events_planning");
        const newEvent = Events.create();
        console.log("date", name)
        newEvent.set({

            date_and_time,
            name,
            latitude,
            longitude,
            address,
            description,
            image,
            decision
        })
        newEvent.save().then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })




    }
})