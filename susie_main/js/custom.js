( function($) {
$(document).ready(function () {
  
	"use strict";
	
	/* Setting Sizes 
	-----------------------------------------------------*/
	
	function setSizes() {
		
		/* General */
		$('.logo-content').css({'margin-top': '-'+($('.logo-content').height()/2)+'px'});
		
		/* Profile */
		$('#' + site_data.profile_page_anchor).css({'height': ($(window).height()) + 'px'});
		$('.profile-content').css({'margin-top': '-'+($('.profile-content').height()/2)+'px'});
		
		/* Portfolio */
		$('.project-info').css({'margin-top': '-'+($('.project-info').height()/2)+'px'});
		
		/* Contact */
		$('#' + site_data.contact_page_anchor + ', .contact-content').css({'min-height': ($(window).height()) + 'px'});
	}
	
	setSizes();
	$(window).resize(function() {
		setSizes();
	});
	
	
	/* Navigation */
	
	/*if ($('body').hasClass('single-page')) {
		$('#nav-content .menu li a').click(function(e) {
            $('#nav-content .menu li').removeClass('active');
			$(this).addClass('active');
        });	
	}*/
	
	$('#comment-btn').addClass('btn btn-primary');
	
	$('#page-content section').waypoint(function(direction) {
	  if(direction=='down') {
		  
		  var sectionName = '#'+$(this).attr('id');
		  var menuLink = $('.me-nav li').children('a').attr('href');
		  var activeLink = $('.me-nav li.active');
		  
		  var newLink = $('li.menu-item a[href="' + site_data.site_url + '/' + sectionName + '"]');
		  
		  $(activeLink).removeClass('active');
		  $(newLink).parent('li').addClass('active');
		  
	  }
	},{ offset: 1 });
	
	$('#page-content section').waypoint(function(direction) {
	  if(direction=='up') {
		  
		  var sectionName = '#'+$(this).attr('id');
		  var menuLink = $('.me-nav li').children('a').attr('href');
		  var activeLink = $('.me-nav li.active');
		  
		  var newLink = $('li.menu-item a[href="' + site_data.site_url + '/' + sectionName + '"]');
		  
		  $(activeLink).removeClass('active');
		  $(newLink).parent('li').addClass('active');
		  
		  //console.log('SN: '+sectionName+' M: '+newLink);
	  }
	},{ offset: function() {
		  return -$(this).height()+1;
		}
	  });
	
	/* Resume
	-----------------------------------------------------*/
	
	$('.resume-box').mouseenter(function(){
		$('.resume-box').not(this).each(function() {
            $(this).addClass('disable');
        });
	});
	
	$('.resume-box').mouseleave(function(){
		$('.resume-box').each(function() {
            $(this).removeClass('disable');
        });
	});
	
	/* Blog 
	-----------------------------------------------------*/
	
	// Post Carousel
	
	$(".post-carousel").owlCarousel({
		
		// Most important owl features
		items : false,
		itemsCustom : [[1600,3],[991,2],[0,1]],
		itemsDesktop : false,
		itemsDesktopSmall : false,
		itemsTabletSmall: false,
		itemsMobile : false,
		singleItem : false,
		itemsScaleUp : false,
		slideSpeed : 600,
		paginationSpeed : 800,
		rewindSpeed : 1000,
		navigation : false,
		scrollPerPage : true,
		pagination : true,
		theme : "carousel-theme"
		
	});
	
	var owl = $(".owl-carousel").data('owlCarousel');
	
	$('.post-carousel-next').click(function() {
		owl.next();
		return false;
	});
	
	$('.post-carousel-prev').click(function() {
		owl.prev();
		return false;
	});

	// Post Carousel

	$(".blog-slider").owlCarousel({
		
		// Most important owl features
		items : false,
		itemsCustom : false,
		itemsDesktop : false,
		itemsDesktopSmall : false,
		itemsTabletSmall: false,
		itemsMobile : false,
		singleItem : true,
		itemsScaleUp : false,
		slideSpeed : 600,
		paginationSpeed : 800,
		rewindSpeed : 1000,
		navigation : false,
		scrollPerPage : true,
		pagination : true,
		autoPlay: true,
		theme : "slider-theme"
		
	});
	
	/* Portfolio 
	-----------------------------------------------------*/
	
	// Ajax Project Details
	
	/* Enable Touch swipe for work slider */
	$(".project-content").on('mouseover touchstart', '.carousel-inner', function() {
		$(this).trigger('swiping');
    });
 	
    $(".project-content").on('swiping', '.carousel-inner', function() {
		var $this = $(this);
		$this.swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next'); 
			},
			swipeRight: function() {
				$(this).parent().carousel('prev');
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
		});
	});
	
	var toLoad;
	
	function loadContent() {
		$('.project-content-inner').load(toLoad + ' #work-content', showNewContent);
	}
	
	function showNewContent() {
		$('.preloader').slideUp('fast', 'easeOutExpo', function () {
			$('.project-content .preloader').remove();
			$('.project-content-inner').stop().slideDown(800, 'easeInQuart', function () { $.waypoints('refresh') });
		});
	}
	
	function closeContent() {
		$('.project-content-inner').stop().slideUp(800, 'easeOutQuart',function() { $('.project-content-inner').empty(); });
		$(jQuery.browser.webkit ? "body": "html").animate({scrollTop:$('#' + site_data.portfolio_page_anchor).position().top }, 700, 'easeOutQuart');
	}
	
	$('.ajax-portfolio-link').click(function() {
		toLoad = $(this).attr('href');
		
		if ($('.project-content-inner').children().size()) {
			$(jQuery.browser.webkit ? "body": "html").animate({scrollTop:$('.project-content').position().top}, 700, 'easeInQuart');
			$('.project-content-inner').stop().slideUp(800, 'easeOutQuart', function() {
				$('.project-content-inner').empty();
				if (!$('.project-content .preloader').size()) {
					$('.project-content').prepend('<div class="preloader"><i class="fa fa-spinner fa-spin"></i></div>');
				}
				$('.preloader').slideDown('fast', 'easeOutQuart', loadContent);
			});
		}
		else {
			$(jQuery.browser.webkit ? "body": "html").animate({scrollTop:$('.project-content').position().top}, 700, 'easeInQuart', function () {
				if (!$('.project-content .preloader').size()) {
					$('.project-content').prepend('<div class="preloader"><i class="fa fa-spinner fa-spin"></i></div>');
				}
				$('.preloader').stop().slideDown('fast', 'easeOutQuart', loadContent);
			});
		}
		
		/*$('html').animate({scrollTop:$('.project-content').position().top}, 700,'easeInQuart', function () {
			$('.project-content-inner').append('<div class="preloader"><i class="fa fa-spinner fa-spin"></i></div>');
			$('.project-content-inner').slideDown('fast', 'easeOutExpo', loadContent);
		});*/
		
		return false;
	});
	
	$(document).on('click', '.ajax-project-close', function() {
		closeContent();
		return false;
	});
	
	/* Smooth Scrolling
	-----------------------------------------------------*/
	
	$.localScroll({
	});
	
	/* Contact
	-----------------------------------------------------*/
	
	$('#contact-form-holder').addClass('form-hidden');
	$('.contact-form-trigger').click(function() {
		if($('#contact-form-holder').hasClass('form-hidden')) {
			$('#contact-form-holder').removeClass('form-hidden').addClass('form-visible');
			$('.contact-form-trigger').addClass('active');
		} else
		if($('#contact-form-holder').hasClass('form-visible')) {
			$('#contact-form-holder').removeClass('form-visible').addClass('form-hidden');
			$('.contact-form-trigger').removeClass('active');
		};
	});
	
	/* Animations
	-----------------------------------------------------*/
	
	jQuery('.animated').appear();

	$('.fade-in').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('fade-in-animation') });
	});
	
	$('.fade-in-left').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('fade-in-left-animation') });
	});
	
	$('.fade-in-right').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('fade-in-right-animation') });
	});
	
	$('.slide-in-left').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('slide-in-left-animation') });
	});
	
	$('.slide-in-right').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('slide-in-right-animation') });
	});
	
	$('.slide-in-top').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('slide-in-top-animation') });
	});
	
	$('.slide-in-bottom').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('slide-in-bottom-animation') });
	});
	
	$('.zoom-in').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('zoom-in-animation') });
	});
	
	$('.zoom-out').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('zoom-out-animation') });
	});
	
	$('.bounce-in').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('bounce-in-animation') });
	});
	 
	$('.flip-in').appear(function() {
		jQuery(this).each(function(){ jQuery(this).addClass('flip-in-animation') });
	});
	
	
	/* Alpha Setting
	-----------------------------------------------------*/
	$('.editable-alpha').css({
		'opacity': ($('.editable-alpha').attr('data-alpha') / 100)
	});
	
	
	/* Check photos 
	-----------------------------------------------------*/
	function checkPhotos() {
		if($('.header-bg img, .page-title-bg img, .blog-slide-photo img').height()<$('.header-bg img, .page-title-bg img, .blog-slide-photo img').parent().height()) {
			$('.header-bg img, .page-title-bg img, .blog-slide-photo img').removeClass('too-slim');
			$('.header-bg img, .page-title-bg img, .blog-slide-photo img').addClass('too-short');
		}
		if($('.header-bg img, .page-title-bg img, .blog-slide-photo img').width()<$('.header-bg img, .page-title-bg img, .blog-slide-photo img').parent().width()) {
			$('.header-bg img, .page-title-bg img, .blog-slide-photo img').removeClass('too-short');
			$('.header-bg img, .page-title-bg img, .blog-slide-photo img').addClass('too-slim');
		}
	}

	checkPhotos();
	
	
	/* Responsive Videos
	-----------------------------------------------------*/
	$(function(){
	  $('body').fitVids();
	});
	
	
	/* Google Map
	-----------------------------------------------------*/
	function mapInitialize() {
		
		var mapDark =  [
			{
				"stylers": [
					{
						"hue": "#ff1a00"
					},
					{
						"invert_lightness": true
					},
					{
						"saturation": -100
					},
					{
						"lightness": 33
					},
					{
						"gamma": 0.5
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#2D333C"
					}
				]
			}
		];
		
		var mapLight =  [
			{
				"featureType": "landscape",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
					"visibility": "off"
					}
				]
			},
			{
				"stylers": [
					{
						"hue": "#00aaff"
					},
					{
						"saturation": -100
					},
					{
						"gamma": 2.15
					},
					{
						"lightness": 12
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"lightness": 24
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
					{
						"lightness": 57
					}
				]
			}
		]
		
		var yourLatitude = site_data.google_map_latitude;
		var yourLongitude = site_data.google_map_longitude;
		var mapMarkerText = site_data.google_map_marker_text;
		var mapStyle = site_data.google_map_style == 'light' ? mapLight : mapDark;
		
		var locations = [
		  [mapMarkerText
		  , yourLatitude, yourLongitude, 1]
		];
	  
	    var mapColorStyle = mapDark;
	    if (mapStyle == 'light') {
			mapColorStyle = mapLight
		}
		
		var myOptions = {
			zoom: 14,
			center: new google.maps.LatLng(yourLatitude, yourLongitude-0.01),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			panControl: false,
			zoomControl: false,
			scaleControl: false,
			streetViewControl: false,
			styles: mapStyle,
		};
		
		var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
		
		var image = site_data.google_map_marker_icon;
		var myLatLng = new google.maps.LatLng(yourLatitude, yourLongitude);
		var myLocation = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image
		});
		
		var infowindow = new google.maps.InfoWindow();
		
		google.maps.event.addListener(myLocation, 'click', (function(myLocation) {
			return function() {
				infowindow.setContent(mapMarkerText);
				infowindow.open(map, myLocation);
			}
		})(myLocation));
	
	}
	
	if (document.getElementById('google-map')) {
		google.maps.event.addDomListener(window, 'load', mapInitialize);
	}

	/* Contact Form
	-----------------------------------------------------*/
	
	var $contactForm  = $('#contact-form');

    $contactForm.validate({
        rules: {
            name: {
                required    : true,
                minlength   : 1
            },
            email: {
                required    : true,
                email       : true
            },
            message: {
                required    : true,
                minlength   : 10
            }
        },
        messages: {
            name: {
                required    : "Please enter your name."
            },
            email: {
                required    : "Please enter your email address."
            },
            message: {
                required    : "Please enter a message."
            }
        }
    });

    // Send the email
    $contactForm.submit(function(){
        var $success = '<strong>Success!</strong> Your message was sent.';
	    var $error = '<strong>Error!</strong> Your message was not sent - try again later...';
      	var response;
        if ($contactForm.valid()) {
            $.ajax({
                type: 'POST',
				dataType: 'json',
                url: site_data.ajax_url,
                data: $(this).serialize(),
                success: function(data) {
                    if (data.status == "success") {
                        response = '<div class="alert alert-success">'+ $success +'</div>';
                    }
                    else {
                        response = '<div class="alert alert-warning">'+ $error +'</div>';
                    }
					
                    $(".alert-warning, .alert-success").remove();
                    $contactForm.prepend(response);
                }
             });
            return false;
        }
        return false;
    });

});

} ) ( jQuery );

// Tooltip Initialize 
function tooltipIni() {
	$("[rel='tooltip']").tooltip();
}

// Popover Initialize 
function popoverIni() {
	$("[rel='popover']").popover();
}

