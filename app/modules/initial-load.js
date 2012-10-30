define([
	"zeega",
	// Libs
	"backbone",

	"modules/featured-intro"
],

function(Zeega, Backbone, FeaturedIntro) {
	// Create a new module
	var InitialLoad = Zeega.module();

	InitialLoad.View = Backbone.LayoutView.extend({
		template : 'initial-load',
		events: {
			'click #skip':'onProgressComplete'
		},
		initialize : function() {
			Zeega.initialLoader=true;
			_.bindAll(this, 'afterRender', 'cycleSlides');
		},
		afterRender : function() {
			var _this=this;
			this.elem = {
				progressBar : this.$('#progressBar'),
				slides : this.$('#loaderSlides div')
			};

			this.numSlides = this.elem.slides.length;
			this.currentSlide = 0;
			this.animLength = 15000; // how long to spend animating the cat and going through the info slides

			this.cycleSlides();
			this.elem.progressBar.animate({
				height: '100%'
			},
			{
				duration: this.animLength,
				easing: 'linear',
				complete : function()
				{
					_this.onProgressComplete();
				}
			});
		},
		cycleSlides : function() {
			if (this.currentSlide > 0) {
				this.elem.slides.eq(this.currentSlide).fadeIn(400).siblings().fadeOut(400);
			}
			if (this.currentSlide < (this.numSlides - 1) ) {
				this.currentSlide += 1;
				setTimeout(this.cycleSlides, (this.animLength / this.numSlides));
			}
		},

		onProgressComplete : function()
		{
			var _this = this;
			Zeega.initialLoader=false;
			if(!Zeega.featureLoading)$(window).trigger('project_loaded');
			this.$el.fadeOut('fast',function(){_this.remove();});
		}
	});


	// Required, return the module for AMD compliance
	return InitialLoad;
});