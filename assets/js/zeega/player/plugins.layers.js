var layerTypes = [
	'image',
	'rectangle',
	'text',
	'video'
];

define([
	'zeega_layers/image/image',
	'zeega_layers/rectangle/rectangle',
	'zeega_layers/text/text',
	'zeega_layers/video/video'
],
	function(
		image,
		rectangle,
		text,
		video
	)
	{
		eval('var Plugins = _.extend('+layerTypes.toString()+')');
		return Plugins;
	}
)