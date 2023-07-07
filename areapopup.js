/**
 * jquery.areapopup.js
 * @author  takeuchi
 */

(function($){

	$.fn.areapopup = function (option) {
		option = option || {};
		option.close         = option.close || '.ap_close';
		option.animateOption = option.animateOption || {
			'duration': 300,
			'easing'  : 'swing'
		};
		option.dataKey  = option.dataKey || 'apcurrent';
		option.dataAttr = 'data-' + option.dataKey;

		var $parent = (option.parent) ? $(option.parent) : $(this[0]).offsetParent();
		var parentInfo = {
			'width' : $parent.outerWidth(),
			'height': $parent.outerHeight()
		};

		var targetHideStyle = [];

		var baseLayer  = document.createElement('div');
		baseLayer.className = 'ap_baseLayer';
		var $baseLayer = $(baseLayer);

		var baseLayerOption = {
			hide: function() {
				return $.extend(option.animateOption, {
					'complete': function(){
						$baseLayer.css('display', '');
					}
				});
			},
			show: function(){
				return $.extend(option.animateOption, {
					'complete': function(){
						$baseLayer.show();
					}
				});
			}
		};

		function hidePopup() {
			var $hideTarget = $parent.find('*[' + option.dataAttr + ']');
			var current     = $hideTarget.data(option.dataKey) - 0;

			$hideTarget.animate(targetHideStyle[current],
				$.extend(option.animateOption, {
					'complete': function(){
						$hideTarget.css('visibility', 'hidden');
					}
				})
			).removeAttr(option.dataAttr);
		}
		function hideBaseLayer() {
			$baseLayer.animate( {'opacity': 0}, baseLayerOption.hide() );
		}

		$baseLayer.on('click', function(){
			hidePopup();
			hideBaseLayer();
			return false;
		});

		$parent.append(baseLayer);

		this.each(function(i){
			var $trigger   = $(this);
			var $target    = $( $trigger.attr('href') );
			var tgPosition = $trigger.position();

			var triggerInfo = {
				'width' : $trigger.outerWidth(),
				'height': $trigger.outerHeight(),
				'top'   : tgPosition.top,
				'left'  : tgPosition.left
			};

			var targetInfo  = {
				'overflow': $target.css('overflow'),
				'width'   : $target.outerWidth(),
				'height'  : $target.outerHeight()
			};
			targetInfo.top  = Math.floor((parentInfo.height - targetInfo.height) / 2);
			targetInfo.left = Math.floor((parentInfo.width - targetInfo.width) / 2);

			targetHideStyle[i]  = $.extend(triggerInfo, {
				'opacity':  $target.css('opacity'),
				'overflow': 'hidden'
			});
			var targetShowStyle = $.extend(targetInfo, {'opacity': 1});

			$target.css(targetHideStyle[i]);

			$trigger.on('click', function(){
				$baseLayer.show().animate({
					'opacity': 1
				}, baseLayerOption.show() );

				$target.attr(option.dataAttr, i).css({
					'overflow'  : targetInfo.overflow,
					'visibility': 'visible'
				}).animate(targetShowStyle , option.animateOption);

				return false;
			});

			$target.find(option.close).on('click', function(){
				hidePopup();
				hideBaseLayer();
				return false;
			});
		});
	};

})(jQuery);
