(function($){
	$.fn.maxLength = function(options){
		var defaults = {
			onEdit: function(){}
			, onLimit: function(){}
		}, s = $.extend({}, defaults, options);
		
		return this.each(function(){
			var o = $(this), max = parseInt(o.attr('maxlength'));
			
			o.unbind('.maxlength')
			.live('keyup.maxlength keydown.maxlength focus.maxlength input.maxlength paste.maxlength', function(){
				var val = o.val(), len = val.length;
				s.onEdit.call(this, max - len, max, val);
				if(len >= max){
					o.val(val.substr(0, max));
					s.onLimit.call(this, len, max, val);
				}
			});
		});
	}; // maxLength
	
	$(function(){
		$('[maxlength]').maxLength();
	});
})(jQuery); // jQuery.maxLength() by Stéphan Zych (monkeymonk.be)