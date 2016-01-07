

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
			}
		}
	};
	// States to trigger different animations
	var manStates = {
		ropeSwing: false
	};

	MoveTo.add(manRotations);
	MoveTo.addFrame(function (){

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
	$('body').click(function (){
		// Activate rope swing
		manStates.ropeSwing = true;
		manRotations.values.rope.to = 5;
	});

})($);

/*

(function (){

	// Body parts objects
	var $man = $('<div>'),
		$rope  = {},
		$head  = {},
		$body  = {},
		$feet  = {},
		$chair = {};

	// Other scene elements
	var $tree = $('.tree');

	// The man containing all the other elements
	$man.addClass('man');
	MoveTo.addFrame(function (){
		var top = $tree.height() * 0.415,
			left = ($tree.offset().left - $('#scene').offset().left) + ($tree.width() * 0.555);
		$man.css({
			top: top,
			left: left
		});
	});

	$('#scene').append($man);

	// The rope
	$rope.el = $('<div>');
	$rope.el.addClass('rope');

	$rope.pos = {
		values: {
			rotate: {
				current: 0,
				to: 0
			}
		}
	};
	MoveTo.add($rope.pos);

	MoveTo.addFrame(function (){
		var rotate = $rope.pos.values.rotate.current;

		$rope.el.css({
			transform: 'rotate(' + rotate + 'deg)'
		});

		// Size
		var sizeMultip = 0.20;
		var ropeWHRatio = 18 / 394;// Width height ratio
		var ropeHeight = $tree.height() * sizeMultip;
		var ropeWidth = ropeHeight * ropeWHRatio;
		$rope.el.css({
			height: ropeHeight,
			width: ropeWidth
		});
	});

	$man.append($rope.el);

	// The head (inside rope)
	$head.el = $('<div>');
	$head.el.addClass('head');

	/*MoveTo.addFrame(function (){
		var sizeMultip = 0.20;
		var WHRatio = 126 / 164;// Width height ratio
		var height = $tree.height() * sizeMultip;
		var width = height * WHRatio;
		$head.el.css({
			height: height,
			width: width
		});
	});*/

	/*$rope.el.append($head.el);

})($);*/