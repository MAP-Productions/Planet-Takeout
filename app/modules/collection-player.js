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
			this.project.on('project_loaded', this.startPlayer, this );
			console.log('cp initi', this);
			this.project.fetch().success(function(){ _this.project.trigger('sync'); });
		},

		startPlayer : function()
		{
			// I should not have to put this in Zeega.player!
			// I want this in _this.player !!
			Zeega.player = new Zeega.Player( _.extend(this.project.toJSON(),{viewportFull : false}) );
			this.player = Zeega.player; // I want to remove this
			
			if( this.player.ready ) this.renderCitationLayout();
			else this.player.on('ready', this.renderCitationLayout, this);
			
			this.player.on('timeupdate', function(opts){ this.updateElapsed(opts); }, this);
			this.player.init();
		},

		renderCitationLayout : function()
		{
			if( this.citationDrawer ) $('#nav-lower').html( this.citationDrawer.el );
			
			this.citationDrawer = new citationLayout({ model: this.project });
			this.citationDrawer.player = this.player;
			Zeega.citation = this.citationDrawer; // I don't like this

			this.citationDrawer.render();
			$('#nav-lower').html( this.citationDrawer.el );
			this.player.on('frame_rendered', function(layer){ this.renderCitation(layer); }, this);
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
			this.citationDrawer.$('.elapsed').css({width: (opts.elapsed /opts.duration*100) +'%' });
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

		serialize : function(){ return this.model.toJSON(); },

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
			if(this.model.get('attr').media_type == 'Video' || this.model.get('attr').media_type == 'Audio' ) this.template = 'citation-player';
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
		},

		initialize : function()
		{
			//this.on('all', function(e){console.log('all',e)} , this );
			this.on('sync', this.loadProject, this );
		},

		loadProject : function()
		{
			console.log('project loaded', this);
			if( this.get('frames').length > 0 ) this.trigger('project_loaded');
			else this.generateStreetViewProject();

		},

		generateStreetViewProject : function()
		{
			var _this = this;
			this.url = localStorage.api + '/items/'+ this.id;

			this.fetch().success(function(){

				var seq = [{
					id: 1,
					frames : [1],
					persistLayers: []
				}];

				var fra = [{
					id : 1,
					layers: [1],
					attr: { advance:0 }
				}];

				var lay = [{
					id:1,
					type:"Geo",
					attr:{
						archive:'',
						height:100,
						width:100,
						lat: _this.get('items')[0].media_geo_latitude,
						lng: _this.get('items')[0].media_geo_longitude,
						//streetZoom : resp.items[0].attributes.pov.streetZoom,
						heading : 0, //_this.get('items')[0].attributes.pov.heading,
						//pitch : resp.items[0].attributes.pov.pitch,
						title: _this.get('items')[0].title
					}
				}];

				_this.set({
					sequences : seq,
					frames : fra,
					layers : lay
				});

				_this.trigger('project_loaded');

			});
		}


	});

	

	return CPlayer;

});
