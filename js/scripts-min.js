

/* 
	The hangman object to store all javascript cross-file functions and 
	variables so they're saved on the global scope. 
*/
Hangman = {
	currentWord: null,
	usedLetters: {},
	positions: {}
};



// @codekit-append "mouse-position.js"

// @codekit-append "init-word.js"

// @codekit-append "check-letter.js"

/**** ITEMS IN SCENE ****/

/** Sun **/
// @codekit-append "items/sun.js"

/** Tree **/
// @codekit-append "items/tree.js"

/** Man **/
// @codekit-append "items/man.js"



// Set font sizes
MoveTo.addFrame(function (){
	// Main font size
	$('html').css({
		fontSize: $('#scene').width()/100
	});
});


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
	Hangman.positions.mousePos = mouse.values;

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

/*
	TODO:
		Fix a nice animation when reinitiating a word.
*/


(function (){
	// Elements
	var $word, $underscores;

	// Init a word
	function initWord(word){
		// Set the word
		Hangman.currentWord = word;

		// Empty the underscores
		$underscores.html('');

		// Resets
		Hangman.usedLetters = {};

		// Remove all letters
		$('.letter').remove();

		// Add the underscores
		for (var i = 0; i < Hangman.currentWord.length; i++){
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

		// Init
		initWord('JAVASCRIPT');
	});
})($);

/*
	Check if letter i used before.
*/

// Create a letter
function createLetter(letter, underscore){
	var $letter = $('<div>');
	$letter.addClass('letter');
	$letter.html(letter);

	// Append
	$('body').append($letter);

	// Init position at the input box
	var $input = $('.guess-letter-input input');
	var initTop = $input.offset().top + ($input.height()/2) - ($letter.height()/2),
		initLeft = $input.offset().left + ($input.width()/2) - ($letter.width()/2);

	// Move to position
	var pos = {
		values: {
			top: {
				current: initTop,
				to: initTop
			},
			left: {
				current: initLeft,
				to: initLeft
			}
		}
	}
	MoveTo.add(pos);

	// Position letters each frame
	MoveTo.addFrame(function (){
		pos.values.top.to = underscore.offset().top - ($('#scene').width() * 0.01);
		pos.values.left.to = underscore.offset().left + ($('#scene').width() * 0.005);

		$letter.css({
			top: pos.values.top.current,
			left: pos.values.left.current
		});
	});

}

// Check if letter exist in word
function checkLetter(letter){
	var letterExist = false;

	// Check if letter is used
	if (!Hangman.usedLetters[letter]){
		for (var i = 0; i < Hangman.currentWord.length; i++){
			if (Hangman.currentWord[i] === letter){
				/** Match **/
				letterExist = true;

				// Get underscore matching the letter
				var $underscore = $('[data-letter="' + i + '"]');

				// Create the letter
				createLetter(letter, $underscore);
			}
		}
		// Letter is used
		Hangman.usedLetters[letter] = true;
	}

	return letterExist;
}

// Add more input submit events?
$('.guess-letter-input input').on('input', function (e){
	var $this = $(this);
	var letter = $this.val().toUpperCase();

	console.log(letter);

	if (letter.length > 1){
		$this.val(letter[0]);
	}

	// Enter event
	//if (e.which === 13){
		var check = checkLetter(letter);
		$this.val('');
		if (check === true){
			//$this.blur();
		}
	//
});
$(document).on('keydown', function (){
	$('.guess-letter-input input').focus();
});



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
			left: ($('#scene').width()/2) - (Hangman.positions.mousePos.x.current * 0.1),
			top: ($('#scene').height()/2) - (Hangman.positions.mousePos.y.current * 0.2),

			width: $('#scene').width() * sunSizeMultip,
			height: $('#scene').width() * sunSizeMultip,
			marginTop: $('#scene').width() * sunMarginMultip
		});
	});
})($);






(function (){
	// Draw the tree
	var tree = $('<div>');
	tree.addClass('tree');
	$('#scene').append(tree);

	// Position based on mouse position
	MoveTo.addFrame(function (){
		// Tree position
		Hangman.positions.treePos = -Hangman.positions.mousePos.x.current * 0.05;
		
		tree.css({
			left: Hangman.positions.treePos
		});
	});

})($);




(function (){
	// Must move the whole body downwards.
	// A gravestone rise?

	// Elements
	var $man   = $('<div class="man">'),
		$rope  = $('<div class="rope">'),
		$body  = $('<div class="body">'),
		$head  = $('<div class="head">'),
		$feet  = $('<div class="feet">'),
		$chair = $('<div class="chair">'),
		$tree  = $('.tree');

	// Append
	$('#scene').append($man);
	$man.append($rope);
	$rope.append($body);
	$body.append($head, $feet);

	// Position
	MoveTo.addFrame(function (){
		var top = $tree.height() * 0.415,
			left = ($tree.offset().left - $('#scene').offset().left) + ($tree.width() * 0.555);
		$man.css({
			top: top,
			left: left
		});

		// Scale the man
		var scale = $('#scene').width() * 0.00027;
		$man.css({
			transform: 'scale(' + scale + ')'
		});
	});

	// Rotations
	var manRotations = {
		values: {
			rope: {
				current: 0,
				to: 0,
				speed: 100
			},
			head: {
				current: 0,
				to: 0,
				speed: 40
			},
			feet: {
				current: 0,
				to: 0,
				speed: 40
			}
		}
	};
	// States to trigger different animations
	var manStates = {
		ropeSwing: false
	};

	MoveTo.add(manRotations);
	MoveTo.addFrame(function (){

		$head.css({
			transform: 'rotate(' + manRotations.values.head.current + 'deg)'
		});
		$feet.css({
			transform: 'rotate(' + manRotations.values.feet.current + 'deg)'
		});

		// Rope swing
		if (manStates.ropeSwing === true){
			var rope = manRotations.values.rope.current;
			$rope.css({
				transform: 'rotate(' + rope + 'deg)'
			});

			// Change dir
			if (manRotations.values.rope.current > 3){
				manRotations.values.rope.to = -5;
			} else if (manRotations.values.rope.current < -3){
				manRotations.values.rope.to = 5;
			}
		}
	});

	// TEST: Activate states
	$('body').click(function (){
		manRotations.values.head.to = -20;
		manRotations.values.feet.to = -20;
		manStates.ropeSwing = true;
		manRotations.values.rope.to = 5;
	});
	/*$('body').click(function (){
		// Activate rope swing
		manStates.ropeSwing = true;
		manRotations.values.rope.to = 5;
	});*/

})($);


