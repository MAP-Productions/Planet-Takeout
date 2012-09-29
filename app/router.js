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
	'modules/search',

	// Submodules.
	'modules/submodules/loadingspinner'
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
			"browser" : 'browser',
			"mobile" : 'moible',

			"collections" : 'collections',
			'collections/' : 'collections',
			'collections/:collection_id' : 'viewCollectionGrid',
			'collections/:collection_id/' : 'viewCollectionGrid',
			'collections/:collection_id/view' : 'viewCollectionPlayer',
			'collections/:collection_id/view/' : 'viewCollectionPlayer',
			'collections/:collection_id/view/:item_id' : 'viewCollectionPlayer',
			'collections/:collection_id/view/:item_id/' : 'viewCollectionPlayer',

			'featured' : 'index',
			'featured/' : 'index',
			'featured/:featured_id' : 'viewFeatured',
			'featured/:featured_id/' : 'viewFeatured',

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

		viewFeatured : function(featuredID)
		{
			initialize('player');
			Zeega.page = new Index.Model({featuredID: featuredID });
		},

		about : function()
		{
			initialize('modal');
			Zeega.modal = new About.Model();
		},
		browser : function()
		{
			initialize('browser');
		},
		
		moblie : function()
		{
			initialize('mobile');
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
				};

				if( Zeega.player ) Zeega.player.on('player_exit', createNewPlayer);
				else createNewPlayer();

				initialize('player');

			}
			else
			{
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
		switch(to)
			{
				case 'mobile':
					var baseLayout = new Backbone.Layout({ el: "#main" });
					var mobileView = Backbone.LayoutView.extend({ template: "mobile" });
					baseLayout.insertView(new mobileView() );
					baseLayout.render();
					break;
				case 'browser':
					var baseLayout = new Backbone.Layout({ el: "#main" });
					var browserView = Backbone.LayoutView.extend({ template: "browser" });
					baseLayout.insertView(new browserView() );
					baseLayout.render();
					break;
				default:
					initPT();
					cleanup(to);
			}
	}

	// makes sure this happens on ly once per load
	var initPT = _.once( init );
	function init()
	{
		console.log('initing');
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
					Zeega.page.player.pause();
					break;
				case 'page':
					Zeega.page.exit();
					break;
				case 'player':
					Zeega.page.exit();
					break;
				case 'resume':
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
		// make and ` itemCollection
		var itemCollectionsCollection = new Grid.Collections.ItemCollections();
		loadingSpinner.show('Takeouts');
		itemCollectionsCollection.fetch().success(function(){
			generateGrid( itemCollectionsCollection, 'collections' );
			$('#app-base').append( Zeega.grid.el );
			loadingSpinner.hide();
		});
	}


	return Router;

});
