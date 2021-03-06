


(function (){
	// Elements
	var $word, $clue, $underscores;

	// Init a word
	Hangman.initWord = function (){
		var word = HangmanWords[Hangman.currentIndex].word,
			clue = HangmanWords[Hangman.currentIndex].clue,
			size = HangmanWords[Hangman.currentIndex].size,
			letterSize = HangmanWords[Hangman.currentIndex].letterSize;

		// Resets
		Hangman.usedLetters = {};
		Hangman.correctLetters = {};
		Hangman.guessesIndex = 0;
		Hangman.stop = false;

		// Set question number
		$('.question-number').html((Hangman.currentIndex+1) + '/' + HangmanWords.length);

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
		// Set clue size
		if (size === "small"){
			$clue.css('fontSize', '2rem');
		} else {
			$clue.css('fontSize', '');
		}
		// Set letters size
		if (letterSize){
			$('.underscores').css('fontSize', letterSize);
			$('body').append('<style id="letterSizeStyle">.letter{font-size: '+letterSize+';}</style>');
		} else {
			$('.underscores').css('fontSize', '');
			$('#letterSizeStyle').remove();
		}

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