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
		initialize : function() {
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
			this.animLength = 150; // how long to spend animating the cat and going through the info slides

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
			console.log('finished anim', this, Zeega);
			setCookie('PLANET_TAKEOUT',1,365);
			Zeega.tempCookie = true;

			if (Zeega.player) {
				this.featuredIntro = new FeaturedIntro.View();
				this.featuredIntro.takeoutName = Zeega.player.get('title');
				$('body').append(this.featuredIntro.el);
				this.featuredIntro.render();
				var fIntro = this.featuredIntro;
				_.delay(function(){
					fIntro.$('.featured-intro-overlay').fadeOut(2000, function(){
						fIntro.remove();
					});
				}, 4000);
				Zeega.player.play();
			}
			
			this.remove();
		}
	});

	var setCookie = function(c_name,value,exdays)
	{
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ( (exdays === null) ? "" : "; expires=" + exdate.toUTCString() );
		document.cookie=c_name + "=" + c_value;
	};

	// Required, return the module for AMD compliance
	return InitialLoad;
});