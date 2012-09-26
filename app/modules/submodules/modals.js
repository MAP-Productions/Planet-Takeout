define([
	"zeega",
	// Libs
	"backbone",
	
	// Submodules
	"modules/submodules/loadingspinner",

	//libraries
	'libs/modernizr',
	'libs/leaflet',
	// Plugins
	'zeega_player',
	'libs/spin'
],

function(Zeega, Backbone, loadingSpinner)
{

	// Create a new module
	var Modal = Zeega.module();

	Modal.Model = Backbone.Model.extend({

		defaults : {
			title : 'Planet Takeout!',
			modalTemplate : 'modal'
		},

		getLayout : function()
		{
			var layout = new modalLayout({ model: this });
			layout.template = this.get('modalTemplate');
			return layout;
		},

		remove : function()
		{
			this.layout.remove();
		}
	});

	var modalLayout = Backbone.Layout.extend({

		className : 'PT-modal-overlay',

		events : {
			'click .close' : 'closeModal'
		},

		initialize: function() {
			loadingSpinner.show();
		},

		afterRender: function() {
			loadingSpinner.hide();
		},

		closeModal : function()
		{
			window.history.back();
			return false;
		},

		serialize : function(){ return this.model.toJSON(); }

	});

	Modal.Views.TabbedModal = Backbone.LayoutView.extend({
		
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
	return Modal;
});
