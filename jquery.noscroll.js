/*!
 * NoScroll 0.3 (jQuery plugin)
 * Makes a container node unscrollable while maintaining its scroll position
 * Measures the difference in size and triggers an event to maintain the original width
 *
 * Usage:
 * // Turn scrolling off
 * $('body').noscroll(true);
 * 
 * // Turn scrolling back on
 * $('body').noscroll(false);
 *
 * // Use the noscroll event to counteract the change in width
 * $('body').noscroll(function (event, setting, gap) {
 *     // setting is true when scrolling is turned off
 *     // gap is the increase in width after changing the setting
 *     $(this).css('margin-right', setting ? gap : 0);
 * });
 *
 * Copyright 2012, Dennis Kehrig
 * http://github.com/DennisKehrig/jquery.noscroll
 */
/*global jQuery */
(function ($) {
	'use strict';
	
	$.fn.noscroll = function (setting_or_callback) {
		return this.each(function () {
			var $container, originalWidth, gap, previousState;

			$container = $(this);

			if ($.isFunction(setting_or_callback)) {
				// Register the callback
				$container.bind('noscroll', setting_or_callback);
			} else if (setting_or_callback === true) {
				// Turn scrolling off
				
				// Remember the scroll position so we can counteract browsers scrolling to the top when restoring the overflow state
				$container.data('noscroll', {
					top:		$container.scrollTop(),
					left:		$container.scrollLeft(),
					overflow:	$container.css('overflow')
				});
				
				// Turn scrolling off and measure the effect on the width
				originalWidth = $container.width();
				$container.css('overflow', 'hidden');
				gap = $container.width() - originalWidth;
				
				// Trigger the noscroll event
				$container.trigger('noscroll', [true, gap]);
			} else if (setting_or_callback === false) {
				// Turn scrolling back on
				
				previousState = $container.data('noscroll');
				if (previousState) {
					// Turn scrolling back on and measure the effect on the width
					originalWidth = $container.width();
					$container.css('overflow', previousState.overflow);
					gap = $container.width() - originalWidth;
					
					// Trigger the noscroll event
					$container.trigger('noscroll', [false, gap]);
				
					// Restore the scroll position
					$container
						.scrollTop(previousState.top)
						.scrollLeft(previousState.left);
				}
			}
		});
	};
}(jQuery));
