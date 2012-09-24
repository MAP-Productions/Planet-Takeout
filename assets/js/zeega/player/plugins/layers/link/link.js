define([
  "zeega",
  "backbone",
  'zeega_layers/_layer/_layer',
  'zeega_media_players/plyr'
],

function(zeega, Backbone, _Layer, Player){

	var Layer = zeega.module();

	Layer.Link = _Layer.extend({

		layerType : 'Link',
		layerPanel : $('#links-list'),
		hasControls : false,
		defaultControls : false,
		displayCitation : false,
		
		
		
		defaultAttributes : {
			'title' : 'Link Layer',
			'to_sequence' : null,
			'from_sequence' : null,
			'to_frame' : null,
			'from_frame' : null,
			'left' : 25,
			'top' : 25,
			'height' : 50,
			'width' : 50
		},
		
		init : function(options)
		{
			//check to see if link layer is broken
			/*
			var a = this.get('attr');
			if( !_.isNull(a.from_frame) || !_.isNull(a.from_sequencee) || !_.isNull(a.to_frame) || !_.isNull(a.to_sequence) )
			{
				console.log('link layer is broken! delete meeee!')
				this.destroy();
			}
			*/
		},
		
		setToFrame : function(sequenceID, frameID)
		{
			this.get('attr').to_sequence = sequenceID;
			this.get('attr').to_frame = frameID;
			this.get('attr').title = 'Link to sequence '+sequenceID;
			this.save();
		}
		
	});
	
	/*
	Layer.Views.Controls.Link = Layer.Views.Controls.extend({
		
		onLayerEnter : function()
		{
			var layerIndex = this.model.layerIndex || this.model.layerColor.length;
			
			$(this.el).find('.zicon-link').css({'background-color': this.model.layerColor[( layerIndex % this.model.layerColor.length )] })
			if(this.model.get('attr').to_frame == zeega.app.currentFrame.id)
			{
				this.remove();
			}
		},
		
		render : function()
		{
			return this;
		}
		
	});
*/
	Layer.Link.Visual = _Layer.Visual.extend({
		
		preview : true,
		
		init : function()
		{
			//this.preview = zeega.app.previewMode;
		},
		
		render : function()
		{
			var _this = this;
			
			
			var style = {
				'height' : this.model.get('attr').height +'%',
				'cursor' : 'pointer',
				'z-index' : 100
			}
			

				this.delegateEvents({'click':'goClick'})
				//$(this.el).addClass('go-to-sequence')
			
			if(this.model.get('attr').link_type == 'arrow_left')
				this.$el.html( this.getTemplate_ArrowLeft() ).css( style );
			else if(this.model.get('attr').link_type == 'arrow_right')
				this.$el.html( this.getTemplate_ArrowRight() ).css( style );
			else if(this.model.get('attr').link_type == 'arrow_up')
				this.$el.html( this.getTemplate_ArrowUp() ).css( style );
			else
			{
				if(!this.preview )
				{
					_.extend( style, {
						'height' : this.model.get('attr').height +'%',
						'width' : this.model.get('attr').width +'%',
						'border' : '2px dashed orangered',
						'border-radius' : '6px'
					})
				}
				this.$el.html( this.getTemplate_Rectangle() ).css( style ).addClass('linked-layer');
			}

			return this;
		},
		
		events : {
			'click .go-to-sequence' : 'goToSequenceFrame',
			'click .delete-link' : 'deleteLink',
			'mousedown .show-controls' : 'showControls'
		},
		
		goClick : function()
		{
			console.log('click link',this);
			zeega.player.project.goToFrame(this.model.get('attr').to_frame);
		},
		
		goToSequenceFrame : function()
		{
			if(zeega.app.previewMode) zeega.app.project.goToFrame(this.model.get('attr').to_frame);
			else zeega.app.router.navigate("editor/sequence/"+this.model.get('attr').to_sequence+"/frame/"+this.model.get('attr').to_frame,{trigger:true})
		},
		
		deleteLink : function(e)
		{
			if( confirm('delete link?') )
			{
				this.model.trigger('editor_removeLayerFromFrame', this.model);
				this.remove();
			}
		},
		
		showControls : function(e)
		{
			
		},
		
		onLayerEnter : function()
		{
			var _this = this;
			this.$el.resizable({
				stop: function(e,ui)
				{
					_this.model.update({
						'width' : $(this).width() / $(this).parent().width() * 100,
						'height' : $(this).height() / $(this).parent().height() * 100
					})
				}
			})
			this.delegateEvents();
		},
		
		onPlay : function()
		{
			this.render();
			/*
			if(this.model.get('attr').to_frame == zeega.app.player.currentFrame.id)
				this.moveOffStage()
			*/
			this.delegateEvents({'click':'goClick'})
		},
		
		getTemplate_Rectangle : function()
		{
			var html = '';
				if( !this.preview && !_.isNull( this.model.get('attr').to_sequence ) ) html += '<i class="icon-share go-to-sequence"></i>';		
			return html;
		},
		getTemplate_ArrowRight : function()
		{
			return  '<img src="../../../images/link_arrow-right.png"/>';
		},
		getTemplate_ArrowLeft : function()
		{
			return  '<img src="../../../images/link_arrow-left.png"/>';
		},
		getTemplate_ArrowUp : function()
		{
			return  '<img src="../../../images/link_arrow-up.png"/>';
		},
		getTemplate_ArrowDown : function()
		{
			return  '<img src="../../../images/link_arrow-down.png"/>';
		}
		
		
	});
	
	return Layer;

})