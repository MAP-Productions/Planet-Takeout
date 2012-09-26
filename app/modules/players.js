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
