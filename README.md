jQuery: NoScroll
================

Makes a container node unscrollable while maintaining its scroll position.
Measures the difference in size and triggers an event to maintain the original width.

Usage
-----
	// Turn scrolling off
	$('body').noscroll(true);
 
	// Turn scrolling back on
	$('body').noscroll(false);

	// Use the noscroll event to counteract the change in width
	$('body').noscroll(function (event, setting, gap) {
	    // setting is true when scrolling is turned off
	    // gap is the increase in width after changing the setting
	    $(this).css('margin-right', setting ? gap : 0);
	});
