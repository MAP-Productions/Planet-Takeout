define([
  "zeega",
  // Libs
  "backbone",

  // Modules
  //"modules/player"

  // Plugins
  'zeega_player'
],

function(zeega, Backbone, Zeega) {

  // Create a new module
  var Example = zeega.module();

  // This will fetch the tutorial template and render it.
  Example.Views.Tutorial = Backbone.View.extend({
    template: "example",

    events : {
      'click #submit-button' : 'goToProject'
    },

    goToProject : function()
    {
      var dataloc = this.$('.dataloc').val();
      if(dataloc) this.loadProject( dataloc );
    },

    loadProject : function( dataLoc )
    {
      var _this = this;
      $.ajax({
        url : dataLoc, //'http://dev.zeega.org/joseph/web/api/projects/1280',
      }).done(function(data){ _this.loadPlayer(data) })
    },

    loadPlayer : function(data)
    {
      if(data.project)
      {
          var playerOptions = {
            appName : 'wayfinder',
            mode :'standalone',

            navbar_top : true,
            navbar_bottom : true,
            layerCitations : true,
            playerCitation : true,
            
            branding : false,
            social : false,
            fullscreenEnabled : true,
            fadeOutOverlays : false

          }
          zeega.tester = true;
          // the settings are extended in the data! this means the player attributes can be controlled by the data!
          zeega.player = new Zeega.Player( _.extend(data.project,playerOptions) );
          console.log('zeega', zeega)
          zeega.player.play();

          console.log('zeega', zeega)
      }
      else alert('bad data O_o')
    }

  });

  // Required, return the module for AMD compliance
  return Example;

});
