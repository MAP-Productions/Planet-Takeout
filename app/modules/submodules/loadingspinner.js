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
		var $elem = $('#loading');
		if (loadingText) {
			$elem.find('#loadingWhat').text(loadingText);
		}
		$elem
			.show()
			.children('#spinner').spin('pt','#fff');
	};

	App.hide = function() {
		$('#loading')
			.hide()
			.children('#spinner').spin(false);
	};

	// Required, return the module for AMD compliance
	return App;
});
