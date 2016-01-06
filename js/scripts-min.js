

// @codekit-append "mouse-position.js"

// @codekit-append "init-word.js"

// @codekit-append "check-letter.js"

/**** ITEMS IN SCENE ****/

/** Sun **/
// @codekit-append "items/sun.js"

/** Tree **/
// @codekit-append "items/tree.js"



(function (){
	// The mouse x and y values
	var mouse = {
		values: {
			x: {
				current: 0,
				to: 0,
				speed: 40
			},
			y: {
				current: 0,
				to: 0,
				speed: 40
			}
		}
	};
	
	// Bind the mouse position to the global scope
	window['mousePos'] = mouse.values;

	// Start incrementing variables "current" values towards there "to"-values.
	MoveTo.add(mouse);

	// When mouse moves, set the new "to"-values as the mouse x/y from page center
	$('#scene').mousemove(function (e){
		// Get mouse x/y from page center
		var xx = e.pageX - $('#scene').width()/2,
			yy = e.pageY - $('#scene').height()/2;	

		// Set new "to"-values
		mouse.values.x.to = xx;
		mouse.values.y.to = yy;
	});
})($);




(function (){

	// Elements
	var currentWord = 'HELLO';
	window['currentWord'] = currentWord;

	var $word, $underscores;

	function initWord(){
		// Empty the underscores
		$underscores.html('');

		// Add the underscores
		for (var i = 0; i < currentWord.length; i++){
			// Print underscores
			var $underscore = $('<span>');
			$underscore.attr('data-letter', i);
			$underscore.html('_');

			$underscores.append($underscore);
		}
	}

	$(document).ready(function (){
		$word = $('.word');
		$underscores = $word.find('.underscores');

		initWord();
	});

})($);



// Create a letter
function createLetter(letter, underscore){
	var $letter = $('<div>');
	$letter.addClass('letter');
	$letter.html(letter);

	// Init position at the input box
	var initTop = 50,
		initLeft = 50;

	// Move to position
	var pos = {
		values: {
			top: {
				current: initTop,
				to: underscore.offset().top - ($('#scene').width()/100)
			},
			left: {
				current: initLeft,
				to: underscore.offset().left + ($('#scene').width()/100)
			}
		}
	}
	MoveTo.add(pos);

	// Position letters each frame
	MoveTo.addFrame(function (){
		$letter.css({
			top: pos.values.top.current,
			left: pos.values.left.current
		});
	});

	// Append
	$('body').append($letter);
}

// Check if letter exist in word
function checkLetter(letter){
	for (var i = 0; i < currentWord.length; i++){
		if (currentWord[i] === letter){
			/** Match **/
			// Get underscore matching the letter
			var $underscore = $('[data-letter="' + i + '"]');

			// Create the letter
			createLetter(letter, $underscore);
		}
	}
}



(function (){
	// Draw the sun
	var sun = $('<div>');
	sun.addClass('sun');
	$('#scene').append(sun);

	// Position based on mouse position
	var sunSizeMultip = 0.6,
		sunMarginMultip = 0.2;
	MoveTo.addFrame(function (){
		sun.css({
			left: ($('#scene').width()/2) - (mousePos.x.current * 0.1),
			top: ($('#scene').height()/2) - (mousePos.y.current * 0.1),

			width: $('#scene').width() * sunSizeMultip,
			height: $('#scene').width() * sunSizeMultip,
			marginTop: $('#scene').width() * sunMarginMultip
		});
	});

	// Sun position
	/*var rotateConst = 6.283185307175454;
	var sunRotatePoint = rotateConst / 2,
		timeToRotate = 6000;
	var sunPos = {
		values: {
			x: {
				current: 0,
				to: 0
			},
			y: {
				current: 0,
				to: 0
			}
		}
	};

	// Position element
	MoveTo.addFrame(function (){
		var sunDistance = $(window).width() / 2;

		// Change rotate point
		sunPos.values.x.to = $(window).width() - (sun.width()/2);
		sunPos.values.y.to = $(window).height() - (sun.height()/2);

		sunPos.values.x.to += Math.cos(sunRotatePoint) * sunDistance;
		sunPos.values.y.to += Math.sin(sunRotatePoint) * sunDistance;  

		// Increase the point on the circle for state 1
		var rotateAdd = rotateConst / timeToRotate;
		sunRotatePoint += rotateAdd;

		// Position sun
		sun.css({
			left: sunPos.values.x.current,
			top: sunPos.values.y.current
		});
	});

	// Init
	MoveTo.add(sunPos);*/
})($);






(function (){
	// Draw the tree
	var tree = $('<div>');
	tree.addClass('tree');
	$('#scene').append(tree);

	// Position based on mouse position
	MoveTo.addFrame(function (){
		tree.css({
			left: -mousePos.x.current * 0.05
		});
	});

})($);


