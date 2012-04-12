(function($){
	$.fn.required = function(options){
		var defaults = {
			className: 'required'
			, msg: ''
			, override: false
			, callback: function(){}
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if(!s.override && 'required' in document.createElement('input'))	return;
			
			var o = $(this);
			
			if(s.override)	o.bind('invalid', function(e){e.preventDefault();});
			s.msg = o.attr('data-required') || s.msg;
			
			o.bind('blur', function(){
				if(o.val() == '' || o.val() == o.attr('placeholder')){
					o.addClass(s.className);
					s.callback.call(this, o, s, false);
				} else {
					o.removeClass(s.className);
					s.callback.call(this, o, s, true);
				}
			})
			.closest('form')
			.bind('submit', function(){
				if(o.val() == '' || o.val() == o.attr('placeholder') || (o.attr('type') == '')){
					o.addClass(s.className)
					s.callback.call(this, o, s, false);
					return false;
				}
			});
		});
	};
	
	$(function(){
		$('[required]').required();
	});
})(jQuery); // jQuery.required() by Stéphan Zych (monkeymonk.be)