define([
	"zeega",
	// Libs
	"backbone",
	// Plugins
	'zeega_player'
],

function(Zeega, Backbone) {

	// Create a new module
	var CPlayer = Zeega.module();

	CPlayer.Model = Backbone.Model.extend({

		initialize : function()
		{
			var _this = this;
			this.project = new Project( this.toJSON() );
			this.project.fetch().success(function(){
				// I should not have to put this in Zeega.player!
				// want this in _this.player !!
				Zeega.player = new Zeega.Player( _this.project.toJSON() );
				_this.player = Zeega.player; // I want to remove this
				_this.player.on('ready', _this.renderCitationLayout, _this);
				_this.player.on('timeupdate', function(opts){ _this.updateElapsed(opts) }, _this);
				_this.player.on('frame_rendered', function(layer){ _this.renderCitation(layer) }, _this);
				_this.player.init();
			});
		},

		renderCitationLayout : function()
		{
			if( this.citationDrawer ) $('#nav-lower').html( this.citationDrawer.el );
			
				console.log('render citation layout', this)
			this.citationDrawer = new citationLayout({ model: this.project });
			this.citationDrawer.player = this.player;
			Zeega.citation = this.citationDrawer; // I don't like this

			this.citationDrawer.render();
			$('#nav-lower').html( this.citationDrawer.el );

		},

		renderCitation : function(model)
		{
			
			this.citationDrawer.getViews().each(function(view){ view.remove(); });
			var layer = model.layers.at(0);
			this.updateArrows( model.arrowState );
			var citView = new CitationView({model:layer});
			this.citationDrawer.insertView( '.frame-citation-info', citView);
			citView.render();
		},

		updateArrows : function( arrowState )
		{
			var leftArrow = this.citationDrawer.$('#PT-preview-left');
			var rightArrow = this.citationDrawer.$('#PT-preview-right');
			if(arrowState == 'l')
			{
				if( leftArrow.is(':hidden') ) leftArrow.fadeIn();
				if( rightArrow.is(':visible') ) rightArrow.fadeOut();
			}
			else if(arrowState == 'r')
			{
				if( leftArrow.is(':visible') ) leftArrow.fadeOut();
				if( rightArrow.is(':hidden') ) rightArrow.fadeIn();
			}
			else if(arrowState == 'lr' || arrowState == 'rl' )
			{
				if( leftArrow.is(':hidden') ) leftArrow.fadeIn();
				if( rightArrow.is(':hidden') ) rightArrow.fadeIn();
			}
			else
			{
				if( leftArrow.is(':visible') ) leftArrow.fadeOut();
				if( rightArrow.is(':visible') ) rightArrow.fadeOut();
			}
		},

		updateElapsed : function(opts)
		{
			this.citationDrawer.$('.elapsed').css({width: (opts.elapsed /opts.duration*100) +'%' })
		},

		exit : function()
		{
			this.player.exit();
			this.citationDrawer.remove();
		}

	});

	var citationLayout = Backbone.Layout.extend({

		template: "citation-drawer-layout",
		id: 'citation-drawer-layout',

		serialize : function(){ return this.model.toJSON() },

		events : {
			'click #PT-preview-left' : 'goLeft',
			'click #PT-preview-right' : 'goRight'		
		},

		goLeft : function()
		{
			this.player.prev();
			return false;
		},
		goRight : function()
		{
			this.player.next();
			return false;
		}

	});


	var CitationView = Backbone.LayoutView.extend({

		template : 'citation-static',
		className : 'citation-view',

		initialize : function()
		{
			//swaps out the template if it's a video
			if(this.model.get('attr').media_type == 'Video') this.template = 'citation-player';
		},

		events : {
			'click .play-pause' : 'playPause'
		},

		playPause : function()
		{
			console.log('play pause', Zeega);

			if(this.$('.play-pause i').hasClass('PT-icon-pause')) this.$('.play-pause i').removeClass('PT-icon-pause').addClass('PT-icon-play');
			else this.$('.play-pause i').removeClass('PT-icon-play').addClass('PT-icon-pause');
			Zeega.player.playPause();

			return false;
		},

		serialize : function(){ return this.model.toJSON(); }
	});


	var Project = Backbone.Model.extend({

		url : function()
		{
			return localStorage.api + '/items/'+ this.id +'/project';
		},

		defaults : {
			mode :'standalone',

			navbar_top : false,
			navbar_bottom : false,
			layerCitations : false,
			playerCitation : false,

			chromeless : true,
			branding : false,
			social : false,
			fullscreenEnabled : false,
			fadeOutOverlays : false
		}

	});

	return CPlayer;

});