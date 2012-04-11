(function($){
	$.fn.placeholder = function(){
		return this.each(function(){
			if(!!('placeholder' in document.createElement('input')))	return;
			
			var field = $(this), value = field.attr('placeholder');
					
			field
			.bind('focusin', function(){
				if($(this).val() == value)	$(this).removeClass('placeholder').val('');
			})
			.bind('focusout', function(){
				if($(this).val() == '')	$(this).addClass('placeholder').val(value);
			})
			.val(value).addClass('placeholder');
		});
	};
	$(function(){
		$('[placeholder]').placeholder();
	});
	// ex.: <input id="email_input" name="email" type="email" value="" placeholder="your@mail.tld" />
})(jQuery); // jQuery.placeholder() by Stéphan Zych (monkeymonk.be)