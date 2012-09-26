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

	App.Model = Backbone.Model.extend({

		url : function()
		{
			var projects = [1666,1665,1664,1663];
			return localStorage.api + '/projects/'+ projects[Math.floor(Math.random() * projects.length)];
			//return localStorage.api + '/projects/1775';
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
		},

		initialize : function()
		{
			var _this = this;
			this.fetch().success(function(res){
				_this.loadPlayer();
				_this.trigger('ready');
			});
		},

		loadPlayer : function()
		{
			//I'm trusting that I'm getting valid data back
			// the settings are a part of the data! this means the player attributes can be controlled by the data!
			Zeega.player = new Zeega.Player( this.toJSON() );
			Zeega.player.play();
		}

	});

	App.CollectionZeegaPlayerModel = Backbone.Model.extend({

		url : function()
		{
			return localStorage.api + '/items/'+ this.collection_id +'/project';
		},

		defaults : {
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

	});

	// Required, return the module for AMD compliance
	return App;
});
