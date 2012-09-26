define([
	"zeega",
	// Libs
	"backbone",
	//submodules
	'modules/submodules/modals',

	//libraries
	'libs/modernizr',
	'libs/leaflet',
	// Plugins
	'zeega_player'
],

function(Zeega, Backbone, Modal)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};


	// Required, return the module for AMD compliance
	return App;
});
