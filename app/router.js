define([
  // Application.
  "zeega",

  // Modules.
  'modules/planet-takeout', // this needs to be cusomized
],

// generic App used
function(Zeega, App) {

  // Defining the application router, you can attach sub routers here.
  /*

  the router is where your application/navigation logic goes

  */
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
      Zeega.player = new App.Model();  
      console.log(Zeega.player)    
    },

    about : function()
    {
      console.log('go to about')
      renderBaseLayout();
      clearModals()
      renderPage('About');
    },

    grid : function()
    {
      console.log('go to grid')
      clearModals()
      renderBaseLayout();
      renderGrid();
    },

    map : function()
    {
       console.log('go to map')
     renderBaseLayout();

    },

    participate : function()
    {
      console.log('go to participate')
      clearModals()
      renderBaseLayout();
      renderPage('Participate');
     },

    menu : function()
    {
      console.log('go to menu')
      clearModals();
      renderBaseLayout();
      renderMenu();

    },

    search : function()
    {
      console.log('go to search')
      renderBaseLayout();

    },

  });

  function renderPage(pageName)
  {
    Zeega.page = new App.Layouts.Modal({title:pageName});
    var pageView = new App.Views[pageName]();
    Zeega.page.setView('.PT-modal-content', pageView );
    Zeega.page.render();
    $('body').append(Zeega.page.el);
  }

  function renderMenu()
  {
    Zeega.page = new App.Layouts.ModalWide({title:'Menu'});
    var pageView = new App.Views.Menu();
    Zeega.page.setView('.PT-modal-content', pageView );
    Zeega.page.render();
    $('body').append(Zeega.page.el);
  }

  function renderGrid()
  {
    //removePlayer();
    // make and render itemCollection
    var itemCollectionsCollection = new App.Collections.ItemCollections();
    itemCollectionsCollection.fetch().success(function(res){
      console.log('$$   items coll', res, itemCollectionsCollection)
      Zeega.grid = new App.Layouts.GridView({collection:itemCollectionsCollection});
      Zeega.grid.render();
      $('#app-base').append( Zeega.grid.el );

    })
  }

  function renderMap()
  {
    
  }

  function clearModals()
  {
    if(Zeega.page) Zeega.page.remove();
  }

  function removePlayer()
  {
    if( Zeega.player ) Zeega.player.exit();
  }

  // this is a utility and should be elsewhere
  function renderBaseLayout()
  {
    if( !Zeega.isInitialized )
    {

      Zeega.baseLayout = new Backbone.Layout({
        el: "#main"
      });
      // Insert the tutorial into the layout.
      Zeega.baseLayout.insertView(new App.Views.Base() );
      Zeega.baseLayout.setView('#nav-upper', new App.Views.UpperNavView() );
      // Render the layout into the DOM.
      Zeega.baseLayout.render();
      Zeega.isInitialized = true
    }
  }

  


  return Router;

});