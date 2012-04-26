(function($){
	$.fn.tooltip = function(method){
		var defaults = {
			idName: 'tooltip'
			, tip: null
			, position: null
			, offset: 15
			, onShow: function(){}
			, onHide: function(){}
		}, s = {};
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options);
				
				return this.each(function(){
					var o = $(this);
					
					methods.destroy.call(this);
					
					if(!$('#' + s.idName).length)	$('body').append('<div id="' + s.idName + '" style="left:-999em;opacity:0;"/>');
					
					o.attr({
						'data-tooltip-title': o.attr('title')
						, 'data-tooltip-position': o.attr('data-tooltip-position') || s.position
					})
					.bind({
						'mouseenter.tooltip': function(){
							methods.show.call(this);
						}
						, 'mouseleave.tooltip': function(){
							methods.hide.call(this);
						}
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
			
			show: function(){
				if(!$(this).attr('data-tooltip-title'))	methods.init.apply(this, arguments);
				
				var o = $(this), tip = arguments[0] || o.attr('title'), tooltip = $('#' + s.idName), pos;
				
				if(!tip || tip == '')	return;
				
				o.attr('data-tooltip-title', tip).removeAttr('title');
				tooltip.html(tip);
				
				pos = methods.place.call(this);
				
				tooltip.animate({pos: '+=10', opacity: 1}, 50);
			}, // show
			
			hide: function(){
				var o = $(this), tip = o.attr('data-tooltip-title'), tooltip = $('#' + s.idName);
				
				tooltip.animate({top: '-=10', opacity: 0}, 50, function(){
					$(this).css({left: '-999em'});
					o.attr('title', tip);
				});
			}, // hide
			
			place: function(){
				var o = $(this), position = arguments[0] || o.attr('data-tooltip-position'), tooltip = $('#' + s.idName)
				, win = $(window).width(), l = o.offset().left + (o.outerWidth() / 2) - (tooltip.outerWidth() / 2), t = o.offset().top - tooltip.outerHeight() - 20;
				
				if(!position){
					if(l < 0)	position = 'left';
					else if(l + tooltip.outerWidth() > win)	position = 'right';
					else if(t < 0)	position = 'top';
					else	position = 'bottom';
				}
				
				tooltip.removeClass('left top right bottom');
				
				switch(position){
					case 'left':
						l = o.offset().left - tooltip.outerWidth() - s.offset;
						t = o.offset().top + (o.outerHeight() / 2) - (tooltip.outerHeight() / 2);
						tooltip.addClass('left');
						break;
					case 'top':
						t = o.offset().top + o.outerHeight() + s.offset;
						tooltip.addClass('top');
						break;
					case 'right':
						l = o.offset().left + o.outerWidth() + s.offset;
						t = o.offset().top + (o.outerHeight() / 2) - (tooltip.outerHeight() / 2);
						tooltip.addClass('right');
						break;
					case 'bottom':
						tooltip.addClass('bottom');
					default:
						break;
				}
				
				tooltip.css({left: l, top: t});
				
				return position;
			} // place
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); // call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments); // call the initialization method
		else	$.error('Method "' + method + '" does not exist in Tooltip plugin!'); // trigger an error
	}; // tooltip
	
	$(function(){
		$('.tooltip').tooltip();
	});
})(jQuery); // jQuery.tooltip by Stéphan Zych (monkeymonk.be)