define([
  "zeega",
  // Libs
  "backbone",
  // Plugins
  'zeega_player'
],

function(Zeega, Backbone) {

  // Create a new module
  var App = Zeega.module();


  App.Model = Backbone.Model.extend({

    url : 'http://dev.zeega.org/joseph/web/api/projects/1316',

    defaults : {
      appName : 'wayfinder',
      mode :'standalone',

      navbar_top : false,
      navbar_bottom : false,
      layerCitations : false,
      playerCitation : false,
      
      branding : false,
      social : false,
      fullscreenEnabled : false,
      fadeOutOverlays : false
    },

    initialize : function()
    {
      console.log('pt init')
      var _this = this;
      this.fetch().success(function(){ _this.loadPlayer() });
    },

    loadPlayer : function()
    {
      //I'm trusting that I'm getting valid data back
      // the settings are a part of the data! this means the player attributes can be controlled by the data!
      Zeega.player = new Zeega.Player( this.toJSON() );
      Zeega.player.play();
    },

    parse : function(data){ return data.project }

  })


  App.Views.Base = Backbone.View.extend({
    manage: true,
    template: "base",
  });

  App.Views.UpperNavView = Backbone.View.extend({
    manage : true,
    template : 'upper-nav',

    tagName : 'ul',


  })

  // Required, return the module for AMD compliance
  return App;

});
