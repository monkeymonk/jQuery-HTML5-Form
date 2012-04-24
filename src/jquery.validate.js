(function($){
	$.fn.validate = function(method){
		var defaults = {
			override: true
			, errorClass: 'error'
			, validClass: 'valid'
			, onError: function(){}
			, onValid: function(){}
			, regex: {
				email: /^[a-zA-Z0-9.!#$%&'*+-\/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
				, url: /[a-z][\-\.+a-z]*:\/\//i
				//, tel: /^(0|+)
				//, tel: /^0[234679]{1}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/
				, ignoredTypes: /^(submit|image|button|reset)$/i
			}
		}, s = {};
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				return this.each(function(){
					if(!s.override && 'pattern' in document.createElement('input'))	return;
					
					var o = $(this), type = o.attr('type'), pattern = o.attr('pattern') || s.regex[type] || s.regex[o.attr('data-validate')], form = o.closest('form');
					
					if(pattern && !s.regex.ignoredTypes.test(o.attr('type'))){
						o.attr('pattern', pattern);
						
						o.live('invalid blur input keyup focus', function(){
							methods.validate.call(this, pattern);
						});
						
						form.bind('submit', function(){
							form.find('[pattern]').each(function(){
								methods.validate.call(this, $(this).attr('pattern'));
							});
							
							if(form.find('.error').length)	return false;
						});
					}
				});
			}, // init
			
			validate: function(pattern){
				var o = $(this), val = o.val(), ret = false;
				
				if(pattern.constructor != RegExp && typeof pattern != "function")	pattern = RegExp(pattern.replace(/^\//, '').replace(/\/$/, ''));
				else if(typeof pattern == "function")	return pattern();
				
				if(pattern.test(val)){
					if(!o.hasClass(s.validClass))	o.removeClass(s.errorClass).addClass(s.validClass);
					ret = false;
					s.onValid.call(this, o, val, s);
				} else {
					if(!o.hasClass(s.errorClass))	o.removeClass(s.validClass).addClass(s.errorClass);
					s.onError.call(this, o, val, s);
				}
				
				return ret;
			}, // validate
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Validate plugin!'); // trigger an error
	};
	
	$(function(){
		$('input, select, textarea').validate();
	});
})(jQuery);