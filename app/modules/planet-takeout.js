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
      Zeega.router.navigate('/',{trigger:true})
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


  ////  grid views

  App.Layouts.GridView = Backbone.Layout.extend({
    template: "grid-view",

    initialize : function()
    {
      //this.collection.on('all',function(e){console.log('event:',e)}, this);
      this.collection.on('reset',this.onReset, this);
      this.collection.on('go_to_collection', this.goToCollection, this);
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

    goToCollection : function( collection )
    {
      var _this = this;
      // empty the this.collection
      this.getViews().each(function(view){ view.remove() });      
      var items = new App.Collections.Items();
      items.collectionID = collection.id;
      items.fetch().success(function(res){
        console.log('$$   items coll', res, items)
        _this.collection = items;
        _this.onReset();
      })

      //this.render();
    },

    beforeRender : function()
    {
      console.log('before render', this)
      var _this = this;
      this.collection.each(function(item){
        item.set('rendered', true);
        _this.insertView( 'ul.list', _this.getView(item) )
      })
    },
    afterRender : function()
    {
      var _this = this;
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

    events : {
      'click a' : 'goToItem'
    },

    goToItem : function()
    {
      console.log('goto item', this, 'launch player here')

      // launch zeega player with parent collection. start at this item

      return false;
    }
  })

  App.Views.CollectionView = Backbone.LayoutView.extend({
    template : 'item',
    tagName : 'li',
    className : 'collection-view',

    serialize : function(){ return this.model.toJSON() },

    events : {
      'click a' : 'goToCollection'
    },

    goToCollection : function()
    {
      //console.log('go to collection ::',this.model)
      this.model.trigger('go_to_collection', this.model)
      return false;
    }
  })


/************************

    Collections

*************************/


  App.Collections = {};

  App.Collections.Items = Backbone.Collection.extend({

    page : 1,

    url : function(){ return 'http://alpha.zeega.org/api/items/'+ this.collectionID },

    parse : function( res )
    {
      return res.items[0].child_items;
    }
  })

  App.Collections.ItemCollections = Backbone.Collection.extend({

    page : 1,

    url : function(){ return 'http://alpha.zeega.org/api/search?r_collections=1&page='+ this.page },

    parse : function( res )
    {
      this.itemsCount = res.collections_count;
      return res.collections;
    }
  })



  // Required, return the module for AMD compliance
  return App;

});
