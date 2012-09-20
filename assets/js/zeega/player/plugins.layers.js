var layerTypes = [
	'image',
	'rectangle',
	'text',
	'video',
	'audio',
	'link'
];

define([
	'zeega_layers/image/image',
	'zeega_layers/rectangle/rectangle',
	'zeega_layers/text/text',
	'zeega_layers/video/video',
	'zeega_layers/audio/audio',
	'zeega_layers/link/link'
],
	function(
		image,
		rectangle,
		text,
		video,
		audio,
		link
	)
	{
		eval('var Plugins = _.extend('+layerTypes.toString()+')');
		return Plugins;
	}
)