// pages/index/details.js
const app = getApp()
import moment from 'moment';

Page({
 
  data: {
    image: {
      title: "Loading...",
    },
    items: [{ id: 1, text: "Loading..." }],

    tab_name: "Food",
    Food: [],
    Drinks: [],
    Equipment: [],
    User: [],
    


  },

  onLoad: function(options) {
    const Event = new wx.BaaS.TableObject("events_planning");
    const EventResources = new wx.BaaS.TableObject("event_resources");
    console.log(options.id);
    Event.expand(['creator']).get(options.id).then((res)  => {
      console.log("detail page result", res);
      const Event = res.data
      const user = res.data.creator
      Event.date_and_time = moment(Event.date_and_time).format('MM/DD hh:mm'),
      this.setData({Event: Event,
        User: user,

      });
      
    });


    let query = new wx.BaaS.Query();
    query.compare("events_id", "=", options.id);

    EventResources.setQuery(query).find().then((res)  => {
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

      console.log("tools",equipment);
      this.setData({
          EventResources: res.data.objects,
          Food: food,
          Drinks: drinks,
          Equipment: equipment,
      });
      
    });
  
    const currentUser = wx.getStorageSync('user');
    if (currentUser) {
      this.setData({
        currentUser: currentUser,
      })
    }
    


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
    wx.getLocation({
      type: 'wgs84',
      success:function(res){
        console.log(res)
      }
    })
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        let address = res.address
        

        let Event = new wx.BaaS.TableObject('events_planning')
        let event = Event.create()
        event.set({latitude, longitude, address}).save()
      }
    })
  },

  goToPopup: function(go){
    wx.navigateTo ({
      url: `/pages/popup/popup?id=${go.currentTarget.id}`,

  })
}



  


})
