define([
	"zeega",
	// Libs
	"backbone",
	
	'libs/spin'
],

function(Zeega, Backbone,spin)
{

	// Create a new module
	var App = Zeega.module();

	App.show = function() {
		console.log('spinner show');
		$('#loading')
			.show()
			.children('#spinner').spin('pt','#fff');
	};

	App.hide = function() {
		console.log('spinner hide');
		$('#loading')
			.hide()
			.children('#spinner').spin(false);
	};

	// Required, return the module for AMD compliance
	return App;
});
