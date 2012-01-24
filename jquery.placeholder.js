(function($){
	$.fn.placeholder = function(){
		return this.each(function(){
			var field = $(this),
					label = $(this).parent().find('label[for="'+$(this).attr('id')+'"]'); // IE6 support
			
			label.css({
				left: '-999em', position: 'absolute', top: '-999em'
			});
			
			if(!!('placeholder' in document.createElement('input')))	return;
			
			field.val(label.text())
			.bind('focusin', function(){
				if($(this).val() == label.text())	$(this).val('');
			})
			.bind('focusout', function(){
				if($(this).val() == '')	$(this).val(label.text());
			});
		});
	};
})(jQuery); // jQuery('input').placeholder() by Stéphan Zych (monkeymonk.be)