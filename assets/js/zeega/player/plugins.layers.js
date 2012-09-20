var layerTypes = [
	'image',
	'rectangle',
	'text',
	'video',
	'audio'
];

define([
	'zeega_layers/image/image',
	'zeega_layers/rectangle/rectangle',
	'zeega_layers/text/text',
	'zeega_layers/video/video',
	'zeega_layers/audio/audio'
],
	function(
		image,
		rectangle,
		text,
		video,
		audio
	)
	{
		eval('var Plugins = _.extend('+layerTypes.toString()+')');
		return Plugins;
	}
)