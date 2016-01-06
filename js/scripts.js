

// @codekit-append "mouse-position.js"

// @codekit-append "init-word.js"

// @codekit-append "check-letter.js"

/**** ITEMS IN SCENE ****/

/** Sun **/
// @codekit-append "items/sun.js"

/** Tree **/
// @codekit-append "items/tree.js"



// Set font sizes
MoveTo.addFrame(function (){
	// Main font size
	$('html').css({
		fontSize: $('#scene').width()/100
	});
});