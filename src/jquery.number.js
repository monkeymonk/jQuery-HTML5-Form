(function($){
	$.fn.number = function(method){
		var defaults = {
			min: null
			, max: null
			, step: null
			//, mousewheel: true
			//, mouseIncrement: 'slow'
			, upIcon: 'number-up'
			, downIcon: 'number-down'
		}, s = {};
		
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				return this.each(function(){
					var test = document.createElement('input');
					test.setAttribute('type', 'number');
					
					if(test.type == 'number')	return;
					
					var o = $(this);
					
					s.min = s.min || parseInt(o.attr('min'));
					s.max = s.max || parseInt(o.attr('max'));
					s.step = s.step || parseInt(o.attr('step'));
					
					o.wrap('<div class="number"/>')
					.after('<a class="' + s.upIcon + '" href="#up">Up</a><a class="' + s.downIcon + '" href="#down">Down</a>')
					.bind('keyup blur', function(){
						var value = parseInt(o.val()) || 0;debug(value);
						if(value > s.max)	value = s.max;
						if(value < s.min)	value = s.min;
						o.val(value);
					})
					.next('.' + s.upIcon).bind('click', function(e){
						e.preventDefault();
						methods.stepUp.apply(o, e);
					})
					.next('.' + s.downIcon).bind('click', function(e){
						e.preventDefault();
						methods.stepDown.apply(o, e);
					});
				});
			}, // init
			
			stepUp: function(val){
				var value = val || ((parseInt($(this).val()) || 0) + s.step);
				if(value > s.max)	value = s.max;
				$(this).val(value);
			}, // stepUp
			up: function(){
				methods.stepUp.apply(this, arguments);
			}, // up (alias)
			
			stepDown: function(val){
				var value = val || ((parseInt($(this).val()) || 0) - s.step);
				if(value < s.min)	value = s.min;
				$(this).val(value);
			}, // stepDown
			down: function(){
				methods.stepDown.apply(this, arguments);
			} // down (alias)
		}; // methods
		
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Number plugin!'); // trigger an error
	}; // number
	
	$(function(){
		$('[type="number"]').number();
	});
})(jQuery); // jQuery.number() by Stéphan Zych (monkeymonk.be)