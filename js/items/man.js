

(function (){
	// Elements
	var $man   = $('<div class="man">'),
		$rope  = $('<div class="rope">'),
		$body  = $('<div class="body">'),
		$head  = $('<div class="head">'),
		$feet  = $('<div class="feet">'),
		$chair = $('<div class="chair">'),
		$tree  = $('.tree');

	// Append
	$('#scene').append($man);
	$man.append($rope);
	$rope.append($body);
	$body.append($head, $feet, $chair);

	// Position
	MoveTo.addFrame(function (){
		var top = $tree.height() * 0.415,
			left = ($tree.offset().left - $('#scene').offset().left) + ($tree.width() * 0.555);
		$man.css({
			top: top,
			left: left
		});

		// Scale the man
		var scale = $('#scene').width() * 0.00027;
		$man.css({
			transform: 'scale(' + scale + ')'
		});
	});

	// Rotations
	var manRotations = {
		values: {
			rope: {
				current: 0,
				to: 0,
				speed: 100
			},
			head: {
				current: 0,
				to: 0,
				speed: 40
			},
			feet: {
				current: 0,
				to: 0,
				speed: 40
			}
		}
	};
	// States to trigger different animations
	var manStates = {
		ropeSwing: false
	};

	MoveTo.add(manRotations);
	MoveTo.addFrame(function (){

		$head.css({
			transform: 'rotate(' + manRotations.values.head.current + 'deg)'
		});
		$feet.css({
			transform: 'rotate(' + manRotations.values.feet.current + 'deg)'
		});

		// Rope swing
		if (manStates.ropeSwing === true){
			var rope = manRotations.values.rope.current;
			$rope.css({
				transform: 'rotate(' + rope + 'deg)'
			});

			// Change dir
			if (manRotations.values.rope.current > 3){
				manRotations.values.rope.to = -5;
			} else if (manRotations.values.rope.current < -3){
				manRotations.values.rope.to = 5;
			}
		}
	});

	// TEST: Activate states
	Hangman.lostGame = function (){
		manRotations.values.head.to = -20;
		manRotations.values.feet.to = -20;
		manStates.ropeSwing = true;
		manRotations.values.rope.to = -5;

		$chair.addClass('pushed');
		$body.addClass('dead');

		Hangman.stop = true;

		$('.lost').addClass('active');
	}
	Hangman.wonGame = function (){
		Hangman.stop = true;

		$('.won').addClass('active');
	}
	Hangman.restartGame = function (){
		manRotations.values.head.to = 0;
		manRotations.values.feet.to = 0;
		manStates.ropeSwing = false;
		manRotations.values.rope.to = 0;

		$chair.removeClass('pushed');
		$body.removeClass('dead');

		Hangman.currentIndex = 0;
		Hangman.initWord();
		Hangman.stop = false;

		$('.lost, .won').removeClass('active');
	}
	$('.lost [data-restart], .won [data-restart]').click(function (){
		Hangman.restartGame();
	});

})($);
