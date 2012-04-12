(function($){
	$.fn.required = function(options){
		var defaults = {
			className: 'required'
			, msg: ''
			, override: true
			, callback: function(){}
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if(!s.override && 'required' in document.createElement('input'))	return;
			
			var o = $(this), form = o.closest('form');
			
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
			});
			
			form.attr('novalidate', '')
			.bind('submit', function(){
				if((o.is('select') && o.val() == '') || (o.is(':checkbox') || o.is(':radio')) && o.is(':not(:checked)') || o.val() == '' || o.val() == o.attr('placeholder')){
					o.addClass(s.className);
					s.callback.call(this, o, s, false);
				} else {
					o.removeClass(s.className);
					s.callback.call(this, o, s, true);
				}
				
				if(form.find('.' + s.className).length)	return false;
			});
		});
	};
	
	$(function(){
		$('[required]').required();
	});
})(jQuery); // jQuery.required() by Stéphan Zych (monkeymonk.be)