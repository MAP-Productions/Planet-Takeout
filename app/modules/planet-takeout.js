define([
  "zeega",
  // Libs
  "backbone",
  // Plugins
  'zeega_player',
  'assets/vendor/leaflet/dist/leaflet.js'
],

function(Zeega, Backbone) {

  // Create a new module
  var App = Zeega.module();


  App.Model = Backbone.Model.extend({

    url : 'http://dev.zeega.org/joseph/web/api/projects/1316',

    defaults : {
      //appName : 'wayfinder',
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
      this.fetch().success(function(res){ _this.loadPlayer(), console.log(res) });
    },

    loadPlayer : function()
    {
      //I'm trusting that I'm getting valid data back
      // the settings are a part of the data! this means the player attributes can be controlled by the data!
      Zeega.player = new Zeega.Player( this.toJSON() );
      Zeega.player.play();
    }

  })

  App.CollectionZeegaPlayerModel = Backbone.Model.extend({

    url : function(){ return 'http://dev.zeega.org/planettakeout/web/api/items/'+ this.collection_id +'/project' },

    defaults : {
      //appName : 'wayfinder',
      mode :'standalone',

      chromeless : true,

      navbar_top : false,
      navbar_bottom : false,
      layerCitations : false,
      playerCitation : false,
      
      branding : false,
      social : false,
      fullscreenEnabled : false,
      fadeOutOverlays : false,

      user_id : -1
    }

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


  App.Layouts.Modal = Backbone.Layout.extend({
    template: "modal",

    className : 'PT-modal-overlay',

    defaults : {
      title : 'default'
    },

    events : {
      'click .close' : 'closeModal'
    },

    closeModal : function()
    {
      console.log('close modal');
      this.remove();
      //Zeega.router.navigate('/',{trigger:true})
    },

    initialize : function(opts)
    {
      this.settings = _.defaults(opts,this.defaults)
    },

    serialize : function(){ return this.settings }

  });

  App.Layouts.ModalWide = Backbone.Layout.extend({
    template: "modal-wide",

    className : 'PT-modal-overlay',

    defaults : {
      title : 'default'
    },

    events : {
      'click .close' : 'closeModal'
    },

    closeModal : function()
    {
      console.log('close modal');
      this.remove();
      Zeega.router.navigate('/',{trigger:true})
    },

    initialize : function(opts)
    {
      this.settings = _.defaults(opts,this.defaults)
    },

    serialize : function(){ return this.settings }

  });

  App.Views._Page = Backbone.LayoutView.extend({
  })

  App.Views.About = App.Views._Page.extend({
    template: 'about',
  })

  App.Views.Participate = App.Views._Page.extend({
    template: 'participate-0',
  })

  App.Views.Menu = App.Views._Page.extend({
    template: 'menu',
    className: 'PT-menu'
  })

  App.Views.Map = App.Views._Page.extend({
    template: 'map',
    id: 'PT-map-wrapper',
    afterRender : function()
    {
      console.log('after render map')
      var start = new L.LatLng(42.36431523548288, -71.07180118560791 );
      var map = L.map('PT-map',{
        //dragging:false,
          //zoomControl: false,
          scrollWheelZoom: false,
          attributionControl:false
      }).setView(start, 12);

      L.tileLayer('http://{s}.tiles.mapbox.com/v2/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
          attribution: '<a href="http://www.josephbergen.com" target="blank">Joseph Bergen</a>',
          maxZoom: 18,
      }).addTo( map );

    }
  })


  ////  grid views

  App.Layouts.GridView = Backbone.Layout.extend({
    template: "collection-grid-layout",

    initialize : function()
    {
      console.log(this.collection, this)
      this.template = this.options.type == 'items' ? 'item-grid-layout' : 'collection-grid-layout';
      if(Zeega.grid) Zeega.grid.remove();
      //this.collection.on('all',function(e){console.log('event:',e)}, this);
      this.collection.on('reset',this.onReset, this);
    },

    serialize : function()
    {
      if(this.collection.data.items) return this.collection.data.items[0];
    },

    onReset : function()
    {
      var _this = this;
      var itemArray = _.reject( _.toArray(this.collection), function(item){ return item.get('rendered') })
      _.each( itemArray, function(item){
        var itemView = _this.getView(item);
         _this.insertView('ul.list', itemView );
         itemView.render();
      })
    },

    beforeRender : function()
    {
      console.log('before render', this)
      var _this = this;
      this.collection.each(function(item){
        item.set('rendered', true);
        _this.insertView( 'ul.list', _this.getView(item) );

      })
    },
    afterRender : function()
    {
      var _this = this;

      //this.getViews().each(function(view){ view.delegateEvents() });

      // infinite scroll
      this.$('#grid-view-slider').scroll(function(){
        //console.log('scroll', _this.$('#grid-view-slider ul').height(), _this.$('#grid-view-slider ul').position().top, $('#grid-view-wrapper').height()  )

        if( _this.$('#grid-view-slider ul').height() <= -_this.$('#grid-view-slider ul').position().top + $('#grid-view-wrapper').height() )
        {
          if(_this.collection.length < _this.collection.itemsCount )
          {
            console.log('infinitely load!');
            _this.collection.page++;
            _this.collection.fetch({add:true}).success(function(){ _this.collection.trigger('reset')});
          }
        }
      })
    },

    getView : function( item )
    {
      if( item.get('media_type') == 'Collection')
        {
          var itemView = new App.Views.CollectionView({model:item,attributes:{
            'style':'background:url('+ item.get('thumbnail_url') +');background-size:100% 100%'
          }});
        }
        else
        {
          var itemView = new App.Views.ItemView({model:item,attributes:{
            'style':'background:url('+ item.get('thumbnail_url') +');background-size:100% 100%'
          }});
         }
         return itemView;
    }

  });

  App.Layouts.CitationDrawerLayout = Backbone.Layout.extend({
    template: "citation-drawer-layout",
    id: 'citation-drawer'

  })

  App.Views.ItemView = Backbone.LayoutView.extend({
    template : 'item',
    tagName : 'li',

    className : 'item-view',

    serialize : function(){ return this.model.toJSON() },

  })

  App.Views.CollectionView = Backbone.LayoutView.extend({
    template : 'collection',
    tagName : 'li',
    className : 'collection-view',

    serialize : function(){ return this.model.toJSON() }
  })

  App.Views.CitationView = Backbone.LayoutView.extend({
    template : 'citation',
    className : 'citation-view',

    serialize : function(){ console.log(this.model.layers.at(0).toJSON()); return this.model.layers.at(0).toJSON() }
  })  


/************************

    Collections

*************************/


  App.Collections = {};

  App.Collections.Items = Backbone.Collection.extend({

    page : 1,

    url : function(){ return 'http://dev.zeega.org/planettakeout/web/api/items/'+ this.collectionID },

    parse : function( res )
    {
      this.data = res;
      return res.items[0].child_items;
    }
  })

  App.Collections.ItemCollections = Backbone.Collection.extend({

    page : 1,

    url : function(){ return 'http://dev.zeega.org/planettakeout/web/api/search?r_collections=1&page='+ this.page },

    parse : function( res )
    {
      this.data = res;
      this.itemsCount = res.collections_count;
      return res.collections;
    }
  })



  // Required, return the module for AMD compliance
  return App;

});
