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

	App.Layouts.Modal = Backbone.Layout.extend({
		template: "modal",

		className : 'PT-modal-overlay',

		defaults : {
			title : 'default'
		},

		events : {
			'click .close' : 'closeModal'
		},

		closeModal : function()
		{
			window.history.back();
			return false;
		},

		initialize : function(opts)
		{
			this.settings = _.defaults(opts,this.defaults);
		},

		serialize : function(){ return this.settings; }

	});

	App.Layouts.ModalWide = Backbone.Layout.extend({
		template: "modal-wide",

		className : 'PT-modal-overlay',

		defaults : {
			title : 'default'
		},

		events : {
			'click .close' : 'closeModal'
		},

		closeModal : function()
		{
			window.history.back();
			return false;
		},

		initialize : function(opts)
		{
			this.settings = _.defaults(opts,this.defaults);
		},

		serialize : function(){ return this.settings; }

	});

	// Required, return the module for AMD compliance
	return App;
});
