jQuery(document).ready(function($){

	// scroll for projects link
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop:  target.offset().top + 4
	            }, 1000);
	            return false;
	        }
	    }
	});

	$("#CV-link.box-toggle").on('click', function () {
		if ($('div.publications-content').hasClass('active')) {
			$('div.publications-content').slideToggle(800);
			$('div.publications-content').removeClass('active');
		}
	    $('div.CV-content').slideToggle(1000);
	    if ($('div.CV-content').hasClass('active')) {
			$('div.CV-content').removeClass('active');
		} else {
			$('div.CV-content').addClass('active');
		}
	});
	$("#publications-link.publications-toggle").on('click', function () {
		if ($('div.CV-content').hasClass('active')) {
			$('div.CV-content').slideToggle(800);
			$('div.CV-content').removeClass('active');
		}
	    $('div.publications-content').slideToggle(1000);
	   	if ($('div.publications-content').hasClass('active')) {
			$('div.publications-content').removeClass('active');
		} else {
			$('div.publications-content').addClass('active');
		}
	});
});