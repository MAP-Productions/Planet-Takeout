define([
	"zeega",
	// Libs
	"backbone"
],

function(Zeega, Backbone) {
	var FeaturedIntro = Zeega.module();

	FeaturedIntro.View = Backbone.LayoutView.extend({
		template: 'featured-intro',
		takeoutName: 'Untitled',
		serialize : function(){ return this; }
	});

	// Required, return the module for AMD compliance
	return FeaturedIntro;
});
