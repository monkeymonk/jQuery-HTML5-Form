(function($){
	$.fn.placeholder = function(options){
		var defaults = {
			className: 'placeholder'
			, override: false
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if(!s.override && 'placeholder' in document.createElement('input'))	return;
			
			var o = $(this), form = o.closest('form');
			
			if(o.is('[placeholder]:not(:password, :button, :submit, :radio, :checkbox, select, :file)')){
				var value = o.attr('placeholder');
				
				o
				.bind('focusin', function(){
					if($(this).val() == value)	$(this).removeClass('placeholder').val('');
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).addClass('placeholder').val(value);
				})
				.val(value).addClass('placeholder');
			}
			
			if(o.is('select')){
				var value = o.attr('placeholder');
				
				o
				.bind('focusin', function(){
					if($(this).val() == value)	$(this).removeClass('placeholder');
				})
				.bind('focusout', function(){
					if($(this).val() == value || $(this).val() == '')	$(this).addClass('placeholder');
				})
				.addClass('placeholder');
			}
			
			if(o.is('[placeholder]:password')){
				var l = o.offset().left, t = o.offset().top, value = o.attr('placeholder');
				
				o
				.bind('focusin', function(){
					$(this).next('span.placeholder').hide();
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).next('span.placeholder').show();
				})
				.after('<span class="placeholder">' + value + '</span>')
				.next('span.placeholder')
				.css({
					left: l, position: 'absolute', top: t
				})
				.bind('click', function(){o.focus();});
			}
			
			form.bind('submit', function(){
				$(this).find('[placeholder]')
				.each(function(){
					if($(this).val() == $(this).attr('placeholder'))	$(this).val('');
				});
			});
		});
	};
	
	$(function(){
		$('[placeholder]').placeholder();
	});
})(jQuery); // jQuery.placeholder() by Stéphan Zych (monkeymonk.be)