define([
	"zeega",
	// Libs
	"backbone",
	//submodules
	'modules/submodules/modals',

	'libs/leaflet'
],

function(Zeega, Backbone, Modal)
{

	// Create a new module
	var Map = Zeega.module();

	Map.Model = Modal.Model.extend({

		defaults : {
			title : 'Delicious World',
			modalTemplate: 'modal-wide'
		},

		initialize : function()
		{
			this.layout = this.getLayout();
			this.layout.setView('.PT-modal-content', new mapView() );
			$('body').append( this.layout.el );
			this.layout.render();
		}
	});

	var mapView = Backbone.LayoutView.extend({

		template: 'map',
		events: {
			'click #PT-map-submit' : 'lookup'
		},
		id: 'PT-map-wrapper',

		ptIconRed : L.icon({
			iconUrl : 'assets/img/map-marker-00.png',
			iconSize: [20,20],
			iconAnchor : [11,0]
		}),

		serialize : function(){ return {rand_id: this.randomID  }; },

		initialize : function()
		{
			if(_.isUndefined(Zeega.mapCollection)) Zeega.mapCollection = new mapItemCollection();
		},

		afterRender : function()
		{
			this.renderMap();
			this.renderCollectionMarkers();
			console.log('after map render');
		},

		renderMap : function()
		{
			var start = new L.LatLng(42.33722984357811, -71.0650634765625 );
			this.map = L.map('PT-map',{
				attributionControl:false
			}).setView(start, 12);

			L.tileLayer('http://{s}.tiles.mapbox.com/v2/mapbox.mapbox-streets/{z}/{x}/{y}.png', {
				maxZoom: 18
			}).addTo( this.map );

			//this.map.on('click', this.onMapClick);
		},

		onMapClick : function(e)
		{
			console.log(e.latlng.lat,e.latlng.lng);
		},

		renderCollectionMarkers : function()
		{
			var _this = this;

			var renderMarkers = function()
			{
				Zeega.mapCollection.each(function(item){
					item.marker = L.marker([ item.get('media_geo_latitude') || 0, item.get('media_geo_longitude') || 0 ], {icon: _this.ptIconRed} );
					item.marker.itemID = item.id;
					item.marker.addTo(_this.map);

					item.marker.on('click', function(e){ _this.onMarkerClick(e); } );
				});
			};
			
			if(Zeega.mapCollection.length>0){
				renderMarkers();
			}
			else{
				Zeega.mapCollection.fetch().success(function(){
					renderMarkers();
				});
			}
	
			$('#PT-map-search').keypress(function(e){
				if(e.which==13) _this.lookup();
			});
		},

		onMarkerClick : function(e)
		{
			console.log('clicked', e, e.target.getLatLng() );
			var item = Zeega.mapCollection.get(e.target.itemID);
			var content = new mapPopup({model:item}),
				thumbUrl;

			if(item.get('thumbnail_url').length===0){
				thumbUrl="http://maps.googleapis.com/maps/api/streetview?size=200x200&location="+item.get('media_geo_latitude')+","+item.get('media_geo_longitude')+"&fov=90&heading="+item.get('attributes').pov.heading+"&pitch="+item.get('attributes').pov.pitch+"&sensor=false";

			}
			else thumbUrl=item.get('thumbnail_url');
			this.popup = L.popup();
			this.popup.setLatLng([ e.target.getLatLng().lat, e.target.getLatLng().lng ])
				.setContent( content.render().el )
				.openOn(this.map);

			$(this.popup._wrapper).css({
				'background': 'url('+ thumbUrl +')',
				'background-size' : '100% auto'
			});
			
		},
		lookup : function(  )
		{
			var geocoder = new google.maps.Geocoder();
			var location = $('#PT-map-search').val();
			var map = this.map;
			geocoder.geocode( { 'address': location}, function(results, status) {
				if ( status == google.maps.GeocoderStatus.OK )
				{
					var center = new L.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
					map.setView( center,13,true );
				}
				else console.log("Geocoder failed at address look for "+ $('#PT-newtakout-map-submit').val()+": " + status);
			});
			
		}

	});

	var mapItemCollection = Backbone.Collection.extend({
		url: function(){ return localStorage.api + '/items/46086/items?limit=300'; },
		parse : function(res){ return res.items; }
	});

	var mapPopup = Backbone.View.extend({

		className : 'map-popup',

		render : function()
		{
			this.$el.html( _.template( this.template(), this.model.toJSON() ) );
			return this;
		},

		events : {
			'click' : 'enterCollectionViewer'
		},

		enterCollectionViewer : function()
		{
			// for some reason, the relative url wasn't working correctly. navigate works though
			Zeega.router.navigate('/collections/'+ this.model.id +'/view', {'trigger':true});
			return false;
		},

		template : function()
		{
			return '<a href="/collections/<%= id %>/view" class="enter"><img src="assets/img/arrow-straight.png" width="40px"/></a>';        
		}

	});


	// Required, return the module for AMD compliance
	return Map;
});
