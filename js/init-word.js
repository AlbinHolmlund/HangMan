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