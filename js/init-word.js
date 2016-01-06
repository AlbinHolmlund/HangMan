/*
	TODO:
		Fix a nice animation when reinitiating a word.
*/


// Elements
var $word, $underscores;

// Init a word
function initWord(word){
	// Set the word
	window['currentWord'] = word;

	// Empty the underscores
	$underscores.html('');

	// Remove all letters
	$('.letter').remove();

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

	// Init
	initWord('JAVASCRIPT');
});
