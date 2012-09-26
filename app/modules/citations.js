define([
	"zeega",
	// Libs
	"backbone",
	'libs/modernizr',
	// Plugins
	'zeega_player',
	'libs/leaflet'
],

function(Zeega, Backbone)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};



	App.Views.ItemFeaturedView = Backbone.LayoutView.extend({
		template : 'item-featured',
		tagName : 'li',

		className : 'item-view',

		serialize : function(){ return this.model.toJSON(); }

	});




	App.Layouts.CitationDrawerLayout = Backbone.Layout.extend({
		template: "citation-drawer-layout",
		id: 'citation-drawer'

	});

		/*************

		FEATURED CITATION

		***************/

	App.Views.FeaturedCitationView = Backbone.LayoutView.extend({
		template : 'citation-featured',
		className : 'featured-citation-view',

		afterRender : function()
		{
			var _this = this;
			var Collection = Backbone.Collection.extend({
				url : localStorage.api + '/search?r_itemswithcollections',
				parse : function(res){ return res.items }
			})
			this.collection = new Collection();
			this.collection.fetch().success(function(){

				_this.collection.each(function(item, i){

					if( i > 20 ) return false;
					var iv = new App.Views.ItemFeaturedView({model:item, attributes:{
						'style': item.get('thumbnail_url') ? 'background:url('+ item.get('thumbnail_url') +');background-size:100% 100%' : ''
					}});
					iv.render();
					_this.$('.featured-citation-bottom').append( iv.el );
				})
			})
		},

		serialize : function(){ console.log('%%   ser',_.extend({},this.model.toJSON())); return _.extend({},this.model.toJSON()); }
	});

	App.Views.FeaturedCitationItem = Backbone.LayoutView.extend({


	})


	/*************

	regular CITATION

	***************/

	App.Views.CitationView = Backbone.LayoutView.extend({
		template : 'citation-static',
		className : 'citation-view',

		initialize : function()
		{
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

		serialize : function(){ return _.extend({},this.model.toJSON(),this.options.player); }
	});

	App.Views.NavControls = Backbone.LayoutView.extend({
		template : 'player-navigation',
		className : '',

		serialize : function()
		{
			return this.options;
		},

		events : {
			'click #PT-preview-left' : 'goLeft',
			'click #PT-preview-right' : 'goRight'
		},
		goLeft : function()
		{
			Zeega.player.prev();
			return false;
		},
		goRight : function()
		{
			Zeega.player.next();
			return false;
		}

	});


	// Required, return the module for AMD compliance
	return App;
});
