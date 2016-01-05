


(function (){
	// Draw the tree
	var tree = $('<div>');
	tree.addClass('tree');
	$('#scene').append(tree);

	// Position based on mouse position
	MoveTo.addFrame(function (){
		tree.css({
			left: -mousePos.x.current * 0.05
		});
	});

})($);
