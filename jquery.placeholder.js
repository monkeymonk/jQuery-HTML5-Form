(function($){
	$.fn.placeholder = function(options){
		var defaults = {
			className: 'placeholder'
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if(!!('placeholder' in document.createElement('input')))	return;
			
			var o = $(this);
			
			if(o.attr('type') == 'password' && o.attr('placeholder')){
				var field = $(this), l = field.offset().left, t = field.offset().top, value = field.attr('placeholder');
				
				field
				.bind('focusin', function(){
					$(this).next('input.pwd.' + s.className).hide();
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).next('input.pwd.' + s.className).show();
				})
				.after('<input class="pwd ' + s.className + '" type="text" value="' + value + '" readonly />')
				.next('input.pwd.' + s.className)
				.css({
					left: l, position: 'absolute', top: t
				})
				.bind('click', function(){field.focus();});
			} else if((o.attr('type') || o.get(0).tagName).match(/(text|email|tel|number|range|textarea)/i) && o.attr('placeholder')){
				var value = $(this).attr('placeholder');
				
				$(this)
				.bind('focusin', function(){
					if($(this).val() == value)	$(this).removeClass(s.className).val('');
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).addClass(s.className).val(value);
				})
				.val(value).addClass(s.className);
			}
			
			
			o.bind('submit', function(){
				var submit = true;
				
				$(this).find('[placeholder]')
				.each(function(){
					if($(this).val() == $(this).attr('placeholder')){
						$(this).val('');
						submit = false;
					}
				});
				
				return submit;
			});
		});
	};
	
	$(function(){
		$('[placeholder]').placeholder();
	});
})(jQuery); // jQuery.placeholder() by Stéphan Zych (monkeymonk.be)