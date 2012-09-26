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
	var Index = Zeega.module();

	Index.Views.Base = Backbone.View.extend({
		manage: true,
		template: "base"
	});

	return Index;

});
