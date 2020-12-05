//index.js
//获取应用实例
const app = getApp()
import moment from 'moment';

Page({
  data: {
   upcoming_items: [],
   past_items: [],

  tab_name: "upcoming"
  },
  
  onLoad: function () {
    const events = new wx.BaaS.TableObject("events_planning");

    events.find().then((res) =>{
      console.log("results from ifanr", res)
      const events = res.data.objects;
      const futureEvents = [];
      const pastEvents = [];
      for(let i = 0; i < events.length; i++){
        const oneEvent = events[i];
        if(moment(oneEvent.date_and_time).isBefore(moment())) {
          // if time is in the past, push into pastEvents
          const newEvent = oneEvent;
          newEvent.date_and_time = moment(oneEvent.date_and_time).format('MM/DD hh:mm')
          pastEvents.push(newEvent);
        } else {
          const newEvent = oneEvent;
          newEvent.date_and_time = moment(oneEvent.date_and_time).format('MM/DD hh:mm')
          futureEvents.push(newEvent);

        }
 
  
      };


      console.log(pastEvents);
      this.setData({
        upcoming_items: futureEvents,
        past_items: pastEvents,
  
      });
     },
     (error) => {
       console.log("Error!", error);
     });


  },
  
  goToEvent: function(e){
    console.log('event', e)
    wx.navigateTo ({
      url: `/pages/details/details?id=${e.currentTarget.id}`,
  });
    
  },

  goToUpcoming: function(e) {
    console.log("event", e)
    this.setData({
      tab_name: "upcoming"
    });
  },

  goToPast: function(e) {
    console.log("event", e)
    this.setData({
      tab_name: "past"
    });
  }
})
