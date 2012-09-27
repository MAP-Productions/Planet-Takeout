define([
	"zeega",
	// Libs
	"backbone",
	// Plugins
	'zeega_player'
],

function(Zeega, Backbone) {

	// Create a new module
	var Index = Zeega.module();

	Index.Model = Backbone.Model.extend({

		initialize : function()
		{
			var _this = this;
			this.project = new Project();
			this.project.fetch().success(function(){
				// I should not have to put this in Zeega.player!
				// want this in _this.player !!
				Zeega.player = new Zeega.Player( _this.project.toJSON() );
				_this.player = Zeega.player; // I want to remove this
				_this.player.on('ready', _this.renderCitation, _this);
				_this.player.init();
			});
		},

		renderCitation : function()
		{
			this.citationDrawer = new featuredCitationLayout({ model: this.project });
			Zeega.citation = this.citationDrawer; // I don't like this

			this.citationDrawer.render();
			$('#nav-lower').html( this.citationDrawer.el );

		}

	});

	var featuredCitationLayout = Backbone.Layout.extend({
		template: "citation-featured",
		id: 'citation-drawer',

		serialize : function(){ return this.model.toJSON(); },

		afterRender : function()
		{
			var _this = this;
			this.collection = new featuredItemCollection();
			this.collection.id = this.model.get('description');
			this.collection.fetch().success(function(){

				_this.collection.each(function(item, i){
					if( i > 20 ) return false;
					item.set('collection_id', _this.collection.id);
					var iv = new featuredItemView({
						model:item,
						attributes: {
							'style': item.get('thumbnail_url') ? 'background:url('+ item.get('thumbnail_url') +');background-size:100% 100%' : ''
						}
					});
					iv.render();
					_this.$('#featured-items-drawer').append( iv.el );
				});
			});
		}

	});


	var featuredItemCollection = Backbone.Collection.extend({
		url : function()
		{
			return localStorage.api + '/items/'+ this.id +'/items';
		},
		parse : function(res){ return res.items; }
	});

	var featuredItemView = Backbone.LayoutView.extend({
		template : 'item-featured',
		tagName : 'li',

		className : 'item-view',

		serialize : function(){ return this.model.toJSON(); }

	});

	var Project = Backbone.Model.extend({

		url : function()
		{
			var projects = [1666,1665,1664,1663];
			return localStorage.api + '/projects/'+ projects[Math.floor(Math.random() * projects.length)];
		},

		defaults : {
			mode :'standalone',

			navbar_top : false,
			navbar_bottom : false,
			layerCitations : false,
			playerCitation : false,

			chromeless : true,
			branding : false,
			social : false,
			fullscreenEnabled : false,
			fadeOutOverlays : false
		}

	});

	return Index;

});
