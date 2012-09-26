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


	App.Views.About = App.Views.TabbedModal.extend({
		template: 'about',
		initialize: function()
		{
			this.events = _.extend({},this.events, App.Views.TabbedModal.prototype.events);
		}
	});

	// Required, return the module for AMD compliance
	return App;
});
