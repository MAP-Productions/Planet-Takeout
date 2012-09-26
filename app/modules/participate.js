define([
	"zeega",
	// Libs
	"backbone",
	//submodules
	'modules/submodules/modals',

	//libraries
	'libs/modernizr',
	'libs/leaflet',
	// Plugins
	'zeega_player'
],

function(Zeega, Backbone, Modal)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};


	// model for new takeout data (via 'participate')
	App.NewTakeoutModel = Backbone.Model.extend({
		url : "takeout.php",
		defaults : {
			tags:  "pt_takeout",
			media_type:'Collection',
			layer_type:'Dynamic',
			attribution_uri: 'default',
			child_items_count:0,
			archive:'Planet Takeout',
			user_id:760,
			uri:"default"
		}
	});

	App.Views.Participate = Modal.Views.TabbedModal.extend({
		template: 'participate-0',

		initialize: function()
		{
			this.events = _.extend({},this.events, App.Views.TabbedModal.prototype.events);
			_.bindAll(this, 'render', 'geoLookup', 'initAddTakeout', 'showStreetView', 'saveStreetView', 'initKeepInTouch');
			this.model = new App.NewTakeoutModel();
			this.geocoder = new google.maps.Geocoder();
			this.newTakeoutStreetView=false;
		},

		events:
		{
			'click ul.info-tab-icons li': 'switchInfoTab',
			'click #addTakeoutTab': 'initAddTakeout',
			'click #keepInTouchTab': 'initKeepInTouch',
			'click #saveTakeout': 'saveStreetView',
			'click #PT-newtakout-search-submit' : 'lookup'
		},

		switchInfoTab: function(e)
		{
			var clicked = $(e.target),
			defaultTab = $(e.target).parent().siblings('.info-tab.default'),
			tabs = $(e.target).parent().siblings('.info-tab.media');

			if (clicked.hasClass('active')) {
				clicked.removeClass('active');
				tabs.hide();
				defaultTab.show();
			}
			else
			{
				clicked
					.addClass('active')
					.siblings().removeClass('active');
					tabs
					.eq(clicked.index()).show()
					.siblings('.info-tab').hide();
			}
		},

		initAddTakeout: function()
		{
			var _this=this;
			var mapOptions = {
				center: new google.maps.LatLng(42.354485,-71.061802),
				zoom: 13,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				streetViewControl:false,
				mapTypeControl:false,
			};
			this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			this.marker = new google.maps.Marker({
				position: new google.maps.LatLng(42.354485,-71.061802),
				map: this.map,
			});

			this.marker.setDraggable(true);
			google.maps.event.addListener(this.marker, 'dragend', function(){
				var center = _this.marker.getPosition();
				_this.model.set({
					media_geo_lat : center.lat(),
					media_geo_lng : center.lng()
				});
				_this.newTakeoutStreetView.setPosition(center);
			});

			$('#PT-newtakout-map-search').keypress(function(e){
				if(e.which==13) _this.lookup();
			});

			if(!this.newTakeoutStreetView) this.showStreetView();
		},
    
		lookup : function(  )
		{
			
			var location = $('#PT-newtakout-map-search').val();
			var _this = this;
			this.geocoder.geocode( { 'address': location}, function(results, status) {
				if ( status == google.maps.GeocoderStatus.OK )
				{
					if( _this.map.getStreetView().getVisible() ) _this.map.getStreetView().setVisible( false );
					var center = results[0].geometry.location;
					_this.map.setCenter( center );
					_this.marker.setPosition(center);
					_this.newTakeoutStreetView.setPosition(center);
					
					_this.model.set({
						media_geo_lat : center.lat(),
						media_geo_lng : center.lng()
					});
					
					console.log('new geocoded location')
				}
				else console.log("Geocoder failed at address look for "+ $('#PT-newtakout-map-submit').val()+": " + status);
			});
			
		},
    
    
    
		showStreetView: function(results)
		{
			console.log("showing street view");
			var viewOptions = {
				addressControl:false,
				panControl:false,
				position:  new google.maps.LatLng(42.354485,-71.061802),
				pov: {
					heading: 34,
					pitch: 10,
					zoom: 1
				},
				zoomControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				}
			};

			this.newTakeoutStreetView =  new google.maps.StreetViewPanorama(document.getElementById("streetView"), viewOptions);

		},

		saveStreetView: function()
		{
			this.model.save({
				title: $('#takeoutName').val(),
				attributes : {
					tags:$('#takeoutName').val().split(' ').join('').split('\'').join('').toLowerCase(),
					pov: {
						heading : this.newTakeoutStreetView.getPov().heading,
						pitch : this.newTakeoutStreetView.getPov().pitch,
						streetZoom : Math.floor( this.newTakeoutStreetView.getPov().zoom )
					}
				},
				thumbnail_url:"http://cbk0.google.com/cbk?output=thumbnail&w=200&h=200&ll="+this.newTakeoutStreetView.getPosition().lat()+","+this.newTakeoutStreetView.getPosition().lng(), 
			});
			console.log(this.model);
			$(this.el)
				.find('#find').hide()
				.siblings('#thanks').show()
				.find('#takeoutName').text( this.model.get('title') );
		},

	    initKeepInTouch: function() {
	      if ( $(this.el).find('.fb-like').attr('fb-xfbml-state') !== 'rendered' ) {
	        try{
	          FB.XFBML.parse();
	        } catch(ex) {}
	      }
	    }
	    
	});

	// Required, return the module for AMD compliance
	return App;
});
