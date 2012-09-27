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

	App.show = function(loadingText) {
		console.log('spinner show');
		var $elem = $('#loading');
		if (loadingText) {
			$elem.find('#loadingWhat').text(loadingText);
		}
		$elem
			.show()
			.children('#spinner').spin('pt','#fff');
	}

	App.hide = function() {
		console.log('spinner hide');
		$('#loading')
			.hide()
			.find('#loadingWhat').text('')
			.siblings('#spinner').spin(false);
	}

	// Required, return the module for AMD compliance
	return App;
});
