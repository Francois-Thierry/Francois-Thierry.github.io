jQuery(document).ready(function($){
	// Show list items
	showCaption($('.projects-container li').eq(0));

	//open project
	$('.cd-single-project').on('click', function(){
		var selectedProject = $(this),
			toggle = !selectedProject.hasClass('is-full-width');
		if(toggle) toggleProject($(this), $('.projects-container'), toggle);
	});

	//close project
	$('.projects-container .cd-close').on('click', function(){
		toggleProject($('.is-full-width'), $('.projects-container'), false);
	});

	//scroll to project info
	$('.projects-container .cd-scroll').on('click', function(){
		$('.projects-container').animate({'scrollTop':$(window).height()}, 500); 
	});

	//update title and .cd-scroll opacity while scrolling
	$('.projects-container').on('scroll', function(){
		window.requestAnimationFrame(changeOpacity);
	});

	function toggleProject(project, container, bool) {
		if(bool) {
			//expand project
			container.addClass('project-is-open');
			project.addClass('is-full-width').siblings('li').removeClass('is-loaded');
		} else {
			//check media query
			var mq = window.getComputedStyle(document.querySelector('.projects-container'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, ""),
				delay = ( mq == 'mobile' ) ? 100 : 0;

			container.removeClass('project-is-open');
			//fade out project
			project.animate({opacity: 0}, 800, function(){
				project.removeClass('is-loaded');
				$('.projects-container').find('.cd-scroll').attr('style', '');
				setTimeout(function(){
					project.attr('style', '').removeClass('is-full-width').find('.cd-title').attr('style', '');
				}, delay);
				setTimeout(function(){
					showCaption($('.projects-container li').eq(0));
				}, 300);
			});		
		}
	}

	function changeOpacity(){
		var newOpacity = 1- ($('.projects-container').scrollTop())/300;
		$('.projects-container .cd-scroll').css('opacity', newOpacity);
		$('.is-full-width .cd-title').css('opacity', newOpacity);
		//Bug fixed - Chrome background-attachment:fixed rendering issue
		$('.is-full-width').hide().show(0);
	}

	function showCaption(project) {
		if(project.length > 0 ) {
			setTimeout(function(){
				project.addClass('is-loaded');
				showCaption(project.next());
			}, 150);
		}
	}
		var visionTrigger = $('.cd-3d-trigger'),
		galleryItems = $('.no-touch #cd-gallery-items').children('li'),
		galleryNavigation = $('.cd-item-navigation a');

	//on mobile - start/end 3d vision clicking on the 3d-vision-trigger
	visionTrigger.on('click', function(){
		$this = $(this);
		if( $this.parent('li').hasClass('active') ) {
			$this.parent('li').removeClass('active');
			hideNavigation($this.parent('li').find('.cd-item-navigation'));
		} else {
			$this.parent('li').addClass('active');
			updateNavigation($this.parent('li').find('.cd-item-navigation'), $this.parent('li').find('.cd-item-wrapper'));
		}
	});

	//on desktop - update navigation visibility when hovering over the gallery images
	galleryItems.hover(
		//when mouse enters the element, show slider navigation
		function(){
			$this = $(this).children('.cd-item-wrapper');
			updateNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0), $this);
		},
		//when mouse leaves the element, hide slider navigation
		function(){
			$this = $(this).children('.cd-item-wrapper');
			hideNavigation($this.siblings('nav').find('.cd-item-navigation').eq(0));
		}
	);

	//change image in the slider
	galleryNavigation.on('click', function(){
		var navigationAnchor = $(this);
			direction = navigationAnchor.text(),
			activeContainer = navigationAnchor.parents('nav').eq(0).siblings('.cd-item-wrapper');
		
		( direction=="Next") ? showNextSlide(activeContainer) : showPreviousSlide(activeContainer);
		updateNavigation(navigationAnchor.parents('.cd-item-navigation').eq(0), activeContainer);
	});

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

	// $("#about-link").click(function(){
 //                $("body").load("about-me.html");
 //                $("body").append('<a id="close-link" href="#repositories-overview" class="cd-close cd-img-replace"></a>')
 //                document.body.innerHTML += '<div style="position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;"></div>';
                
 //            });

	// $('#about-link').bind('click',function(event){
	// 	var $anchor = $(this);
	// 	var $div = $('#about-link').closest('div[id^="about-me"]');
	// 	alert($div);
	// 	$div.load("about-me.html");
	// });

});

function showNextSlide(container) {
	var itemToHide = container.find('.cd-item-front'),
		itemToShow = container.find('.cd-item-middle'),
		itemMiddle = container.find('.cd-item-back'),
		itemToBack = container.find('.cd-item-out').eq(0);

	itemToHide.addClass('move-right').removeClass('cd-item-front').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
		itemToHide.addClass('hidden');
	});
	itemToShow.addClass('cd-item-front').removeClass('cd-item-middle');
	itemMiddle.addClass('cd-item-middle').removeClass('cd-item-back');
	itemToBack.addClass('cd-item-back').removeClass('cd-item-out');
}

function showPreviousSlide(container) {
	var itemToMiddle = container.find('.cd-item-front'),
		itemToBack = container.find('.cd-item-middle'),
		itemToShow = container.find('.move-right').slice(-1),
		itemToOut = container.find('.cd-item-back');

	itemToShow.removeClass('hidden').addClass('cd-item-front');
	itemToMiddle.removeClass('cd-item-front').addClass('cd-item-middle');
	itemToBack.removeClass('cd-item-middle').addClass('cd-item-back');
	itemToOut.removeClass('cd-item-back').addClass('cd-item-out');

	//wait until itemToShow does'n have the 'hidden' class, then remove the move-right class 
	//in this way, transition works also in the way back
	var stop = setInterval(checkClass, 100);
	
	function checkClass(){
		if( !itemToShow.hasClass('hidden') ) {
			itemToShow.removeClass('move-right');
			window.clearInterval(stop);
		}
	}
}

function updateNavigation(navigation, container) {
	var isNextActive = ( container.find('.cd-item-middle').length > 0 ) ? true : false,
		isPrevActive = 	( container.children('li').eq(0).hasClass('cd-item-front') ) ? false : true;
	(isNextActive) ? navigation.find('a').eq(1).addClass('visible') : navigation.find('a').eq(1).removeClass('visible');
	(isPrevActive) ? navigation.find('a').eq(0).addClass('visible') : navigation.find('a').eq(0).removeClass('visible');
}

function hideNavigation(navigation) {
	navigation.find('a').removeClass('visible');
}

function resizePanel() {

	width = $(window).width();
	height = $(window).height();

	mask_width = width * $('.item').length;
		
	$('#debug').html(width  + ' ' + height + ' ' + mask_width);
		
	$('#wrapper, .item').css({width: width, height: height});
	$('#mask').css({width: mask_width, height: height});
	$('#wrapper').scrollTo($('a.selected').attr('href'), 0);
		
}