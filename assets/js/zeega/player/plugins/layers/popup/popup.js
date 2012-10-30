define([
  "zeega",
  "backbone",
  'zeega_layers/_layer/_layer',
  'zeega_media_players/plyr'
],

function(zeega, Backbone, _Layer, Player){

	var Layer = zeega.module();

	Layer.Popup = _Layer.extend({
			
		layerType : 'Popup',

		hasControls : true,
		defaultControls : false,
		displayCitation : false,

		defaultAttributes : {
			'title' : 'Popup Layer',
			'url' : 'none',
			'left' : 0,
			'top' : 0,
			'height' : 25,
			'width' : 25,
			'opacity':1,
			'citation':false,
			'linkable' : false
		}

	});
	
	Layer.Popup.Visual = _Layer.Visual.extend({
		
		draggable : true,
		
		template : '<a href="#"><span class="popup-target"></span><span class="popup-target-title"></span></a>',

		init : function()
		{
			//this.model.on('all', function(e){console.log('e',e)})
			this.model.on('update', this.onUpdate, this);
		},

		render : function()
		{
			this.$el.html( _.template(this.template, this.model.toJSON() ) )
				.css({
					'overflow': 'visible',
					'border' : 'none',
					'height' : this.model.get('attr').height +'%',
					'border-radius' : '0'
				}).addClass('zeega-popup-layer');

			if( this.model.get('attr').popup_target )
			{
				this.$('.popup-target').html('<img src="'+ this.model.get('attr').popup_target.uri  +'" height="100%" width="100%"/>');
				if( _.isUndefined(this.model.get('attr').popup_content))this.$('.popup-target-title').html( '<h3>Surprise!</h3>');
				else this.$('.popup-target-title').html( '<h3>'+ this.model.get('attr').popup_content.title +'</h3>');
			}
			else
			{
				
				this.$el.css({
					'width' : this.model.get('attr').width +'%',
					//'border' : '2px dashed orangered',
					'border-radius' : '6px',
					'height' : '25%'
				})

			}
			return this;
		},

		onUpdate : function()
		{
			this.$el.resizable('destroy');
			this.render();
			this.makeResizable();
		},

		makeResizable : function()
		{
			var _this = this;
			this.$el.resizable({
				handles: 'all',
				stop : function()
				{
					var attr = {
						'width' : $(this).width() / $(this).parent().width() * 100,
						'height' : $(this).height() / $(this).parent().height() * 100
					};
					console.log('save attr', attr);
					_this.model.update(attr);
				}
			});
		},

		events : {
			'click' : 'onClick'
			//'mouseover' : 'onMouseover',
			//'mouseout' : 'onMouseout'
		},

		onClick : function()
		{
			console.log('popup clicked');
			//launch overlay
			
			this.popup = new Layer.Popup.Visual.Modal({model:this.model});

			zeega.player.playPause();

			return false;
		},

		onMouseover : function()
		{
			console.log('popup over', this);
			var popup = "<div class='popup-popup";
			this.$el.append();
		},

		onMouseout : function()
		{
			console.log('popup out', this);
		},

		onLayerEnter: function()
		{
			this.makeResizable();
		},

		onExit : function()
		{
			if(this.popup) this.popup.cleanup();
		},
		
		onPreload : function()
		{
			this.model.trigger('ready',this.model.id);
		}
	});


	Layer.Popup.Visual.Modal = Backbone.View.extend({
		className : 'popup-layer-modal',

		initialize : function()
		{

			var Model = Backbone.Model.extend();
			this.contentModel = new Model( this.model.get('attr').popup_content );
			this.contentModel.set('attr', this.model.get('attr').popup_content ); // redundant. this should be changed later


			console.log('popupview init', this)
			$('body').append(this.render().el)
			this.afterRender();
		},

		render : function()
		{
			console.log('render',this)
			var style = {
				//background: 'rgba(255,255,255,0.25)',
				width: '1000px',
				height: '500px',
				'z-index': 10000,
				position: 'relative',
				margin: '100px auto'
			};
			this.$el.html(this.template());
			console.log( this.template() );
			this.$('.popup-target').css(style);

			// image
			if(this.contentModel.get('media_type') == 'Image')
			{
				this.$('.popup-target').html('<img src="'+ this.contentModel.get('uri') +'" height="100%" style=""/>');
			}
			// video
			else if(this.contentModel.get('media_type') == 'Video')
			{
				console.log('player', Player)
				this.player = new Player.Player({
					model: this.contentModel,
					control_mode : 'none',
					media_target : '.popup-target',
					autoplay : true
				});
				//this.player.model.on('ready', function(){_this.player.play()})
				//this.$('.popup-target').html('<img src="'+ this.contentModel.get('uri') +'"/>');
			}



			return this;
		},

		afterRender : function()
		{
			if(this.contentModel.get('media_type') == 'Video')
			{
				var _this = this;
				this.$('.popup-target').html( this.player.render().el );
				this.player.placePlayer();
				this.player.popcorn.play();

				//_.delay( this.player.playPause, 2000 );
			}
			this.$('.popup-target').append('<h2 style="z-index:10000;color:white;cursor:pointer;position:absolute;top:0px;right:5px;" >Close</h2>');
		},

		cleanup : function()
		{
			zeega.player.playPause();

			if(this.player)
			{
				this.player.pause();
				this.player.destroy();
			}
			this.remove();
		},

		events : {
			'click' : 'onClick'
		},

		onClick : function()
		{
			this.cleanup();
			this.remove();
			return false
		},

		template : function()
		{
			html = '<div class="popup-target" style="overflow:visible;text-align:center"></div>';
			return html;

		}
	})

	return Layer;

})