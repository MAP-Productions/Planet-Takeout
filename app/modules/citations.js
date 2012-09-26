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
	var App = Zeega.module();



	/*************

	regular CITATION

	***************/

	App.Views.CitationView = Backbone.LayoutView.extend({
		template : 'citation-static',
		className : 'citation-view',

		initialize : function()
		{
			if(this.model.get('attr').media_type == 'Video') this.template = 'citation-player'; //swaps out the template if it's a video
		},

		events : {
			'click .play-pause' : 'playPause'
		},

		playPause : function()
		{
			console.log('play pause', Zeega);

			if(this.$('.play-pause i').hasClass('PT-icon-pause')) this.$('.play-pause i').removeClass('PT-icon-pause').addClass('PT-icon-play');
			else this.$('.play-pause i').removeClass('PT-icon-play').addClass('PT-icon-pause');
			Zeega.player.playPause();

			return false;
		},

		serialize : function(){ return _.extend({},this.model.toJSON(),this.options.player); }
	});


	// Required, return the module for AMD compliance
	return App;
});
