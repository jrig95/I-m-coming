// pages/index/details.js
const app = getApp()
import moment from 'moment';

Page({
 
  data: {
    image: { title: "Loading..." },
    items: [{ id: 1, text: "Loading..." }],
    tab_name: "Food",
  },

  getEventInfo: function(options) {
    if (options || (this.data.event && this.data.event.id)) {
      let id = options ? options.id : this.data.event.id; 
      const Event = new wx.BaaS.TableObject("events_planning");
      Event.expand(['creator']).get(id).then((res)  => {
        const event = res.data
        const user = res.data.creator
        event.date_and_time = moment(event.date_and_time).format('MM/DD hh:mm'),
        this.setData({ event, user });
      });
    }
  },

  getEventResources: function(options){
    if (options || (this.data.event && this.data.event.id)) {
      let id = options ? options.id : this.data.event.id; 
      const EventResources = new wx.BaaS.TableObject("event_resources");
      let query = new wx.BaaS.Query();
      query.compare("events_id", "=", id);
  
      EventResources.expand(['resource']).setQuery(query).find().then((res)  => {
        console.log("resources", res);
        const resources = res.data.objects;
        const food = [];
        const drinks = [];
        const equipment = [];
        for (let i = 0; i < resources.length; i++) {
          const oneResource = resources[i];
          if(resources[i].food){
            const newResource = oneResource;
            food.push(newResource);
          };
          if(resources[i].drink){
            const newResource = oneResource;
            drinks.push(newResource);
          };
          if(resources[i].equipment){
            const newResource = oneResource;
            equipment.push(newResource);
          };
        }
        this.setData({
          resources,
          food,
          drinks,
          equipment
        })
      })
    }
  },

  
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    this.setData({user})
    this.getEventInfo(options);
    this.getEventResources(options);
  },

  onShow: function () {
    this.getEventInfo();
    this.getEventResources();
  },

  goToFood: function(e) {
    console.log("event", e)
    this.setData({
      tab_name: "Food"
    });
  },

  goToDrinks: function(e) {
    console.log("event", e)
    this.setData({
      tab_name: "Drinks"
    });
  },

  goToEquip: function(e) {
    console.log("event", e)
    this.setData({
      tab_name: "Equipment"
    });
  },

  openMap:function(map){
      const latitude = this.data.event.latitude
      const longitude = this.data.event.longitude
      wx.openLocation({
        latitude,
        longitude,
        scale: 18
      })
    },
    // wx.chooseLocation({
    //   success: function(res) {
    //     console.log(res)
    //     let latitude = res.latitude
    //     let longitude = res.longitude
    //     let address = res.address
        

    //     let Event = new wx.BaaS.TableObject('events_planning')
    //     let event = Event.create()
    //     event.set({latitude, longitude, address}).save()
    //   }
    
    goToPopup: function(go){
      console.log(go.currentTarget.id)
      wx.navigateTo ({
        url: `/pages/popup/popup?id=${go.currentTarget.id}`,
  
    })
  },

  onShareAppMessage: function () {
    return {
      title: this.data.event.name,
      path: `/pages/detail/detail?id=${this.data.event.id}`,
      imageUrl: this.data.image
    }
  }
})
