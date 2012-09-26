define([
	"zeega",
	// Libs
	"backbone"
],

function(Zeega, Backbone)
{

	// Create a new module
	var App = Zeega.module();

	App.show = function() {
		console.log('spinner show');
		$('#loading').show();
	}

	App.hide = function() {
		console.log('spinner hide');
		$('#loading').hide();
	}

	// Required, return the module for AMD compliance
	return App;
});
