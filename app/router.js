define([
	// Application.
	"zeega",
	// Modules.
	'modules/about',
	'modules/grid',
	'modules/index',
	'modules/map',
	'modules/menu',
	'modules/navigation',
	'modules/participate',
	'modules/collection-player',
	'modules/search'
],

// generic App used
function(
	Zeega,
	About,
	Grid,
	Index,
	Map,
	Menu,
	Navigation,
	Participate,
	CollectionPlayer,
	Search

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
			Zeega.page = new Index.Model();
		},

		about : function()
		{
			initialize({player:'pause'});
			Zeega.modal = new About.Model();
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
			initialize();
			Zeega.page = new CollectionPlayer.Model({id: collectionID, frameID: itemID });


			/*

			if(Zeega.grid) Zeega.grid.remove();

			// check to see if an identical player exists

			if( !Zeega.player || Zeega.player && Zeega.player.id != collectionID )
			{
	

				var newPlayer = function()
				{
					var player = new CollectionPlayer.CollectionZeegaPlayerModel();  
					player.collection_id = collectionID;
					player.fetch().success(function(res){
						renderCitations();
						if( !_.isUndefined(itemID) ) player.set('frameID', itemID );
						if(player.get('frames').length>0){
							Zeega.player = new Zeega.Player( player.toJSON() );
							//Zeega.player.on('all', onPlayerEvent, this);
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
			*/

		},

		map : function()
		{
			initialize({player:'pause'});
			Zeega.modal = new Map.Model();
		},

		participate : function()
		{
			initialize({player:'pause'});
			Zeega.modal = new Participate.Model();
		},

		menu : function()
		{
			initialize({player:'pause'});
			Zeega.modal = new Menu.Model();

		},

		search : function()
		{
			initialize({player:'pause'});
			// search does not exist yet
		}
	});

/*******************	BEGIN PRIMARY		**********************/

/*

tasks to take care of before the application can load
esp inserting the layout into the dom!

*/

	function initialize(attr)
	{
		initPT();
		cleanup(attr);
	}

	// makes sure this happens on ly once per load
	var initPT = _.once( init );
	function init()
	{
		// render the base layout into the dom
		var baseLayout = new Backbone.Layout({ el: "#main" });
		var baseView = Backbone.LayoutView.extend({ template: "base" });
		baseLayout.insertView(new baseView() );
		var nav = new Navigation.Views.UpperNavView();
		baseLayout.setView('#nav-upper', nav );
		baseLayout.render();
		nav.render();
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
		if(Zeega.modal)
		{
			Zeega.modal.remove();
			Zeega.modal = null;
		}

		if( Zeega.citation ) Zeega.citation.remove();

	}



/*******************	END PRIMARY		**********************/



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
			//Zeega.player.on('all', onPlayerEvent, this);
			Zeega.player.play();
		
		
		});
	
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
		if( Zeega.player ) Zeega.player.exit();
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
		/*
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
		*/
	}

	function renderCitations()
	{
		/*
		var citationDrawer = new Citations.Layouts.CitationDrawerLayout();
		Zeega.citation = citationDrawer;
		//Zeega.citation.insertView( new Citations.Views.CitationView() );

		Zeega.citation.render();
		$('#nav-lower').html(Zeega.citation.el);
		*/
	}

	function renderCitation(e,model)
	{
		/*
		Zeega.citation.getViews().each(function(view){ view.remove(); });

		var layer = model.layers.at(0);
		var navView = new Navigation.Views.NavControls({model:layer, arrowState:model.arrowState});
		var citView = new Citations.Views.CitationView({model:layer,player:Zeega.player.toJSON() });
		Zeega.citation.insertView( '.nav-controls', navView);
		Zeega.citation.insertView( '.citation-inner', citView);
		Zeega.citation.render();
		navView.render();
		citView.render();
		*/
	}


	return Router;

});
