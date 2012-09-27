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
			initialize('player');
			Zeega.page = new Index.Model();
		},

		about : function()
		{
			initialize('modal');
			Zeega.modal = new About.Model();
		},

		collections : function()
		{
			initialize('page');
			renderCollections();
		},

		viewCollectionGrid : function( collectionID )
		{
			initialize('page');
			goToItemCollection( collectionID );
		},

		viewCollectionPlayer : function( collectionID, itemID )
		{
			if( !Zeega.page || Zeega.page.player && Zeega.page.player.id != collectionID )
			{
				var createNewPlayer = function()
				{
					Zeega.page = new CollectionPlayer.Model({id: collectionID, frameID: itemID });
				}

				if( Zeega.player ) Zeega.player.on('player_exit', createNewPlayer);
				else createNewPlayer();

				initialize('player');

			}
			else
			{
				console.log('resume old player')
				initialize('resume');
			}

		},

		map : function()
		{
			initialize('modal');
			Zeega.modal = new Map.Model();
		},

		participate : function()
		{
			initialize('modal');
			Zeega.modal = new Participate.Model();
		},

		menu : function()
		{
			initialize('modal');
			Zeega.modal = new Menu.Model();

		},

		search : function()
		{
			initialize();
			// search does not exist yet
		}
	});

/*******************	BEGIN PRIMARY		**********************/

/*

tasks to take care of before the application can load
esp inserting the layout into the dom!

*/

	function initialize(to)
	{
		initPT();
		cleanup(to);
	}

	// makes sure this happens on ly once per load
	var initPT = _.once( init );
	function init()
	{
		// render the base layout into the dom
		// this happens only once
		var baseLayout = new Backbone.Layout({ el: "#main" });
		var baseView = Backbone.LayoutView.extend({ template: "base" });
		baseLayout.insertView(new baseView() );
		var nav = new Navigation.Views.UpperNavView();
		baseLayout.setView('#nav-upper', nav );
		baseLayout.render();
		nav.render();
	}

	// happens on every router change
	function cleanup(to)
	{
		// if going to a modal, make sure the player is paused
		// if going to a grid, exit the player
		// if closing a modal, and a player exists, then make the player play
		// modal, page, return, player 

		if( Zeega.page && Zeega.page.player )
		{
			switch(to)
			{
				case 'modal':
					console.log('going to modal. pause the player')
					Zeega.page.player.pause();
					break;
				case 'page':
					Zeega.page.exit();
					break;
				case 'player':
					Zeega.page.exit();
					break;
				case 'resume':
					console.log('return from modal. play the player')
					Zeega.page.player.play();
					break;
			}
		}

		// remove modal if it exists
		if(Zeega.modal)
		{
			Zeega.modal.remove();
			Zeega.modal = null;
		}

	}



/*******************	END PRIMARY		**********************/


// move this to collection-player.js ???

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
		itemCollectionsCollection.fetch().success(function(){
			generateGrid( itemCollectionsCollection, 'collections' );
			$('#app-base').append( Zeega.grid.el );
		});
	}


	return Router;

});
