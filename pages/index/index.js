//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   upcoming_items: [
     {
      Image: "/images/cocktailparty.jpg",
      Description: "Let's get wasted! Because it's the weekend.",
      Date: "November 20th",
      Time: "10pm"
     },
     {
      Image: "/images/cocktailparty.jpg",
      Description: "Let's get wasted! Because it's the weekend.",
      Date: "November 20th",
      Time: "10pm"
     },
     {
      Image: "/images/cocktailparty.jpg",
      Description: "Let's get wasted! Because it's the weekend.",
      Date: "November 20th",
      Time: "10pm"
     },
    
     
     
    
   ],
   past_items: [
    {
     Image: "/images/cocktailparty.jpg",
     Description: "Let's get wasted! Because it's the weekend.",
     Date: "November 20th",
     Time: "10pm"
    },
    {
     Image: "/images/cocktailparty.jpg",
     Description: "Let's get wasted! Because it's the weekend.",
     Date: "November 20th",
     Time: "10pm"
    },
    {
     Image: "/images/cocktailparty.jpg",
     Description: "Let's get wasted! Because it's the weekend.",
     Date: "November 20th",
     Time: "10pm"
    },
   
    
   
  ],

  tab_name: "upcoming"
  },
  
  onLoad: function () {
  
  },
  
  goToEvent: function(e){
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
