define([
	"zeega",
	// Libs
	"backbone",
	'libs/modernizr',
	// Plugins
	'zeega_player',
	'libs/leaflet'
],

function(Zeega, Backbone) {

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};


	App.Views.Base = Backbone.View.extend({
		manage: true,
		template: "base"
	});

	// Required, return the module for AMD compliance
	return App;

});
