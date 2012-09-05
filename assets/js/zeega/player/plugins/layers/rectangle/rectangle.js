/************************************

	Rectangle LAYER CHILD CLASS
	
	
	TODO:
		
		Features: 
			-fullscreen bleed?

************************************/

define(['layerModel', 'layerView'], function(){

(function(Layer){

	Layer.Rectangle = Layer.Model.extend({

		layerType : 'Rectangle',
		displayCitation : false,
		linkable : true,
		
		defaultAttributes : {
			'title' : 'Color Layer',
			'url' : null,
			'backgroundColor': '#ff00ff',
			'left' : 0,
			'top' : 0,
			'height' : 100,
			'width' : 100,
			'opacity':.75,
			
			linkable : true
		}	
		
	});
	
	Layer.Views.Controls.Rectangle = Layer.Views.Controls.extend({
		
		render : function()
		{
			var dissolveCheck = new Layer.Views.Lib.Checkbox({
				property : 'dissolve',
				model: this.model,
				label : 'Fade In'
			});
			
			var color = new Layer.Views.Lib.ColorPicker({
				property : 'backgroundColor',
				color : this.attr.backgroundColor,
				model: this.model,
				label : 'Color'
			});
			
			var widthSlider = new Layer.Views.Lib.Slider({
				property : 'width',
				model: this.model,
				label : 'Width',
				suffix : '%',
				min : 1,
				max : 200,
			});
			
			var heightSlider = new Layer.Views.Lib.Slider({
				property : 'height',
				model: this.model,
				label : 'Height',
				suffix : '%',
				min : 1,
				max : 200,
			});
			
			var opacitySlider = new Layer.Views.Lib.Slider({
				property : 'opacity',
				model: this.model,
				label : 'Opacity',
				step : 0.01,
				min : 0,
				max : 1,
			});
			
			this.controls
				.append( dissolveCheck.getControl() )
				.append( color.getControl() )
				.append( opacitySlider.getControl() )
				.append( widthSlider.getControl() )
				.append( heightSlider.getControl() );
			
			return this;
		
		}
		
	});

	Layer.Views.Visual.Rectangle = Layer.Views.Visual.extend({
		
		render : function()
		{
			var style = {
				'backgroundColor' : this.model.get('attr').backgroundColor,
				'height' : this.model.get('attr').height +'%'
			}

			$(this.el).css( style );
			
			this.model.trigger('ready',this.model.id)
			
			return this;
		}
		
		
	});
	
})(zeega.module("layer"));

})