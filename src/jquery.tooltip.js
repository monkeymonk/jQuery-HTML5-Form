(function($){
	$.fn.tooltip = function(method){
		var defaults = {
			idName: 'tooltip'
			, text: ''
			, onShow: function(){}
			, onHide: function(){}
		}, s = {};
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				return this.each(function(){
					var o = $(this), tooltip = $('<div id="' + s.idName + '"></div>');
					
					methods.destroy.call(this);
					
					o.bind('mouseenter.tooltip', function(){
						s.text = $(this).attr('title') || s.text;
						
						if(!s.text || s.text == '')	return;
						
						$(this).removeAttr('title');
						
						if(!$('#' + s.idName).length)	tooltip.appendTo('body');
						$('#' + s.idName).css({opacity: 0}).html(s.text);
						
						methods.show.call(this);
					})
					.bind('mouseleave.tooltip', function(){
						methods.hide.call(this);
					});
					
					tooltip.bind('click.tooltip', function(){
						methods.hide.call(this);
					});
					
					$(window).bind('resize.tooltip', function(){
						methods.show.call(this);
					});
				});
			}, // init
			
			destroy: function(){
				$(this).unbind('.tooltip');
				$(window).unbind('.tooltip');
				if($('div#' + s.idName).length)	$('div#' + s.idName).unbind('.tooltip').remove();
			}, // destroy
			
			show: function(){
				var o = $(this), tooltip = $('#' + s.idName), wW = $(window).width(),
					l = o.offset().left + (o.outerWidth() / 2) - (tooltip.outerWidth() / 2), t = o.offset().top - tooltip.outerHeight() - 20;
				
				if(wW < tooltip.outerWidth() * 1.5)	tooltip.css({maxWidth: wW / 2});
				else	tooltip.css({maxWidth: 340});
				
				if(l < 0){
					l = o.offset().left + o.outerWidth() / 2 - 20;
					tooltip.addClass('left');
				} else	tooltip.removeClass('left');
				
				if(l + tooltip.outerWidth() > wW){
					l = o.offset().left - tooltip.outerWidth() + o.outerWidth() / 2 + 20;
					tooltip.addClass('right');
				} else	tooltip.removeClass('right');
				
				if(t < 0){
					t = o.offset().top + o.outerHeight();
					tooltip.addClass('top');
				} else	tooltip.removeClass('tip');
				
				tooltip.css({left: l, top: t})
				.animate({top: '+=10', opacity: 1}, 50);
			}, // show
			
			hide: function(){
				var o = $(this), tooltip = $('#' + s.idName);
				
				tooltip.animate({top: '-=10', opacity: 0}, 50, function(){
					$(this).remove();
				});
				
				o.attr('title', s.text);
			} // hide
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Tooltip plugin!'); // trigger an error
	}; // tooltip
	
	$(function(){
		$('.tooltip').tooltip();
	});
})(jQuery);