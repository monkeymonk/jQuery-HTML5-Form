(function($){
	$.fn.placeholder = function(options){
		var defaults = {
			className: 'placeholder'
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			if(!!('placeholder' in document.createElement('input')))	return;
			
			var o = $(this);
			
			$.each($('[placeholder]:not(:password, :button, :submit, :radio, :checkbox, select)', o), function(){
				var value = $(this).attr('placeholder');
				
				$(this)
				.bind('focusin', function(){
					if($(this).val() == value)	$(this).removeClass('placeholder').val('');
				})
				.bind('focusout', function(){
					if($(this).val() == '')	$(this).addClass('placeholder').val(value);
				})
				.val(value).addClass('placeholder');
			});
			
			
			$.each($('[placeholder]:password', o), function(){
				var field = $(this), l = field.offset().left, t = field.offset().top, value = field.attr('placeholder');
				
				field
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
				.bind('click', function(){field.focus();});
			});
			
			
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