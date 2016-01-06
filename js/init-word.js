


(function (){

	// Elements
	var currentWord = 'HELLO';
	window['currentWord'] = currentWord;

	var $word, $underscores;

	function initWord(){
		$underscores.html('');

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