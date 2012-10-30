define([
	"zeega",
	// Libs
	"backbone",
	//submodules
	'modules/submodules/modals'
],

function(Zeega, Backbone, Modal)
{
	// Create a new module
	var Menu = Zeega.module();

	Menu.Model = Modal.Model.extend({

		defaults : {
			title : 'Menu',
			modalTemplate : 'modal-wide'
		},

		initialize : function()
		{
			this.layout = this.getLayout();
			this.layout.setView('.PT-modal-content', new menuView() );
			this.layout.render();
			$('body').append( this.layout.el );
		}
	});

	var menuView = Backbone.LayoutView.extend({
		
		template: 'menu',
		className: 'PT-menu',

		initialize : function()
		{
			

			if(_.isUndefined(Zeega.menuCollection))Zeega.menuCollection = new menuItemCollection();

		},
		afterRender:function(){

			var _this=this;
			if(Zeega.menuCollection.length>0){
				_.delay(function(){_this.loadMenu();},10);
			}
			else{
				Zeega.menuCollection.fetch().success(function(collection,response){
					_this.loadMenu();
				});
			}
		},

		loadMenu :function()
		{
			var n = 0,
				t = 0,
				wrapper =-1,
				_this=this;
			Zeega.menuCollection.each(function(item){
				wrapper=-1;
				if(_.include(item.get('tags'),'pt_tidbits'))
				{
					if(_.include(item.get('tags'),'pt_feature')) wrapper= _this.$el.find('#feature-tidbits');
					else
					{
						t++;
						if(t<5) wrapper=	_this.$el.find('#all-tidbits-one');
						else wrapper=	_this.$el.find('#all-tidbits-two');
					}
				}
				//else if(_.include(item.get('tags'),'pt_housespecial')) wrapper= $('#house-special');
				else if(_.include(item.get('tags'),'pt_neighborhood'))
				{
					n++;
					if(n<7) wrapper=	_this.$el.find('#neighborhood-one');
					else  wrapper=	_this.$el.find('#neighborhood-two');
				}
				if(wrapper!=-1){
					console.log(wrapper);
					wrapper.append(_.template('<li style="display:none;"><a href="/collections/<%=id%>/"><%=title %></a><span><%= child_items_count %></span></li>', item.toJSON()));
					console.log('!!!!!!!!!!!!!addding thigns!!!!');
				}
			});

			$('.PT-menu li').fadeIn('fast');
		}
	});

	var menuItemCollection = Backbone.Collection.extend({
		url: function()
		{
			return localStorage.api + '/items/46082/items?r_counts=1';
		},

		parse : function(res){  return res.items; }
	});

	// Required, return the module for AMD compliance
	return Menu;
});
