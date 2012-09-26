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


	App.Views.About = Modal.Views.TabbedModal.extend({
		template: 'about',
		initialize: function()
		{
			this.events = _.extend({},this.events, App.Views.TabbedModal.prototype.events);
		}
	});

	// Required, return the module for AMD compliance
	return App;
});
