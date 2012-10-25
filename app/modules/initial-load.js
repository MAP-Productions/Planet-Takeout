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
			var _this=this;
			this.elem = {
				progressBar : this.$('#progressBar'),
				slides : this.$('#loaderSlides div')
			};

			this.numSlides = this.elem.slides.length;
			this.currentSlide = 1;

			var animLength = 1000; // how long to spend animating the cat and going through the info slides
			function setCookie(c_name,value,exdays){
				var exdate=new Date();
				exdate.setDate(exdate.getDate() + exdays);
				var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
				document.cookie=c_name + "=" + c_value;
			}

			this.elem.progressBar.animate({
				height: '100%'
			},
			{
				duration: animLength,
				step: this.onAnimStep,
				easing:'linear',
				complete:function(){
					console.log('finished anim');
					_this.remove();
					setCookie('PLANET_TAKEOUT',1,365);
					Zeega.tempCookie=true;
					if(Zeega.player) Zeega.player.play();

				}
			}, animLength);
		},
		onAnimStep: function(now, fx) {

			var position =  Math.ceil(now/100 * this.numSlides);
			if (position > this.currentSlide) {
				this.currentSlide = position;

				this.elem.slides.eq(position - 1).fadeIn(500).siblings('div').fadeOut(500);
			}
		}
	});

	// Required, return the module for AMD compliance
	return InitialLoad;
});