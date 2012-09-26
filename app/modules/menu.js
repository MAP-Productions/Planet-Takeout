define([
	"zeega",
	// Libs
	"backbone",
	'libs/modernizr',
	// Plugins
	'zeega_player',
	'libs/leaflet'
],

function(Zeega, Backbone)
{

	// Create a new module
	var App = Zeega.module();


	App.Collections = {};

	App.Views.Menu = App.Views._Page.extend({
		template: 'menu',
		className: 'PT-menu',
		initialize : function()
		{
			var _this=this;
			this.collection = new App.Collections.MenuItems();
			this.collection.fetch().success(function(response){
				_this.loadMenu();
			});
		},

		loadMenu :function()
		{
			var n = 0;
			var t = 0;
			this.collection.each(function(item){
				var wrapper = false;  
				if(_.include(item.get('tags'),'pt_tidbits'))
				{        
					if(_.include(item.get('tags'),'pt_feature')) wrapper= $('#feature-tidbits');
					else
					{
						t++;
						if(t<5) wrapper=	$('#all-tidbits-one');
						else wrapper=	$('#all-tidbits-two');
					}
				}
				else if(_.include(item.get('tags'),'pt_housespecial')) wrapper= $('#house-special');
				else if(_.include(item.get('tags'),'pt_neighborhood'))
				{
					n++;
					if(n<7) wrapper=	$('#neighborhood-one');
					else  wrapper=	$('#neighborhood-two');
				}
				if(wrapper)wrapper.append(_.template('<li style="display:none;"><a href="/collections/<%=id%>/"><%=title %></a><span><%= child_items_count %></span></li>', item.toJSON()));
			});

			$('.PT-menu li').fadeIn('fast');
		}
	});

	App.Collections.MenuItems = Backbone.Collection.extend({
		url: function()
		{
			return localStorage.api + '/items/46082/items';
		},

		parse : function(res){  return res.items; }
	});

	// Required, return the module for AMD compliance
	return App;
});
