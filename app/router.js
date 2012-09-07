define([
  // Application.
  "zeega",

  // Modules.
  'modules/planet-takeout',
],

function(Zeega, PT) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "" : "index",
      "about" : 'about',
      "grid" : 'grid',
      'map' : 'map',
      'participate' : 'participate',
      'menu' : 'menu',
      'search' : 'search'
    },

    index: function()
    {
      renderBaseLayout();
      Zeega.PT = new PT.Model();      
    },

    about : function()
    {
      console.log('go to about')
      renderBaseLayout();
    },

    grid : function()
    {
      console.log('go to grid')
      renderBaseLayout();

    },

    map : function()
    {
       console.log('go to map')
     renderBaseLayout();

    },

    participate : function()
    {
      console.log('go to participate')
      renderBaseLayout();

    },

    menu : function()
    {
      console.log('go to menu')
      renderBaseLayout();

    },

    search : function()
    {
       console.log('go to search')
     renderBaseLayout();

    },





  });

  function renderBaseLayout()
  {
    if( !Zeega.isInitialized )
    {
      Zeega.baseLayout = new Backbone.Layout({
        el: "#main"
      });
      // Insert the tutorial into the layout.
      Zeega.baseLayout.insertView(new PT.Views.Base() );
      Zeega.baseLayout.setView('#nav-upper', new PT.Views.UpperNavView() );
      // Render the layout into the DOM.
      Zeega.baseLayout.render();
      Zeega.isInitialized = true
    }
  }

  


  return Router;

});