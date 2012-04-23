(function($){
	$.fn.required = function(method){
		var defaults = {
			className: 'required'
			, msg: '' // custom message to display (via callback), can be set by 'data-required' attribute
			, override: true // force browser to use plugin instead of HTML5 core
			, onBlur: function(){}
			, onSubmit: function(){}
		}, s = {};
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				if(!s.override && 'required' in document.createElement('input'))	return;
				
				return this.each(function(){
					var o = $(this), form = o.closest('form');
					
					methods.destroy.call(this);
					
					if(s.override)	o.unbind('invalid').bind('invalid.required', function(e){e.preventDefault();});
					s.msg = o.attr('data-required') || s.msg;
					
					if(o.is('[required]:not(:checkbox, :radio)')){
						o.bind('blur.required', function(){
							if($(this).val() == '' || $(this).val() == $(this).attr('placeholder')){
								$(this).addClass(s.className);
								s.onBlur.call(this, $(this), s, false);
							} else {
								$(this).removeClass(s.className);
								s.onBlur.call(this, $(this), s, true);
							}
						});
					} else {
						o.bind('change.required', function(){
							if($(this).attr('checked') != 'checked'){
								$(this).addClass(s.className);
								s.onBlur.call(this, $(this), s, false);
							} else {
								$(this).removeClass(s.className);
								s.onBlur.call(this, $(this), s, true);
							}
						});
					}
					
					form.attr('novalidate', 'novalidate')
					.bind('submit.required', function(){
						var o = $(this);
						
						o.find('[required]')
						.each(function(){
							$(this).trigger('blur');
						});
					});
				});
			}, // init
			
			destroy: function(){
				return this.each(function(){$(this).unbind('.required');});
			} // destroy
		};
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments);
		else	$.error('Method "' + method + '" does not exist in Number plugin!');
	};
	
	$(function(){
		$('[required]').required();
	});
})(jQuery); // jQuery.required() by Stéphan Zych (monkeymonk.be)