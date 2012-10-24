define([
	"zeega",
	// Libs
	"backbone"
],

function(Zeega, Backbone) {
	// Create a new module
	var InitialLoad = Zeega.module();

	InitialLoad.View = Backbone.LayoutView.extend({
		template : 'initial-load',
		initialize : function() {
			_.bindAll(this, 'afterRender', 'onAnimStep');
		},
		afterRender : function() {

			this.elem = {
				progressBar : this.$('#progressBar'),
				slides : this.$('#slides div')
			};

			this.numSlides = this.elem.slides.length;
			this.currentSlide = 1;

			var animLength = 6000; // how long to spend animating the cat and going through the info slides


			this.elem.progressBar.animate({
				height: '100%'
			},
			{
				duration: animLength,
				step: this.onAnimStep
			}, animLength);
		},
		onAnimStep: function(now, fx) {
			var position =  Math.ceil(now/100 * this.numSlides);
			if (position > this.currentSlide) {
				this.currentSlide = position;

				this.elem.slides.eq(position - 1).fadeIn(400).siblings().fadeOut(400);
			}
		}
	});

	// Required, return the module for AMD compliance
	return InitialLoad;
});