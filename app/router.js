define([
	// Application.
	"zeega",
	// Modules.
	'modules/about',
	'modules/citations',
	'modules/grid',
	'modules/index',
	'modules/map',
	'modules/menu',
	'modules/navigation',
	'modules/participate',
	'modules/players',
	'modules/search'

],

// generic App used
function(
	Zeega,
	About,
	Citations,
	Grid,
	Index,
	Map,
	Menu,
	Navigation,
	Participate,
	Players,
	Search,
	loadingSpinner

	) {

	// Defining the application router, you can attach sub routers here.
	/*

	the router is where your application/navigation logic goes

  */
	var Router = Backbone.Router.extend({
		routes: {

			"" : "index",
			"about" : 'about',

			"collections" : 'collections',
			'collections/' : 'collections',
			'collections/:collection_id' : 'viewCollectionGrid',
			'collections/:collection_id/' : 'viewCollectionGrid',
			'collections/:collection_id/view' : 'viewCollectionPlayer',
			'collections/:collection_id/view/' : 'viewCollectionPlayer',
			'collections/:collection_id/view/:item_id' : 'viewCollectionPlayer',
			'collections/:collection_id/view/:item_id/' : 'viewCollectionPlayer',

			'map' : 'map',
			'participate' : 'participate',
			'menu' : 'menu',
			'search' : 'search'
		},

		index: function()
		{
			initialize();
			renderIndex();
		},

		about : function()
		{
			initialize({player:'pause'});
			renderPage('About');
		},

		collections : function()
		{
			initialize({player:'exit'});
			renderCollections();
		},

		viewCollectionGrid : function( collectionID )
		{
			initialize({player:'exit'});
			goToItemCollection( collectionID );
		},

		viewCollectionPlayer : function( collectionID, itemID )
		{
			if(Zeega.grid) Zeega.grid.remove();

			// check to see if an identical player exists

			if( !Zeega.player || Zeega.player && Zeega.player.id != collectionID )
			{
	

				var newPlayer = function()
				{
					var player = new Players.CollectionZeegaPlayerModel();  
					player.collection_id = collectionID;
					player.fetch().success(function(res){
						renderCitations();
						if( !_.isUndefined(itemID) ) player.set('frameID', itemID );
						if(player.get('frames').length>0){
							Zeega.player = new Zeega.Player( player.toJSON() );
							Zeega.player.on('all', onPlayerEvent, this);
							Zeega.player.play();
						}
						else{
							gotoStreetviewProject(player.toJSON(),collectionID);
						}
					});
				}


				if( Zeega.player ) Zeega.player.on('player_exit', newPlayer);
				else newPlayer();

				initialize({player:'exit'});

			}
			else
			{
				initialize({player:'pause'});
				renderCitations();
				Zeega.player.trigger('frame_rendered', Zeega.player.project.currentFrame);
			}

		},

		map : function()
		{
			initialize({player:'pause'});
			renderMap();
		},

		participate : function()
		{
			initialize({player:'pause'});
			renderPage('Participate');
		},

		menu : function()
		{
			initialize({player:'pause'});
			renderMenu();

		},

		search : function()
		{
			initialize({player:'pause'});
		}
	});

/*

tasks to take care of before the application can load
esp inserting the layout into the dom!

*/

	function gotoStreetviewProject(player,collectionID){
		console.log('collection has no content');
		var Model = Backbone.Model.extend({ url: localStorage.api + '/items/'+ collectionID });
		var it = new Model();
		it.fetch().success(function(resp){
			console.log("#########",resp);
			player.layers[0]= {
				id:2,
				type:"Geo",
				attr:{
					archive:'',
					height:100,
					width:100,
					lat:resp.items[0].media_geo_latitude,
					lng:resp.items[0].media_geo_longitude,
					//streetZoom : resp.items[0].attributes.pov.streetZoom,
					//heading : resp.items[0].attributes.pov.heading,
					//pitch : resp.items[0].attributes.pov.pitch,
					title: resp.items[0].title,

				}
			}
			player.frames[0]= {
				id:3,
				layers:[2],
				attr:{
					advance:0
					}
			
			}
			player.sequences[0].frames=[3];
			
			Zeega.player = new Zeega.Player( player );
			Zeega.player.on('all', onPlayerEvent, this);
			Zeega.player.play();
		
		
		});
	
	}

	function initialize(attr)
	{
		initPT();
		cleanup(attr);
	}

	// makes sure this happens on ly once per load
	var initPT = _.once( init );
	function init()
	{
		renderBaseLayout();
	}

	// happens on every router change
	function cleanup(attr)
	{
		// attr= { player : pause', 'exit' }
		if(attr && attr.player && Zeega.player)
		{
			switch(attr.player)
			{
				case 'pause':
					console.log('player pause')
					Zeega.player.playPause();
					break;
				case 'exit':
					console.log('player exit')
					Zeega.player.exit();
				break;
			}
		}
				// remove modal if it exists
		if(Zeega.page)
		{
			Zeega.page.remove();
			Zeega.page = null;
		}

		removeCitation();

	}

	function renderIndex()
	{
		console.log('render index')
		var _this  = this;
		var player = new Players.Model();
		player.on('ready', function(){
			renderFeaturedCitation();
		});

	}

	function renderFeaturedCitation()
	{
		var citationDrawer = new Citations.Layouts.CitationDrawerLayout();
		Zeega.citation = citationDrawer;
		console.log('player', Zeega.player)
		var citView = new Citations.Views.FeaturedCitationView({ model: Zeega.player });
		citationDrawer.insertView( '.citation-inner', citView);

		Zeega.citation.render();
		$('#nav-lower').html(Zeega.citation.el);
		citView.render();

	}

	function renderPage(pageName)
	{
		/*
		Zeega.page = new App.Layouts.Modal({title:pageName});
		var pageView = new App.Views[pageName]();
		Zeega.page.setView('.PT-modal-content', pageView );
		Zeega.page.render();
		$('body').append(Zeega.page.el);
		*/
	}

	function renderMenu()
	{
		/*
		Zeega.page = new App.Layouts.ModalWide({title:'Menu'});
		var pageView = new App.Views.Menu();
		Zeega.page.setView('.PT-modal-content', pageView );
		Zeega.page.render();
		$('body').append(Zeega.page.el);
		*/
	}

	function generateGrid( collection, type )
	{
		Zeega.grid = new Grid.Layouts.GridView({collection:collection, type:type});
		Zeega.grid.render();
		$('#app-base').append( Zeega.grid.el );
	}

	function goToItemCollection( collectionID )
	{

		var items = new Grid.Collections.Items();
		items.collectionID = collectionID;
		items.fetch().success(function(res){
			items.each(function(item){ item.set('collection_id',collectionID);});

			var Model = Backbone.Model.extend({ url: localStorage.api + '/items/'+ collectionID });
			var it = new Model();
			it.fetch().success(function(){
				items.collectionInfo = it.toJSON();
				generateGrid( items, 'items' );
			});
		});
	}

	function renderCollections()
	{
		removePlayer();
		// make and render itemCollection
		var itemCollectionsCollection = new Grid.Collections.ItemCollections();
		itemCollectionsCollection.fetch().success(function(res){
			generateGrid( itemCollectionsCollection, 'collections' );
			$('#app-base').append( Zeega.grid.el );
		});
	}

  // this is the switch that interperes all incoming player events
	function onPlayerEvent(e, opts)
	{

		//console.log('player e:', e, opts)
		/* lint error - replaced switch with if
		switch(e)
		{
		case 'frame_rendered':
		renderCitation(e,opts);
		break;
		}*/
		if (e == 'frame_rendered')
		{
			renderCitation(e,opts);
		}
		else if( e == 'preview_resize' )
		{
			//$('.citation-wrapper').css({ width : Zeega.player.getSize().width +'px' });
		}
		else if( e== 'timeupdate')
		{
			//console.log('%:', opts.elapsed /opts.duration )
			$('.citation-top .elapsed').css({width: (opts.elapsed /opts.duration*100) +'%' })
		}
	}

	function renderCitations()
	{
		var citationDrawer = new Citations.Layouts.CitationDrawerLayout();
		Zeega.citation = citationDrawer;
		//Zeega.citation.insertView( new Citations.Views.CitationView() );

		Zeega.citation.render();
		$('#nav-lower').html(Zeega.citation.el);
	}

	function renderCitation(e,model)
	{
		Zeega.citation.getViews().each(function(view){ view.remove(); });

		var layer = model.layers.at(0);
		var navView = new Navigation.Views.NavControls({model:layer, arrowState:model.arrowState});
		var citView = new Citations.Views.CitationView({model:layer,player:Zeega.player.toJSON() });
		Zeega.citation.insertView( '.nav-controls', navView);
		Zeega.citation.insertView( '.citation-inner', citView);
		Zeega.citation.render();
		navView.render();
		citView.render();
	}

	function removeCitation()
	{
		if( Zeega.citation ) Zeega.citation.remove();
	}

	function renderMap()
	{
		/*
		Zeega.page = new App.Layouts.ModalWide({title:'Delicious World'});
		var pageView = new App.Views.Map();
		Zeega.page.setView('.PT-modal-content', pageView );
		$('body').append(Zeega.page.el);
		Zeega.page.render();
		*/
	}

	function clearModals()
	{
		if(Zeega.page) Zeega.page.remove();
	}

	function removePlayer()
	{
		if( Zeega.player ) Zeega.player.exit();
	}

  // this is a utility and should be elsewhere
	function renderBaseLayout()
	{

		Zeega.baseLayout = new Backbone.Layout({
			el: "#main"
		});
		// Insert the tutorial into the layout.
		Zeega.baseLayout.insertView(new Index.Views.Base() );
		Zeega.baseLayout.setView('#nav-upper', new Navigation.Views.UpperNavView() );
		// Render the layout into the DOM.
		Zeega.baseLayout.render();
	}

	function showLoadingSpinner() {
		$('#loading').show();
	}

	function hideLoadingSpinner() {
		$('#loading').hide();
	}

	return Router;

});
