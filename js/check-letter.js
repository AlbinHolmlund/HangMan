/*
	Check if letter i used before.
*/

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
		pos.values.top.to = underscore.offset().top - ($('#scene').width()/100);
		pos.values.left.to = underscore.offset().left + ($('#scene').width()/100);

		$letter.css({
			top: pos.values.top.current,
			left: pos.values.left.current
		});
	});

}

// Check if letter exist in word
var usedLetters = {};
function checkLetter(letter){
	var letterExist = false;

	// Check if letter is used
	if (!usedLetters[letter]){
		for (var i = 0; i < currentWord.length; i++){
			if (currentWord[i] === letter){
				/** Match **/
				letterExist = true;

				// Get underscore matching the letter
				var $underscore = $('[data-letter="' + i + '"]');

				// Create the letter
				createLetter(letter, $underscore);
			}
		}
		// Letter is used
		usedLetters[letter] = true;
	}

	return letterExist;
}

// Add more input submit events?
$('.guess-letter-input input').on('keyup', function (e){
	var $this = $(this);
	var letter = $this.val().toUpperCase();

	if (letter.length > 1){
		$this.val(letter[0]);
	}

	// Enter event
	if (e.which === 13){
		var check = checkLetter(letter);
		$this.val('');
		if (check === true){
			//$this.blur();
		}
	}
});