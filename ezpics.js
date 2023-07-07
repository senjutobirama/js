/**
 * ezPics Plugin
 * by Filip Zalamans
 *
 * www.github.com/bluesuede
 *
 */
(function($, window) {
  
  /**
   * The slideshow function
   *
   * Assumes there is a ul with the id #ezSlider
   * Inside #ezSlider there should be li elements, each containing an image
   *
   * @param array ops
   */
  $.fn.ezSlider = function(ops) {
    var
	  options = $.extend({
	    'fade': 500,
		'intervalTime': 5000,
		'height': 350,
		'dots': true,
		'bgColor': 'white',
		'squareDots': false
	  }, ops),
	  
	  amount = $(this).children().length, // amount of pictures
	  
	  dotmenu = $('<ul id="dots"></ul>'), // ul for the dots under pics
	  dothtml = '<li class="dot selected-button"><a href="#">0</a></li>', // first li in the #dots ul
	  
	  pics = $(this).children(), // objects of all li elements to the #ezSlider ul
	  dots,
	  
	  intervalID,
	  
	  intervalTime 	= options.intervalTime,
	  fade			= options.fade,
	  height		= options.height
	;
	
	// Set background color of li element
	$(this).children().css({'backgroundColor': options.bgColor});
	
	// Set max height of #ezSlides
	$(this).css({'maxHeight': height + 'px'});
	
	if(options.dots) {
	  // Make one list item for each children that #ezSlider has (minus the first one)
	  // Put in to ul #dots
	  for(i=1;i<amount;i++) {
	    dothtml += '<li class="dot unselected-button"><a href="#">' + i + '</a></li>';
	  }
	
	  // Insert the other ul, the dot menu
	  dotmenu.append(dothtml);
	  dotmenu.insertAfter($(this));
	
	  // Make sure the dots var has the proper data, its li children
	  dots = $('#dots').children();
	  
	  if(options.squareDots) {
	    dots.children().css({'borderRadius': '2px'});
	  }
	  
	  /**
	   * What is done when one of the dots are clicked
	   *
	   */
	  dots.click(function(event) {
	  
	  event.preventDefault(); // so it wont jump to top of page
	  
	  var chosenPicIndex = $(this).text(); // get value of clicked dot
	  
	  clearInterval(intervalID); // stop the interval
	  
	  // fade out the current picture
	  // fade in the picture corresponding to the clicked dot
	  fadeOutAndIn(pics.eq(chosenPicIndex));
	  
	  // Restart the interval after fade animation has been done
      setTimeout(function() {
	    makeInterval();
	  }, fade);
	  });
	
	}
	  // Give all pictures z-index 1 and opacity 1
	pics.css({'zIndex': '1', 'opacity': '1'});
	
	// Add class .seen to first image
	pics.eq(0).addClass('seen').css({'zIndex': '3', 'position': 'relative'});
	
	/**
	 * Function to change focus from one dot to another
	 *
	 * @param object currdot (the current dot), object nextdot (the dot that it is getting changed to
	 *
	 */
	function changeDotFocus(currDot, nextDot) {
	  currDot
	    .removeClass('selected-button')
		.addClass('unselected-button');
	  nextDot
	    .removeClass('unselected-button')
		.addClass('selected-button');
	}
	
	/**
	 * Function to fade out a picture, and give another picture the highest z-index
	 * If a picture is not chosen, it will automatically go to next picture in index
	 *
	 * @param optional object chosenPic
	 *
	 */
	function fadeOutAndIn(chosenPic) {
	
	  var current = $('.seen'),
	      next;
	  
	  // If parameter is empty, get index of next li in list
	  if(!chosenPic) {
	
		// If the current picture is the last li, var next will be 0
		if(current.index() === amount -1) {
		  next = 0;
		}
		// var next is the current index + 1
		else {
		  next = current.index() + 1;
		}
		
		chosenPic = pics.eq(next);
	  }
	  
	  // Only swap picture if the chosenPic is a different picture
	  if(current.index() !== chosenPic.index()) {
	  
	    // Make sure that the coming picture is under current one in stack
	    chosenPic.css({'zIndex': '2'});
	    
		if(options.dots) {
	      // Change selected dot using dots var and indexes of our two pictures
	      changeDotFocus(dots.eq(current.index()), dots.eq(chosenPic.index()));
	    }
		
	    // Fade away the current picture to opacity 0
	    current.fadeTo(fade, 0.0, function() {
		
		  // actions made when the fading is complete
		
		  current // actions done with previous picture
		    .removeClass('seen')
		    .css({'zIndex': '1', 'opacity': '1'});
		
		  chosenPic // actions done with coming picture
		    .addClass('seen')
		    .css({'zIndex': '3'});
	    });
	  }
	}
	
	/**
	 * Function to start the interval and put it in to variable intervalID
	 *
	 */
	function makeInterval() {
	  intervalID = setInterval(function() {
	    fadeOutAndIn();
	  }, intervalTime);
	}
	
	// Start the interval
	makeInterval();
  }
  
  /**
   * The lightbox function
   *
   */
  $.fn.ezLbox = function() {
		
	if(document.getElementById('overlay') == null) {
	  // Create an overlay div that covers whole window and fades in
	  $('<div id="overlay"></div>')
	    .css('opacity', '0')
	    .animate({'opacity': '0.9'}, 'fast')
	    .appendTo('body')
	    .click(function() {
	      removeLightbox(); // Removes the overlay and lightbox
	    });
	}
		
	// Create a lightbox div that will contain the image
	// Append it to body but keep hidden
	$('<div id="lightbox"></div>')
	  .hide()
	  .appendTo('body');
	
	// Create image element based on the src info from the image clicked
	// Trigger function positionLightboxImage() when picture has loaded
	$('<img>')
	  .attr('src', $(this).attr('src'))
	  // Make sure pic is no bigger than 90% of window
	  .css({'maxWidth': $(window).width() * 0.9, 'maxHeight': $(window).height() * 0.9})
	  .load(function() {
	    positionLightboxImage();
	  })
	  .click(function() {
		removeLightbox();
	  })
	  .appendTo('#lightbox');
	
	/**
	 * Function to fade in the #lightbox div which is containing the image
	 *
	 */
	function positionLightboxImage() {
	  //Finds where to put picture in relation to window size and picture size
	  var top = ($(window).height() - $('#lightbox').height()) / 2;
	  var left = ($(window).width() - $('#lightbox').width()) / 2;
	
	  // Places lightbox div based on earlier calculated middle position
	  $('#lightbox')
	    .css({
		  'top': top,
		  'left': left
		})
		.fadeIn();
	}
	
	/**
	 * Function to remove #overlay and #lightbox
	 *
	 */
	function removeLightbox() {
	  $('#overlay, #lightbox')
	    .fadeOut('fast', function() {
		  $(this).remove();
	    });
	}
  }
  
  /**
   * The gallery function
   *
   */
  $.fn.ezGlry = function(ops) {
    
	var
	  options = $.extend({
	    'counter': true
	  }, ops),
	  listitems = $(this).children(), // all the li children
	  pics = listitems.children(), // all the images belonging to the listitems of #ezGlry
	  amount = listitems.size() // total amount of listitems
	;
	
	// Callback when an image is clicked
	pics.click(function() {
	
	  var
	    // Number of li element containing the image clicked, lowest possible is 0
	    no = $(this).parent().index();
	  
		loadImg($(this), no);
	});
	
	/**
	 * Function to load an image and its links
	 *
	 * @param object obj, object of image clicked
	 * integer no, number of the li container containing the clicked image
	 *
	 */
	function loadImg(obj, no) {
	
	  $('#lightbox').remove();
	
	  // Create  a lightbox
      obj.ezLbox();
	  
	  // Create the arrows for the lightbox
	  createArrowLinks(no);
	}
	
	/**
	 * Function to create the arrow links
	 *
	 * @param integer no, number of the li container containing the clicked image
	 */
	function createArrowLinks(no) {
	
	  //Finds where to put picture in relation to window size and picture size
	  var
	    top = ($(window).height() - $('#lightbox').height()) / 2,
	    side = ($(window).width() - $('#lightbox').width()) / 2,
		arrowHeight = $('#lightbox').height() - 5,
		arrowWidth = $('#lightbox').width() * 0.2,
		prevImg,
		nextImg
		;
	  
	  // Create a div placed on the #lightbox div, used to place the arrows properly
	  $('<div class="ezGlry-arrow-container"></div>')
	    .appendTo('#lightbox');
	  
	  if(options.counter) {
	    // Load the image counter
	    imgCounter(no, top, side);
	  }
	  
	  // Create a left arrow unless it's the first picture in gallery
	  if(no !== 0) {
	  
	    // Previous image object
	    prevImg = $(listitems).eq(no - 1).children();
		
	    $('<div class="ezGlry-arrow"><span class="ezGlry-arrow-inside"><</span></div>')
	      .css({
		    'top': top,
			'height': arrowHeight,
			'width': arrowWidth,
		    'left': side
		  })
	      .appendTo('.ezGlry-arrow-container')
		  .click(function() {
		    loadImg(prevImg, no - 1);
		  });
	  }
	  
	  // Create a right arrow unless its the last picture in gallery
	  if(no + 1 !== amount) {
	  
	    // Next image object
	    nextImg = $(listitems).eq(no + 1).children();
	  
	    $('<div class="ezGlry-arrow"><span class="ezGlry-arrow-inside">></span></div>')
	      .css({
		    'top': top,
			'height': arrowHeight,
			'width': arrowWidth,
		    'right': side
		  })
	      .appendTo('.ezGlry-arrow-container')
		  .click(function() {
		    loadImg(nextImg, no + 1);
		  });
	  }
	
	}
	
	/**
	 * Function to show a counter of what picture in the order is being shown
	 *
	 * @param integer no, number of picture currently being shown
	 *
	 */
	function imgCounter(no, top, left) {
	
	  // Check if the counter wrap already exists
	  // Create wrap and counter if not
	  if(document.getElementById('ezGlry-counter-wrap') == null) {
	  
	    $('<div id="ezGlry-counter-wrap"></div>') // Counter wrap
	      .appendTo('#overlay')
		  .css({'display': 'block'});
		
	    $('<span class="ezGlry-counter-text"></span>') // Actual counter
	      .appendTo('#ezGlry-counter-wrap')
		  .css({
		    'font-size': '1.5vw',
			'color': 'white',
			'position': 'fixed',
			'top': top + $('#lightbox').height(),
			'left': left
		  })
		  .text('Image ' + (no + 1) + '/' + amount);
	  }
	  // If counter already exists, update position and text of counter
	  else {
	    $('.ezGlry-counter-text')
		  .css({
		    'left': left,
			'top': top + $('#lightbox').height()
			})
		  .text('Image ' + (no + 1) + '/' + amount);
	  }
	  
	}
	
  }
  
}) (jQuery, this);
