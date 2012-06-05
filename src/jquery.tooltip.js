;(function($){
	$.fn.tooltip = function(method){
		var defaults = {
			idName: 'tooltip'				// id used in CSS
			, tip: null						// default message of the tooltip, if set all tooltip message will be ignored, else message could be set by `title` or `data-tooltip-title` attributes
			, event: 'hover'				// hover, click, focus
			, autoHide: false				// false, int
			, offset: 15					// offset
			, delay: 50						// animation time
			, position: null				// position of the tooltip [param = left|top|right|bottom (string)] could be set by `data-tooltip-position` attribute
			, onShow: function(){}		// callback used when a tooltip is show
			, onHide: function(){}		// callback used when a tooltip is hide
		}, s = {}
		
		var methods = {
			init: function(options){
				s = $.extend({}, defaults, options)
				
				return this.each(function(){
					var o = $(this)
					
					methods.destroy.call(this)	// destroy tooltip in case of multiple call
					
					if(!$('#' + s.idName).length)	$('body').append('<div id="' + s.idName + '" style="opacity:0;"/>')
					
					o.attr({
						'data-tooltip-title': s.tip || o.attr('title')
						, 'data-tooltip-position': o.attr('data-tooltip-position') || s.position
						, 'data-tooltip-event': o.attr('data-tooltip-event') || s.event
						, 'data-tooltip-autohide': o.attr('data-tooltip-autohide') || s.autoHide
					})
					.removeAttr('title')
					
					if(o.attr('data-tooltip-event') == 'hover'){
						o.bind({
							'mouseenter.tooltip': function(){
								methods.show.call(this)
							}
							, 'mouseleave.tooltip': function(){
								methods.hide.call(this)
							}
						})
					} else {
						o.bind(o.attr('data-tooltip-event') + '.tooltip', function(e){
							methods.show.call(this)
						})
						
						$('#' + s.idName)
						.bind('click', function(e){
							e.preventDefault()
							methods.hide.call(this)
						})
					}
					
					$('#' + s.idName).bind('click.tooltip', function(){	// closing tooltip on click
						methods.hide.call(this)
					})
					
					$(window).bind('resize.tooltip', function(){		// positionning tooltip on resize
						methods.show.call(this)
					})
				})
			}, // init
			
			destroy: function(){
				$(this).unbind('.tooltip').removeAttr('data-tooltip-title')
				$(window).unbind('.tooltip')
				if($('div#' + s.idName).length)	$('div#' + s.idName).unbind('.tooltip').remove()
			}, // destroy
			
			show: function(){
				if(!$(this).attr('data-tooltip-title'))	methods.init.apply(this, arguments)
				
				var o = $(this), tip = arguments[0] || o.attr('data-tooltip-title'), tooltip = $('#' + s.idName), autoHide = eval(o.attr('data-tooltip-autohide')), pos
				
				if(!tip || tip == '')	return
				
				methods.place.call(this)
				
				o.attr('data-tooltip-title', tip).attr('title', '').removeAttr('title')
				tooltip.empty().html(tip)
				
				tooltip.stop(true, true).animate({opacity: 1}, s.delay, function(){
					if(!!autoHide)	window.timer = setTimeout(function(){methods.hide.call(this)}, (parseInt(autoHide) || 3000));
				})
				
				s.onShow.call(o, tip, tooltip)
			}, // show
			
			hide: function(){
				var o = $(this), tip = o.attr('data-tooltip-title'), tooltip = $('#' + s.idName)
				
				clearTimeout(window.timer)
				
				tooltip.css({opacity: 0})
				s.onHide.call(o, tip, tooltip)
			}, // hide
			
			place: function(){
				var o = $(this), position = arguments[0] || o.attr('data-tooltip-position'), tooltip = $('#' + s.idName)
				, win = $(window).width(), l = o.offset().left + (o.outerWidth() / 2) - (tooltip.outerWidth() / 2), t = o.offset().top - tooltip.outerHeight() - 20
				
				if(!position){
					if(l < 0)	position = 'left'
					else if(l + tooltip.outerWidth() > win)	position = 'right'
					else if(t < 0)	position = 'top'
					else	position = 'bottom'
				}
				
				tooltip.removeClass('left top right bottom').addClass(position)
				
				switch(position){
					case 'left':
						l = o.offset().left - tooltip.outerWidth() - s.offset
						t = o.offset().top + (o.outerHeight() / 2) - (tooltip.outerHeight() / 2)
						break;
					case 'top':
						t = o.offset().top + o.outerHeight() + s.offset
						break;
					case 'right':
						l = o.offset().left + o.outerWidth() + s.offset
						t = o.offset().top + (o.outerHeight() / 2) - (tooltip.outerHeight() / 2)
						break;
					case 'bottom':
					default:
						break
				}
				
				tooltip.css({left: l, top: t})
			} // place
		}; // methods
		
		if(methods[method])	return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))	// call the respective method
		else if(typeof method === 'object' || !method)	return methods.init.apply(this, arguments)			// call the initialization method
		else	$.error('Method "' + method + '" does not exist in Tooltip plugin!')									// trigger an error
	} // tooltip
	
	$(function(){
		$('.tooltip, [data-tooltip]').tooltip({
			onShow: function(tip, tooltip){
				if($(this).attr('data-tooltip-class'))	tooltip.addClass($(this).attr('data-tooltip-class'))
			}
			, onHide: function(tip, tooltip){
				tooltip.removeClass($(this).attr('data-tooltip-class'))
			}
		})
	})
})(jQuery)	// jQuery.tooltip by Stéphan Zych (monkeymonk.be)
/**
 * HTML
 * ----
 * <i data-tooltip-content="Lorem ipsum" data-tooltip-position="right" data-tooltip="true" class="ico-help" data-tooltip-width="200">Over me!</i>
 * or
 * <i class="tooltip" title="Lorem ipsum dolor sit amet">Over me!</i>
 * 
 * Javascript
 * ----------
 * $(function(){
 *		$('.tooltip, [data-tooltip]').tooltip({
 *			onShow: function(tip, tooltip){
 *				if($(this).attr('data-tooltip-class'))	tooltip.addClass($(this).attr('data-tooltip-class'))
 *			}
 *			, onHide: function(tip, tooltip){
 *				tooltip.removeClass($(this).attr('data-tooltip-class'))
 *			}
 *		})
 *	})
 * 
 */