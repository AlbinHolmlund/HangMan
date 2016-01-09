/*
	Check if letter i used before.
*/

(function (){
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
		var letterExist = 0;

		// Check if letter is used
		if (!Hangman.usedLetters[letter]){
			for (var i = 0; i < Hangman.currentWord.length; i++){
				if (Hangman.currentWord[i] === letter){
					/** Match **/
					letterExist = 1;

					// Get underscore matching the letter
					var $underscore = $('[data-letter="' + i + '"]');

					// Create the letter
					createLetter(letter, $underscore);
				}
			}
			// Letter is used
			Hangman.usedLetters[letter] = true;
			Hangman.correctLetters[letter] = true; 
		}

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
			letterExist = 2;
		}

		return letterExist;
	}

	// Add more input submit events?
	$('.guess-letter-input input').on('input', function (e){
		var $this = $(this);
		var letter = $this.val().toUpperCase();

		if (letter.length > 1){
			$this.val(letter[0]);
		}

		var check = checkLetter(letter);
		$this.val('');

		// Check feedback
		if (check === 0){
			console.log("Letter dont exist");
		}
		else if (check === 1){
			console.log("Letter exist");
		}
		else if (check === 2){
			console.log("Word solved");

			// Change to next word
			setTimeout(function (){
				Hangman.currentIndex++;
				Hangman.initWord();
			}, 500);
		}
	});
	$(document).on('keydown', function (){
		$('.guess-letter-input input').focus();
	});

})($);