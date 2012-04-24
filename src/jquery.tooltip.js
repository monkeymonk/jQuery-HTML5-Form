(function($){
	$.fn.tooltip = function(method){
		var defaults = {
			
		}, s = $.extend({}, defaults, options);
		
		var methods = {
			
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Tooltip plugin!'); // trigger an error
	}; // tooltip
})(jQuery);