define([
	"zeega",
	// Libs
	"backbone"
],

function(Zeega, Backbone)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};


	App.Views.UpperNavView = Backbone.View.extend({
		manage : true,
		template : 'upper-nav',

		tagName : 'ul'
	});

	App.Views.NavControls = Backbone.LayoutView.extend({
		template : 'player-navigation',
		className : '',

		serialize : function()
		{
			return this.options;
		},

		events : {
			'click #PT-preview-left' : 'goLeft',
			'click #PT-preview-right' : 'goRight'
		},
		goLeft : function()
		{
			Zeega.player.prev();
			return false;
		},
		goRight : function()
		{
			Zeega.player.next();
			return false;
		}

	});


	// Required, return the module for AMD compliance
	return App;
});
