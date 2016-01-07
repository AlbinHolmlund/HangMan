


(function (){
	// Draw the tree
	var tree = $('<div>');
	tree.addClass('tree');
	$('#scene').append(tree);

	// Position based on mouse position
	MoveTo.addFrame(function (){
		// Tree position
		window['treePos'] = -mousePos.x.current * 0.05;
		
		tree.css({
			left: treePos
		});
	});

})($);
