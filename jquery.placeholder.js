(function($){
	$.fn.accordeon = function(options){
		var defaults = {
			handle: '#details-nav a', panel: '#details-content div', active: 'open'
		};
		var s = $.extend({}, defaults, options);
		
		return this.each(function(){
			$(s.handle)
			.each(function(){
				var hash = this.href.split('#')[1];
			
				if($(this).hasClass(s.active))	$('#'+hash).show();
				else	$('#'+hash).hide();
			})
			.bind('click', function(){
				var hash = this.href.split('#')[1];
				
				if($(this).hasClass(s.active))	return false;
				
				$(s.handle).removeClass(s.active);
				$(this).addClass(s.active);
				$(s.panel).hide();
				$('#'+hash).fadeIn();
				
				return false;
			});
		});
	};
})(jQuery); // jQuery('div').accordeon() by Stéphan Zych (monkeymonk.be)

(function(){
	$.fn.dropdown = function(options){
		var defaults = {
			handle: '#navigation a.dropdown', panel: 'div.dropdown', active: 'active', callback: function(){}
		};
		var s = $.extend({}, defaults, options);
		
		return this.each(function(){
			$(s.panel).hide();
			
			$(window)
			.bind('click', function(){
				$(s.handle).add(s.panel).removeClass(s.active);
				$(s.panel).hide();
			});
			
			$(s.handle)
			.bind('click', function(e){
				var hash = this.href.split('#')[1];
				e.stopImmediatePropagation();
				
				s.callback.call(this, $(this), $('#'+hash), s);
				
				if($(this).hasClass(s.active)){
					$(window).trigger('click');
					
					return false;
				}
				
				$(s.handle).add(s.panel).removeClass(s.active);
				$(this).add('#'+hash).addClass(s.active);
				$('#'+hash).show();
				
				return false;
			});
			
			$(s.panel)
			.bind('click', function(e){
				e.stopImmediatePropagation();
			});
		});
	};
})(jQuery); // jQuery('ul').dropdown() by Stéphan Zych (monkeymonk.be)

(function($){
	$.fn.fullscreen = function(options){
		var defaults = {
			src: '', callback: function(){}
		};
		var s = $.extend({}, defaults, options);
		var adjust = function(o){
			var max = {w: $(document).width(), h: $(document).height()},
			img = {w: o.width(), h: o.height()},
			ratio = {img: img.w/img.h, win: max.w/max.h};
			
			if(ratio.win > ratio.img){
				o.css({width: max.w, height: Math.round(max.w/ratio.img)});
			} else {
				o.css({width: Math.round(max.h*ratio.img), height: max.h});
			}
			
			s.callback.call(this, o, max, img, ratio);
		};
		
		return this.each(function(){
			!!$(this).find('img').length || $(this).append('<img src="' + s.src + '" />');
			
			$(this).css({height: '100%', overflow: 'hidden'})
			.find('img')
			.one('load', function(){
				var t = $(this);
				
				$(window)
				.resize(function(){adjust(t);})
				.trigger('resize');
			})
			.each(function(){
				if(this.complete)	$(this).trigger('load');
				else	this.src = this.src;
			});
		});
	};
})(jQuery); // jQuery('.background').fullscreen() by Stéphan Zych (monkeymonk.be)

(function($){
	$.fn.placeholder = function(){
		return this.each(function(){
			var field = $(this),
					label = $('label[for="'+$(this).attr('id')+'"]'); // IE6 support
			
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