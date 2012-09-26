define([
	"zeega",
	// Libs
	"backbone",

	//libraries
	'libs/modernizr',
	'libs/leaflet',
	// Plugins
	'zeega_player'
],

function(Zeega, Backbone)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};

	App.Views._Page = Backbone.LayoutView.extend({});

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

	App.Views.TabbedModal = App.Views._Page.extend({
		
		events: {
			'click ul.modal-tabs-head li': 'switchTab'
		},
		
		switchTab: function(e){
			var clicked = $(e.target);
			clicked
				.addClass('active')
				.siblings().removeClass('active');

			this.$('.modal-tab')
				.eq(clicked.index()).show()
				.siblings('.modal-tab').hide();
		}
	});

	// Required, return the module for AMD compliance
	return App;
});
