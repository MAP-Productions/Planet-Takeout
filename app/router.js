define([
  // Application.
  "zeega",
  // Modules.
  'modules/planet-takeout' // this needs to be cusomized
],

// generic App used
function(Zeega, App) {

  // Defining the application router, you can attach sub routers here.
  /*

  the router is where your application/navigation logic goes

  */
  console.log('before router', this, Zeega, App);
  var Router = Backbone.Router.extend({
    routes: {

      "" : "index",
      "about" : 'about',

      "collections" : 'collections',
      'collections/' : 'collections',
      'collections/:collection_id' : 'viewCollectionGrid',
      'collections/:collection_id/' : 'viewCollectionGrid',
      'collections/:collection_id/view' : 'viewCollectionPlayer',
      'collections/:collection_id/view/' : 'viewCollectionPlayer',
      'collections/:collection_id/view/:item_id' : 'viewCollectionPlayer',
      
      'map' : 'map',
      'participate' : 'participate',
      'menu' : 'menu',
      'search' : 'search'
    },

    index: function()
    {
      initialize();
      var player = new App.Model();  
      console.log(Zeega.player);
    },

    about : function()
    {
      console.log('go to about');
      initialize();
      clearModals();
      renderPage('About');
    },

    collections : function()
    {
      console.log('go to grid');
      initialize();
      clearModals();
      renderCollections();
    },

    viewCollectionGrid : function( collectionID )
    {
      console.log('rr     view collection grid', collectionID);
      initialize();
      goToItemCollection( collectionID );
    },

    viewCollectionPlayer : function( collectionID, itemID )
    {
      initialize();

      itemID = itemID || 'first';
      console.log('rr     view collection player', collectionID, itemID, Zeega.grid );

      if(Zeega.grid) Zeega.grid.remove();
      
      var player = new App.CollectionZeegaPlayerModel();  
      player.collection_id = collectionID;
      //Zeega.player = player;
      console.log('mm     zeega player', player);
      player.fetch().success(function(res){
        console.log('mm     model fetched', res, itemID);

        renderCitations();
        Zeega.player = new Zeega.Player( player.toJSON() );
        Zeega.player.on('all', onPlayerEvent, this);
        Zeega.player.play();
      });

    },

    map : function()
    {
      initialize();
      renderMap();
    },

    participate : function()
    {
      console.log('go to participate');
      initialize();
      clearModals();
      renderPage('Participate');
     },

    menu : function()
    {
      console.log('go to menu');
      initialize();
      clearModals();
      renderMenu();

    },

    search : function()
    {
      console.log('go to search');
      initialize();
      renderBaseLayout();

    }
  });

  /*

  tasks to take care of before the application can load
  esp inserting the layout into the dom!

  */
  var initialize = _.once( init );
  function init()
  {
    renderBaseLayout();
    Zeega.isInitialized = true;
  }

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

  function generateGrid( collection, type )
  {
      Zeega.grid = new App.Layouts.GridView({collection:collection, type:type});
      Zeega.grid.render();
      $('#app-base').append( Zeega.grid.el );
  }

  function goToItemCollection( collectionID )
  {
    console.log('rr     go to item Collection');

    var items = new App.Collections.Items();
    items.collectionID = collectionID;
    items.fetch().success(function(res){
      console.log('$$   items coll', res, items);
      items.each(function(item){ item.set('collection_id',collectionID);});
      generateGrid( items, 'items' );
    });
  }

  function renderCollections()
  {
    removePlayer();
    // make and render itemCollection
    var itemCollectionsCollection = new App.Collections.ItemCollections();
    itemCollectionsCollection.fetch().success(function(res){
      console.log('$$   items coll', res, itemCollectionsCollection);
      generateGrid( itemCollectionsCollection, 'collections' );
      $('#app-base').append( Zeega.grid.el );
    });
  }

  function onPlayerEvent(e, opts)
  {
    /* lint error - replaced switch with if
    switch(e)
    {
      case 'frame_rendered':
        renderCitation(e,opts);
        break;
    }*/
    if (e == 'frame_rendered')
    {
        renderCitation(e,opts);
    }
  }

  function renderCitations()
  {
    var citationDrawer = new App.Layouts.CitationDrawerLayout();
    Zeega.citation = citationDrawer;
    //Zeega.citation.insertView( new App.Views.CitationView() );
    Zeega.citation.render();
    $('#nav-lower').html(Zeega.citation.el);
  }

  function renderCitation(e,model)
  {
    Zeega.citation.getViews().each(function(view){ view.remove(); });
    Zeega.citation.insertView( new App.Views.CitationView({model:model}));
    Zeega.citation.render();    
  }

  function renderMap()
  {
    console.log('render map');
    Zeega.page = new App.Layouts.ModalWide({title:'Delicious World'});
    var pageView = new App.Views.Map();
    Zeega.page.setView('.PT-modal-content', pageView );
    Zeega.page.render();
    $('body').append(Zeega.page.el);
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

    Zeega.baseLayout = new Backbone.Layout({
      el: "#main"
    });
    // Insert the tutorial into the layout.
    Zeega.baseLayout.insertView(new App.Views.Base() );
    Zeega.baseLayout.setView('#nav-upper', new App.Views.UpperNavView() );
    // Render the layout into the DOM.
    Zeega.baseLayout.render();
  }


  return Router;

});