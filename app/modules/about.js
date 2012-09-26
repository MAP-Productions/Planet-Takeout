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
	var About = Zeega.module();
	
	About.Model = Modal.Model.extend({

		defaults : {
			title : 'About',
			modalTemplate : 'modal'
		},

		initialize : function()
		{
			this.layout = this.getLayout();
			this.layout.setView('.PT-modal-content', new aboutView() );
			this.layout.render();
			$('body').append( this.layout.el );
		}
	});

	var aboutView = Modal.Views.TabbedModal.extend({

		template: 'about',

		initialize: function()
		{
			this.events = _.extend({},this.events, Modal.Views.TabbedModal.prototype.events);
		}
	});

	// Required, return the module for AMD compliance
	return About;
});
