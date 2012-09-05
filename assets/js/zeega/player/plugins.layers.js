var layerTypes = [
	'image',
	'rectangle',
	'text'
];

define(
	_.map(layerTypes,function(type){ return 'zeega_layers/'+type+'/'+type; }),
	function(
		image,
		rectangle,
		text
	)
	{
		eval('var Plugins = _.extend('+layerTypes.toString()+')');
		return Plugins;
	}
)