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

			function setCookie(c_name,value,exdays){
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value=escape(value) + ( (exdays === null) ? "" : "; expires=" + exdate.toUTCString() );
				document.cookie=c_name + "=" + c_value;
			}
			this.cycleSlides();
			this.elem.progressBar.animate({
				height: '100%'
			},
			{
				duration: this.animLength,
				easing: 'linear',
				complete:function(){
					console.log('finished anim');
					_this.remove();
					setCookie('PLANET_TAKEOUT',1,365);
					Zeega.tempCookie=true;
					if(Zeega.player) Zeega.player.play();

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
		}
	});

	// Required, return the module for AMD compliance
	return InitialLoad;
});