(function($){
	$.fn.inputFile = function(options){
		var defaults = {
			className: 'inputfile'
			, button: 'Upload'
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			var o = $(this), placeholder = o.attr('placeholder') || '';
			
			o.wrap('<div class="' + s.className + '" style="overflow:hidden;position:relative;"></div>')
			.before('<input class="' + s.className + '-field" type="text" value="" placeholder="' + placeholder + '" /><button class="' + s.className + '-btn" type="button" style="position:relative;z-index:1;">' + s.button + '</button>')
			.css({
				left: 0, opacity: 0, position: 'absolute', top: 0, zIndex: 0
			})
			.bind('change', function(){
				$(this).parent().find('.' + s.className + '-field')
				.val($(this).val());
			})
			.parent().find('.' + s.className + '-btn')
			.bind('click', function(e){
				e.preventDefault();
				o.click();
			});
		});
	}; // inputFile
	
	$(function(){
		$('[type="file"]').inputFile();
	});
})(jQuery); // jQuery.inputFile() by Stéphan Zych (monkeymonk.be)