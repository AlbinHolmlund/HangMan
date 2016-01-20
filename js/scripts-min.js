

/* 
	The hangman object to store all javascript cross-file functions and 
	variables so they're saved on the global scope. 
*/
HangmanWords = [
	{
		word: "JAVASCRIPT",
		clue: "A programming language"
	},
	{
		word: "FIREBASE",
		clue: "Cloud based databases"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	}
];
Hangman = {
	lost: false,
	currentIndex: 0,
	currentWord: null,
	guessesIndex: 0,
	usedLetters: {},
	correctLetters: {},
	positions: {},
	letterPos: []
};

// Lost game function is in items/man.js


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
	var $word, $clue, $underscores;

	// Init a word
	Hangman.initWord = function (){
		var word = HangmanWords[Hangman.currentIndex].word,
			clue = HangmanWords[Hangman.currentIndex].clue;

		// Resets
		Hangman.usedLetters = {};
		Hangman.correctLetters = {};
		Hangman.guessesIndex = 0;
		Hangman.lost = false;

		// Empty the underscores
		$underscores.html('');

		// Remove all letters
		//$('.letter').remove();
		for (var i = 0; i < Hangman.letterPos.length; i++){
			Hangman.letterPos[i].values.top.to = -200 - (50 * (Hangman.letterPos.length - i));
			Hangman.letterPos[i].state = 0;
		}

		// Set the word
		Hangman.currentWord = word;

		// Set the clue
		$clue.html(clue);

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
		$clue = $('.clue .clue-text');
		$underscores = $word.find('.underscores');

		// Init
		var firstWord = HangmanWords[Hangman.currentIndex];
		Hangman.initWord();
	});
})($);

/*
	Check if letter i used before.
*/

(function (){
	// Create a letter
	function createLetter(letter, position, positionFunction){
		// Create the letter
		var $letter = $('<div>');
		$letter.addClass('letter');
		$letter.html(letter);

		// Append
		$('body').append($letter);

		// Init position at the input box
		var $input = $('.guess-letter-input');
		var initTop = $input.offset().top + ($input.height()/2) - ($letter.height()/2),
			initLeft = $input.offset().left + ($input.width()/2) - ($letter.width()/2);

		// Move to position
		var pos = {
			state: 1,
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

		// 
		Hangman.letterPos.push(pos);

		// Position letters each frame
		MoveTo.addFrame(function (){
			/*
				State 0 = No fixed movement
				State 1 = Fixed to the position element
			*/
			if (pos.state === 1){
				if (position){
					positionFunction(pos, position, $letter);
				}
			}

			// Set new position
			$letter.css({
				top: pos.values.top.current,
				left: pos.values.left.current
			});
		});

	}

	// Check if letter exist in word
	function checkLetter(letter){
		var check = {
				match: 0,
				indexes: []
			};

		// Check if there is a matching letter in the word
		for (var i = 0; i < Hangman.currentWord.length; i++){
			if (Hangman.currentWord[i] === letter){
				/** Match **/
				check.match = 1;
				check.indexes.push( i );
			}
		}
		// Letter is correct
		Hangman.correctLetters[letter] = true; 

		// Letter is used
		Hangman.usedLetters[letter] = true;

		// Check if word is solved yet
		var solved = true;
		for (var i = 0; i < Hangman.currentWord.length; i++){
			var correctLetters = Hangman.correctLetters,
				currentLetter = Hangman.currentWord[i];

			// If letter isnt set, then its not solved
			if (!correctLetters[currentLetter]){
				solved = false;
			}
		}
		if (solved){
			check.match = 2;
		}

		return check;
	}

	// Add more input submit events?
	$(document).on('keydown', function (e){
		if (Hangman.lost === false){
			var letter = String.fromCharCode(e.which).toUpperCase();

			// Validate
			if (letter.length === 1 && letter.match(/[a-z]/i)){
				console.log(letter);
			} else {
				return false;
			}

			// Check if letter is used
			if (Hangman.usedLetters[letter]){
				return false;
			}

			var check = checkLetter(letter);

			// Check feedback
			if (check.match === 0){
				console.log("Letter dont exist");
				// Setup the letter
				// Get underscore matching the letter
				var $guess = $('[data-guess="' + Hangman.guessesIndex + '"]');
				Hangman.guessesIndex++;

				// Create the letter
				createLetter(letter, $guess, function (pos, position, $letter){
					pos.values.top.to = (position.offset().top + position.height()/2) - $letter.height()/2;
					pos.values.left.to = (position.offset().left + position.width()/2) - $letter.width()/2;
				});

				// Check if game is lost
				console.log(Hangman.guessesIndex);
				if (Hangman.guessesIndex == 5){
					// Lost game
					Hangman.lostGame();
					return false;
				}
			}
			else if (check.match === 1){
				console.log("Letter exist");
				// Setup the letters
				for (var i = 0; i < check.indexes.length; i++){
					// Get underscore matching the letter
					var $underscore = $('[data-letter="' + check.indexes[i] + '"]');
					// Create the letter
					createLetter(letter, $underscore, function (pos, position){
						pos.values.top.to = position.offset().top - ($('#scene').width() * 0.01);
						pos.values.left.to = position.offset().left + ($('#scene').width() * 0.005);
					});
				}
			}
			else if (check.match === 2){
				console.log("Word solved");
				// Setup the letters
				for (var i = 0; i < check.indexes.length; i++){
					// Get underscore matching the letter
					var $underscore = $('[data-letter="' + check.indexes[i] + '"]');
					// Create the letter
					createLetter(letter, $underscore, function (pos, position){
						pos.values.top.to = position.offset().top - ($('#scene').width() * 0.01);
						pos.values.left.to = position.offset().left + ($('#scene').width() * 0.005);
					});
				}

				// Change to next word
				setTimeout(function (){
					Hangman.currentIndex++;
					Hangman.initWord();
				}, 500);
			}
		}
	});

})($);



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
	$body.append($head, $feet, $chair);

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
	Hangman.lostGame = function (){
		manRotations.values.head.to = -20;
		manRotations.values.feet.to = -20;
		manStates.ropeSwing = true;
		manRotations.values.rope.to = -5;

		$chair.addClass('pushed');

		Hangman.lost = true;
	}
	/*$('body').click(function (){
		// Activate rope swing
		manStates.ropeSwing = true;
		manRotations.values.rope.to = 5;
	});*/

})($);


