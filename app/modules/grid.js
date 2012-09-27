define([
	"zeega",
	// Libs
	"backbone",
	//submodules
	'modules/submodules/modals'
],

function(Zeega, Backbone, Modal)
{
	var App = Zeega.module();


	App.Layouts.GridView = Backbone.Layout.extend({
		template: "collection-grid-layout",

		initialize : function()
		{
			this.template = this.options.type == 'items' ? 'item-grid-layout' : 'collection-grid-layout';
			if(Zeega.grid) Zeega.grid.remove();
			this.collection.on('reset',this.onReset, this);
		},

		serialize : function()
		{
			if(this.collection.collectionInfo) return this.collection.collectionInfo.items[0];
		},

		onReset : function()
		{
			var _this = this;
			var itemArray = _.reject( _.toArray(this.collection), function(item){ return item.get('rendered'); });
			_.each( itemArray, function(item){
				var itemView = _this.getView(item);
				_this.insertView('ul.list', itemView );
				itemView.render();
			});
		},

		beforeRender : function()
		{
			var _this = this;
			this.collection.each(function(item){
				item.set('rendered', true);
				_this.insertView( 'ul.list', _this.getView(item) );
			});
		},

		afterRender : function()
		{
			var _this = this;

			//this.getViews().each(function(view){ view.delegateEvents() });

			// infinite scroll
			this.$('#grid-view-slider').scroll(function()
			{
				if( _this.$('#grid-view-slider ul').height() <= -_this.$('#grid-view-slider ul').position().top + $('#grid-view-wrapper').height() )
				{
					if(_this.collection.length < _this.collection.itemsCount )
					{
						console.log('infinitely load!');
						_this.collection.page++;
						_this.collection.fetch({add:true}).success(function(){ _this.collection.trigger('reset');});
					}
				}
			});
		},

		getView : function( item )
		{
			var itemView;
			if( _.include(item.get('tags'), 'pt_animatefeature') )
			{
				var info = jQuery.parseJSON( item.get('description') );
				item.set({
					'thumbnail_url': info.gif,
					'featured_id' : info.projectID
				});
	
				itemView = new App.Views.AnimatedItemView({model:item,attributes:{
					'style': info.gif ? 'background:url(assets/img/gifs/'+ info.gif +');background-size:100% auto' : ''
				}});
			}
			else if( item.get('media_type') == 'Collection')
			{
				itemView = new App.Views.CollectionView({model:item,attributes:{
					'style': item.get('thumbnail_url') ? 'background:url('+ item.get('thumbnail_url') +');background-size:100% auto' : ''
				}});
			}
			else
			{
				itemView = new App.Views.ItemView({model:item,attributes:{
					'style': item.get('thumbnail_url') ? 'background:url('+ item.get('thumbnail_url') +');background-size:100% auto' : ''
				}});
			}
			return itemView;
		}

	});

	App.Views.ItemView = Backbone.LayoutView.extend({
		template : 'item',
		tagName : 'li',

		className : 'item-view',

		serialize : function(){ return this.model.toJSON(); }
	});

	App.Views.CollectionView = Backbone.LayoutView.extend({
		template : 'collection',
		tagName : 'li',
		className : 'collection-view',

		serialize : function(){ return this.model.toJSON(); }
	});

	App.Views.AnimatedItemView = Backbone.LayoutView.extend({
		template : 'featured-animated',
		tagName : 'li',
		className : 'collection-view',

		serialize : function(){ return this.model.toJSON(); }
	});

	App.Collections.Items = Backbone.Collection.extend({

		page : 1,

		url : function(){ return localStorage.api + '/items/'+ this.collectionID +'/items'; },

		parse : function( res )
		{
			this.data = res;
			return res.items;
		}
	});

	App.Collections.ItemCollections = Backbone.Collection.extend({

		page : 1,

		url : function(){ return localStorage.api + '/search?r_itemswithcollections&tags=pt_grid&page='+ this.page; },

		parse : function( res )
		{
			this.data = res;
			this.itemsCount = res.items_count;
//			return res.items;
			return _.shuffle(res.items);
		}
	});
	// Required, return the module for AMD compliance
	return App;
});
