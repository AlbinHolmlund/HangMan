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