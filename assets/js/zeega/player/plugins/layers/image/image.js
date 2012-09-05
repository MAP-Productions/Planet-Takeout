define([
  "zeega",
  "backbone",
  //'zeega_base/player/layer',
],

function(zeega, Backbone){


	var Plugin = zeega.module();
	Plugin.Layer = Plugin.Layer || {};
	
	//Layer.Views = Layer.Views || {};

	//Layer.Views.Controls = Backbone.View.extend({});

	Plugin.Layer.Image = Backbone.Model.extend({
			
		layerType : 'Image',

		defaultAttributes : {
			'title' : 'Image Layer',
			'url' : 'none',
			'left' : 0,
			'top' : 0,
			'height' : 100,
			'width' : 100,
			'opacity':1,
			'aspect':1.33,
			'citation':true,
			
			'linkable' : true
		},

		controls : [
			
			{
				type : 'checkbox',
				property : 'dissolve',
				model : this, // do I need this?
				label : 'Fade In'
			},
			{
				type : 'slider',
				property : 'width',
				label : 'Scale',
				suffix : '%',
				min : 1,
				max : 200
			},
			{
				type : 'slider',
				property : 'opacity',
				label : 'Scale',
				step : 0.01,
				min : 0.05,
				max : 1
			}

		]

	});


	Plugin.Layer.Image.Controls = Backbone.View.extend({

		render : function()
		{
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});

			var scaleSlider = new Layer.Views.Lib.Slider({
				property : 'width',
				model: this.model,
				label : 'Scale',
				suffix : '%',
				min : 1,
				max : 200,
			});
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : .05,
				max : 1,
			});
			
			$(this.controls)
				.append( dissolveCheck.getControl() )
				.append( scaleSlider.getControl() )
				.append( opacitySlider.getControl() );
			
			return this;
		}
		
	});

	Plugin.Layer.Image.Visual = Backbone.View.extend({
		
		draggable : true,
		className : 'visual-element',

		template : '<img src="<%= attr.uri %>" width="100%"/>',

		manage : false,

		render : function()
		{
			this.$el.html( _.template(this.template, this.model.toJSON()) );
			return this;
		},
		
		onPreload : function()
		{
			console.log('##		image on preload')
			var _this = this;

			var img = this.$el.imagesLoaded();
			img.done(function(){
				_this.model.trigger('ready',_this.model.id);
			});
			img.fail(function(){
				_this.model.trigger('error',_this.model.id);
			});

		}
	});

	return Plugin;

})
