(function($){
	$.fn.tooltip = function(method){
		var defaults = {
			idName: 'tooltip'
			, tip: ''
			, onShow: function(){}
			, onHide: function(){}
		}, s = {};
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				return this.each(function(){
					var o = $(this);
					
					methods.destroy.call(this);
					
					$('body').append('<div id="' + s.idName + '" style="left:-999em;opacity:0;"/>');
					
					o.attr('data-tooltip-title', o.attr('title'))
					.bind('mouseenter.tooltip', function(){
						var tip = $(this).attr('title') || s.tip;
						
						if(!tip || tip == '')	return;
						
						methods.show.call(this, tip);
					})
					.bind('mouseleave.tooltip', function(){
						methods.hide.call(this);
					});
					
					$('#' + s.idName).bind('click.tooltip', function(){
						methods.hide.call(this);
					});
					
					$(window).bind('resize.tooltip', function(){
						methods.show.call(this);
					});
				});
			}, // init
			
			destroy: function(){
				$(this).unbind('.tooltip').removeAttr('data-tooltip-title');
			}, // destroy
			
			show: function(){debug('show');
				if(!$(this).attr('data-tooltip-title'))	methods.init.apply(this, arguments);
				
				var o = $(this), tip = arguments[0] || o.attr('title'), tooltip = $('#' + s.idName);
				
				o.attr('data-tooltip-title', tip).removeAttr('title');
				tooltip.html(tip);
				
				var win = $(window).width(), l = o.offset().left + (o.outerWidth() / 2) - (tooltip.outerWidth() / 2), t = o.offset().top - tooltip.outerHeight() - 20;
				
				if(win < tooltip.outerWidth() * 1.5)	tooltip.css({maxWidth: win / 2});
				else	tooltip.css({maxWidth: 340});
				
				if(l < 0){
					l = o.offset().left + o.outerWidth() / 2 - 20;
					tooltip.addClass('left');
				} else	tooltip.removeClass('left');
				
				if(l + tooltip.outerWidth() > win){
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
			
			hide: function(){debug('hide');
				var o = $(this), tip = o.attr('data-tooltip-title'), tooltip = $('#' + s.idName);
				
				tooltip.animate({top: '-=10', opacity: 0}, 50, function(){
					$(this).css({left: '-999em'});
					o.attr('title', tip);
				});
			} // hide
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Tooltip plugin!'); // trigger an error
	}; // tooltip
	
	$(function(){
		$('.tooltip').tooltip();
	});
})(jQuery); // jQuery.tooltip by Stéphan Zych (monkeymonk.be)