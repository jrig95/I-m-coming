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


  },

  onLoad: function(options) {
    const Event = new wx.BaaS.TableObject("events_planning");
    const EventResources = new wx.BaaS.TableObject("event_resources");
    console.log(options.id);
    Event.get(options.id).then((res)  => {
      console.log("detail page result", res);
      const Event = res.data
      Event.date_and_time = moment(Event.date_and_time).format('MM/DD hh:mm'),
      this.setData({Event: Event
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


})
