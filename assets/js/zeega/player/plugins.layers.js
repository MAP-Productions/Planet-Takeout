var layerTypes = [
	'image',
	'rectangle',
	'text',
	'video'
];

define(
	_.map(layerTypes,function(type){ return 'zeega_layers/'+type+'/'+type; }),
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