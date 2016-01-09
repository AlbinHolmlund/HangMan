


(function (){
	// Draw the tree
	var tree = $('<div>');
	tree.addClass('tree');
	$('#scene').append(tree);

	// Position based on mouse position
	MoveTo.addFrame(function (){
		// Tree position
		Hangman.positions.treePos = -Hangman.positions.mousePos.x.current * 0.05;
		
		tree.css({
			left: Hangman.positions.treePos
		});
	});

})($);
