

// Create a letter
function createLetter(letter, underscore){
	var $letter = $('<div>');
	$letter.addClass('letter');
	$letter.html(letter);

	// Init position at the input box
	var initTop = 50,
		initLeft = 50;

	// Move to position
	var pos = {
		values: {
			top: {
				current: initTop,
				to: underscore.offset().top - ($('#scene').width()/100)
			},
			left: {
				current: initLeft,
				to: underscore.offset().left + ($('#scene').width()/100)
			}
		}
	}
	MoveTo.add(pos);

	// Position letters each frame
	MoveTo.addFrame(function (){
		$letter.css({
			top: pos.values.top.current,
			left: pos.values.left.current
		});
	});

	// Append
	$('body').append($letter);
}

// Check if letter exist in word
function checkLetter(letter){
	for (var i = 0; i < currentWord.length; i++){
		if (currentWord[i] === letter){
			/** Match **/
			// Get underscore matching the letter
			var $underscore = $('[data-letter="' + i + '"]');

			// Create the letter
			createLetter(letter, $underscore);
		}
	}
}