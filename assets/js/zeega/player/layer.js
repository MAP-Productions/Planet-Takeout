define([
  "zeega",
  // Libs
  "backbone",

  // Modules
  // Plugins
  'zeega_base/player/plugins.layers'
],

function(zeega, Backbone, Layers){

	var Layer = zeega.module();

	Layer.Model = Backbone.Model.extend({
		
		status : 'waiting',

		showControls : true,
		player : false,
		displayCitation: true,
		visualLoaded : false,
		defaultControls : true,
		hasControls :true,
		
		editorWindow : $('#visual-editor-workspace'),
		layerPanel : $('#layers-list-visual'),
		
		layerColor : [ 'red','blue','yellow','green' ],
		
		defaults : {
			attr : {},
			linkable: true,
			thumbUpdate : true,
		},
		
		defaultAttributes : {},
		
		url : function()
		{
			if( this.isNew() ) return zeega.app.url_prefix + 'api/projects/'+ zeega.app.project.id +'/layers';
			else return zeega.app.url_prefix + "api/layers/" + this.id;
		},
		
		initialize: function(attributes,options)
		{
			this.layerTypeModel = new Layers[this.get('type')];
			
			this.on('ready', function(){ this.visualLoaded = true });
			this.on('refresh_view', this.refreshView, this);
			
			this.on('editor_layerRender', this.renderLayerInEditor, this );
			this.on('editor_destroyLayer editor_layerUnrender', this.unrenderLayerFromEditor, this);
			
			this.on('editor_controlsOpen', this.onControlsOpen, this);
			this.on('editor_controlsClosed', this.onControlsClosed, this);
			
			this.on('editor_destroyLayer', this.unrenderLayerFromEditor, this);
			
			
			if( options ) _.extend(this,options);
			
			this.generateNewViews();

		},
		
		generateNewViews : function()
		{
			if( !_.isNull( this.layerType ) )
			{
				//create visual view
				//this.visual = new Layer.Views.Visual[this.layerType]({model:this});
				
				this.visual = new Layer.Views.Visual({model:this});
				console.log('vv		visual:',this, this.visual )

				//create control view
				if( !this.player ) this.controls = new Layer.Views.Controls[this.layerType]({model:this})
			}
			else alert('MISSING LAYER TYPE')
		},
		
		//called at the end of initialize. we don't want to override it
		init : function(){},
		
		onControlsOpen : function(){},
		
		onControlsClosed : function(){},
		
		
		/*
		renderLayerInEditor : function( i )
		{
			this.visual.render().$el.css('zIndex',i+1);
			if(this.isNew()) 
			{
				this.visual.render().$el.css('zIndex',1000);
				$('#visual-editor-workspace').append( this.visual.el );
			}
			else $('#visual-editor-workspace').append( this.visual.render().el );
			if(this.controls) this.layerPanel.prepend( this.controls.render().el );
			
			this.trigger('editor_rendered editor_layerEnter');
		},
		
		unrenderLayerFromEditor : function()
		{
			if( this.hasChanged() ) this.save();
			this.trigger('editor_layerExit')
		},
		
		*/
		
		refreshView : function()
		{
			this.visual.$el.attr('id','layer-visual-'+this.id)
			if(this.controls) this.controls.$el.attr('id','layer-'+this.id)
		},

		update : function( newAttr, silent )
		{
			var _this = this;
			var a = _.extend( this.toJSON().attr, newAttr, {model:null} );
			this.set( 'attr' , a );
			if( !silent )
			{

				this.save({},{
					success : function(){ _this.trigger('update') }
				});
				
				
			}
		},

		// draws the thumb?
		thumb : function()
		{
			var img = $('<img>')
				.attr('src', this.attr.thumbnail_url)
				.css({'width':'100%'});

			this.thumbnail.append( img );
		},

/*
		// updates the z-index for the visual element
		updateZIndex : function(z){},
*/

		////////// player

		// triggers ready for the player
		preload : function()
		{
			$('#zeega-player').trigger('ready',{'id':this.id});
		},

		// player :: puts the visual element offscreen
		stash : function(){},

		// player :: fallback for media that may not work for some reason (browsers)
		playUnsupported : function(){},

		// player :: triggers when the frame exits
		onExit : function(){},

		// utlities

		//sets the z-index ??
		setZIndex : function(z){ this.visualEditorElement.css( 'z-index', z ) },

		// ??
		onStateChange : function(){},

		// ??
		onError : function(){},

		//////////////////
	
		//remove formatting from titles (esp important for text layer!)
		validate : function(attrs)
		{
			if( attrs.title ) attrs.title = attrs.title.replace(/(<([^>]+)>)/ig, "");
		}
	
	});

	Layer.Views.Visual = Backbone.View.extend({
				
		LAYER_TIMEOUT : 30000,
		
		layerClassName : '',
		
		draggable : true,
		linkable : true,
		
		initialize : function()
		{
			var _this = this;
			
			this.typeClass = new Layers[this.model.get('type')].Visual({model:this.model, attributes:{
				id: 'layer-visual-'+this.model.id,
				class: 'visual-element layer-'+ this.model.get('type').toLowerCase()
			}});
			//this.typeClass.attributes = { id:'testtrue' };

			_.extend( this.events, this.eventTriggers );
			
			this.initListeners();
			
			//this.attr = this.model.get('attr')
			
			this.typeClass.$el.css({
				
				'width' : _this.model.get('attr').width+'%',
				'opacity' : _this.model.get('attr').opacity,
				
				// if previewing, then set way off stage somewhere
				'top' : (this.model.player) ? '-1000%' : _this.model.get('attr').top +'%',
				'left' : (this.model.player) ? '-1000%' : _this.model.get('attr').left+'%'
				});
				
			this.init();
		},
		
		initListeners : function()
		{
			//editor_removeLayerFromFrame
			if( this.model.player )
			{
				this.model.on('player_preload', this.private_onPreload, this);
				this.model.on('player_play', this.private_onPlay, this);
				this.model.on('player_exit', this.private_onExit, this);
				this.model.on('player_unrender', this.private_onUnrender, this);
				this.model.on('error', this.private_renderError, this);
			}
			else
			{
				this.model.on('editor_layerEnter editor_layerRender', this.private_onLayerEnter, this);
				this.model.on('editor_layerExit editor_removeLayerFromFrame', this.private_onLayerExit, this);
				this.model.on('editor_controlsOpen', this.private_onControlsOpen, this);
				this.model.on('editor_controlsClosed', this.private_onControlsClosed, this);
			}
		},
		
		events : {},
		eventTriggers : {},
		
		init : function(){},
		
		/*******************
		
		PUBLIC EDITOR FUNCTIONS
		
		*******************/
		
		onLayerEnter : function(){},
		
		onLayerExit : function()
		{
			this.model.trigger('editor_readyToRemove')
		},
		
		onControlsOpen : function(){},
		
		onControlsClosed : function(){},
		
		// cleanupEditor : function(){},
		
		
		/*******************
		
		PUBLIC PLAYER FUNCTIONS
		
		*******************/
		
		onPreload : function()
		{
			var _this = this;
			this.typeClass.render();
			if(this.model.get('attr').link)
			{
				$(this.el).click(function(){
					window.location = 'http://'+ _this.model.get('attr').link
				})
				.addClass('linked-layer');

			}
			
			this.model.trigger('ready',this.model.id)
		},
		
		private_renderError : function()
		{
			this.typeClass.$el.empty()
				.css({
					'background-color' : 'rgba(255,0,0,0.25)',
					'min-height' : '25px'
				});
				return this;
		},

		playPause : function()
		{
			console.log('$$		play pause status', this.isPlaying)
			if( this.isPlaying )
			{
				this.isPlaying = false;
				this.onPause();
			}
			else
			{
				this.isPlaying = true;
				this.onPlay()
			}
		},

		onPause : function(){},
		
		onPlay : function(){},
		
		onExit : function(){},
		
		onUnrender : function(){},
		
		
		/*******************
		
		PRIVATE EDITOR FUNCTIONS
		
		*******************/
		
		private_onLayerEnter : function()
		{
			if(this.draggable) this.makeDraggable();
			this.onLayerEnter();
		},
		
		private_onLayerExit : function()
		{
			this.model.on('editor_readyToRemove', this.remove, this )
			this.onLayerExit();
		},
		
		private_onControlsOpen : function()
		{
			this.onControlsOpen();
		},
		
		private_onControlsClosed : function()
		{
			this.onControlsClosed();
		},
		
		////// HELPERS //////
		
		makeDraggable : function()
		{
			var _this = this;
			$(this.el).draggable({
				
				start : function(e,ui)
				{
				},
				
				stop : function(e,ui)
				{
					//convert to % first // based on parent
					var topCent = ( ui.position.top / $(this).parent().height() ) * 100;
					var leftCent = ( ui.position.left / $(this).parent().width() ) * 100;
					
					_this.model.update({
						top: topCent,
						left: leftCent
					})
				}
			});
		},
		
		/*******************
		
		PRIVATE PLAYER FUNCTIONS
		
		*******************/
		
		private_onPreload : function()
		{
			var _this = this;
			
			this.typeClass.onPreload();

			if(this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(function(){
				if(_this.model.status != 'ready')
				{
					console.log('ERROR: LAYER TIMEOUT!! '+_this.model.id)
					_this.model.status = 'error'
					_this.model.trigger('error', _this.model.id)
				}
				//else console.log('no error! loaded normally!!')
			},this.LAYER_TIMEOUT)
		},
		
		private_onPlay : function( z )
		{
			this.isPlaying = true;
			if(!this.onStage)
			{
				this.onStage = true;
				if(this.model.get('attr').dissolve) $(this.el).clearQueue().css({opacity:.01});
			}
			this.moveOnStage();

			if(z) this.updateZIndex( z )

			if(this.model.status != 'error' ) this.onPlay();

			this.model.inFocus = true;
			
			//dissolve
			if(this.model.get('attr').dissolve) $(this.el).fadeTo(1000,this.model.get('attr').opacity);
			
			//make the linked layers blink on entrance
			if(this.model.get('attr').link || this.model.get('type') == 'Link')
			{
				var _this = this;
				setTimeout( function(){ $(_this.el).addClass('link-blink') }, 250 );
				setTimeout( function(){ $(_this.el).removeClass('link-blink') }, 2000 );
			}
		},
		
		private_onExit : function()
		{
			this.isPlaying = false;
			this.moveOffStage();
			this.onStage=false;
			this.onExit();
			this.model.inFocus = false;
		},
		
		private_onUnrender : function()
		{
			this.onUnrender();
			this.model.inFocus = false;
			this.model.rendered = false;
			this.remove();
		},
		
		////// HELPERS //////
		
		moveOnStage :function()
		{
			this.typeClass.$el.css({
				'top' : this.model.get('attr').top +'%',
				'left' : this.model.get('attr').left+'%'
			});
		},
		
		updateZIndex : function( z )
		{
			this.typeClass.$el.css('z-index', z)
		},
		
		moveOffStage :function()
		{
			this.typeClass.$el.css({
				'top' : '-1000%',
				'left' : '-1000%'
			});
		}
		
	});

	return Layer;

})

