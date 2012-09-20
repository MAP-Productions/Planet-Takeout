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


  App.Collections = {};


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


/**********************

        MODALS

***********************/

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

/**********************

        PAGES

***********************/

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


/**********************

        MAP

***********************/

  App.Views.Map = App.Views._Page.extend({
    template: 'map',
    id: 'PT-map-wrapper',

    ptIconRed : L.icon({
      iconUrl : 'assets/img/map-marker-00.png',
      iconSize: [20,20],
      iconAnchor : [11,0]
    }),

    initialize : function()
    {
      // immediately fetch geotagged items for the map
      this.collection = new App.Collections.MapItems();
      this.collection.fetch();

    },

    afterRender : function()
    {
      console.log('after render map')
      this.renderMap();
      this.renderCollectionMarkers();

    },

    renderMap : function()
    {
      var start = new L.LatLng(42.36431523548288, -71.07180118560791 );
      this.map = L.map('PT-map',{
          attributionControl:false
      }).setView(start, 12);

      L.tileLayer('http://{s}.tiles.mapbox.com/v2/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
          maxZoom: 18,
      }).addTo( this.map );
    },

    renderCollectionMarkers : function()
    {
      var _this = this;
      var renderMarkers = function()
      {
        console.log('render makers', this)
        this.collection.each(function(item){
          item.marker = L.marker([ item.get('media_geo_latitude'), item.get('media_geo_longitude')], {icon: _this.ptIconRed} );
          item.marker.itemID = item.id;
          item.marker.addTo(_this.map);

          item.marker.on('click', function(e){ _this.onMarkerClick(e) } );
        })
      }

      //if collection hasn't finished fetching yet
      if( this.collection.length == 0 ) this.collection.on('reset', renderMarkers, this);
      else renderMarkers;
    },

    onMarkerClick : function(e)
    {
        console.log('clicked', e, e.target.getLatLng() )
        var item = this.collection.get(e.target.itemID);
        var content = new App.Views.MapPopup({model:item});
        this.popup = L.popup();
        this.popup.setLatLng([ e.target.getLatLng().lat, e.target.getLatLng().lng ])
          .setContent( content.render().el )
          .openOn(this.map);

        $(this.popup._wrapper).css({
          'background':'url('+ item.get('thumbnail_url') +')',
          'background-size' : '100% auto'
        })
        console.log(this.popup)


    }

  })

  App.Collections.MapItems = Backbone.Collection.extend({
    url: function()
    {
      return 'http://dev.zeega.org/planettakeout/web/api/search?r_items=1&tags=planettakeout&geo_located=1&user=760&limit=10&sort=date-desc'
    },

    parse : function(res){ return res.items }
  })

  App.Views.MapPopup = Backbone.View.extend({

    className : 'map-popup',

    render : function()
    {
      this.$el.html( _.template( this.template(), this.model.toJSON() ) );
      return this;
    },

    events : {
      'click .enter' : 'enterCollectionViewer'
    },

    enterCollectionViewer : function()
    {
      // for some reason, the relative url wasn't working correctly. navigate works though
      Zeega.router.navigate('/collections/'+ this.model.id +'/view', {'trigger':true});
      return false;
    },

    template : function()
    {
      var html = 

        '<a href="#" class="heart"><img src="assets/img/icon-heart-white-sm.png" width="30px"/></a>'+
        '<a href="/collections/<%= id %>/view" class="enter"><img src="assets/img/arrow-straight.png" width="40px"/></a>';        

      return html;
    }

  })


/**********************

        GRID VIEWS

***********************/

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


  App.Layouts.CitationDrawerLayout = Backbone.Layout.extend({
    template: "citation-drawer-layout",
    id: 'citation-drawer'

  })

  App.Views.CitationView = Backbone.LayoutView.extend({
    template : 'citation-static',
    className : 'citation-view',

    initialize : function()
    {
      console.log('this', this)
      if(this.model.get('attr').media_type == 'Video') this.template = 'citation-player'; //swaps out the template if it's a video
    },

    events : {
      'click .play-pause' : 'playPause'
    },

    playPause : function()
    {
      console.log('play pause', Zeega);

      if(this.$('.play-pause i').hasClass('PT-icon-pause')) this.$('.play-pause i').removeClass('PT-icon-pause').addClass('PT-icon-play');
      else this.$('.play-pause i').removeClass('PT-icon-play').addClass('PT-icon-pause');
      Zeega.player.playPause();

      return false;
    },

    serialize : function(){ return this.model.toJSON() }
  })




/************************

    Collections

*************************/

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
