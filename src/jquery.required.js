(function($){
	$.fn.required = function(method){
		var defaults = {
			className: 'required'
			, msg: 'Required field' // custom message to display (via callback), can be set by 'data-required' attribute
			, override: true // force browser to use plugin instead of HTML5 core
			, onBlur: function(settings, value, isFilled){}
			, onSubmit: function(settings, isFilled){} // return false to prevent submit
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
							var value = $(this).val();
							if(value == '' || value == $(this).attr('placeholder')){
								$(this).addClass(s.className);
								s.onBlur.call(this, s, value, false);
							} else {
								$(this).removeClass(s.className);
								s.onBlur.call(this, s, value, true);
							}
						});
					} else {
						o.bind('change.required', function(){
							var value = $(this).val(), id = $(this).attr('id');
							if($(this).attr('checked') != 'checked'){
								$(this).add('label[for="' + id + '"]').addClass(s.className);
								s.onBlur.call(this, s, value, false);
							} else {
								$(this).add('label[for="' + id + '"]').removeClass(s.className);
								s.onBlur.call(this, s, value, true);
							}
						});
					}
					
					form.attr('novalidate', 'novalidate')
					.bind('submit.required', function(){
						$(this).find('[required]')
						.each(function(){
							$(this).trigger('blur');
						});
						return s.onSubmit.call(this, s, !$(this).find('.required').length);
					});
				});
			}, // init
			
			destroy: function(){
				return $(this).each(function(){$(this).unbind('.required');});
			} // destroy
		}; // required
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments);
		else	$.error('Method "' + method + '" does not exist in Required plugin!');
	};
	
	$(function(){
		$('[required]').required();
	});
})(jQuery); // jQuery.required() by Stéphan Zych (monkeymonk.be)