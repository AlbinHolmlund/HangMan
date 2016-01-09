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

		// Empty the underscores
		$underscores.html('');

		// Remove all letters
		$('.letter').remove();

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