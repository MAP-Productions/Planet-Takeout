define([
  //"zeega",
  "backbone",
],

function(Backbone){

	_Layer = Backbone.Model.extend({
		
		layerType : null,

		controls : [],

		defaults : {},

		initialize : function()
		{
			this.init();
		},

		init : function(){},

	});

	_Layer.Visual = Backbone.View.extend({
		
		className : 'visual-element',
		draggable : true,
		template : '',
		manage : false,

		render : function(){},

		player_onPreload : function() { _this.model.trigger('ready',_this.model.id) },
		player_onPlay : function(){},
		player_onPause : function(){},
		player_onPlayPause : function(){},
		player_onExit : function(){},
		player_onUnrender : function(){},

		editor_onLayerEnter : function(){},
		editor_onLayerExit : function(){},
		editor_onControlsOpen : function(){},
		editor_onControlsClosed : function(){},

		getAttr : function(key){ return this.model.get('attr')[key] }, // convenience method


	});

	return _Layer;

})
