define([
  "zeega",
  // Libs
  "backbone",

  // Plugins
  'zeega_player'
],

function(Zeega, Backbone) {

  // Create a new module
  var PT = Zeega.module();


  PT.Model = Backbone.Model.extend({

    url : 'http://dev.zeega.org/joseph/web/api/projects/1316',

    defaults : {
      appName : 'wayfinder',
      mode :'standalone',

      navbar_top : true,
      navbar_bottom : true,
      layerCitations : true,
      playerCitation : true,
      
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


  PT.Views.Base = Backbone.View.extend({
    manage: true,
    template: "base",
  });

  PT.Views.UpperNavView = Backbone.View.extend({
    manage : true,
    template : 'upper-nav',

    tagName : 'ul',

    events : {
      'click a' : 'onClick'
    },

    onClick : function()
    {
      //alert('clickedddd')
    }

  })

  // Required, return the module for AMD compliance
  return PT;

});
