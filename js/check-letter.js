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