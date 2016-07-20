jQuery(document).ready(function($){

	// $('a.panel').click(function () {

	// 	$('a.panel').removeClass('selected');
	// 	$(this).addClass('selected');
		
	// 	current = $(this);
		
	// 	$('#wrapper').scrollTo($(this).attr('href'), 1000);		
		
	// 	return false;
	// });

	// $(window).resize(function () {
	// 	resizePanel();
	// });

	

	$('#close-link').bind('click',function(event){
		var $anchor = $(this);
		$('#about-me').css({"visibility":"hidden"});
		/*
		if you want to use one of the easing effects:
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1500,'easeInOutExpo');
		 */
		// $('html, body').stop().animate({
		// 	scrollLeft: $($anchor.attr('href')).offset().left
		// }, 1000);
		// event.preventDefault();
	});

});


