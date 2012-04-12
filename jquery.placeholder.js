(function($){
	$.fn.placeholder = function(options){
		var defaults = {className: 'placeholder'}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if('placeholder' in document.createElement('input'))	return;
			
			var o = $(this), value = o.attr('placeholder');
			
			if(this.type == 'password'){
				var l = o.offset().left, t = o.offset().top;
				
				o.bind('focusin', function(){
					$(this).next('span.' + s.className).hide();
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).next('span.' + s.className).show();
				})
				.after('<span class="' + s.className + '">' + value + '</span>')
				.next('span.' + s.className)
				.css({left: l, position: 'absolute', top: t})
				.bind('click', function(){o.focus();});
			} else {
				o.bind('focusin', function(){
					if($(this).val() == value)	$(this).removeClass(s.className).val('');
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).addClass(s.className).val(value);
				})
				.val(value).addClass(s.className);
			}
			
			o.submit(function(){
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