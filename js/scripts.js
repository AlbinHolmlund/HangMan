

/* 
	The hangman object to store all javascript cross-file functions and 
	variables so they're saved on the global scope. 
*/
HangmanWords = [
	{
		word: "BACON",
		clue: "A food item"
	},
	{
		word: "JAVASCRIPT",
		clue: "A programming language"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	},
	{
		word: "BACON",
		clue: "A food item"
	},
	{
		word: "JAVASCRIPT",
		clue: "A programming language"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	},
	{
		word: "BACON",
		clue: "A food item"
	},
	{
		word: "JAVASCRIPT",
		clue: "A programming language"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	}
];
Hangman = {
	currentIndex: 0,
	currentWord: null,
	guessesIndex: 0,
	usedLetters: {},
	correctLetters: {},
	positions: {},
	letterPos: []
};



// @codekit-append "mouse-position.js"

// @codekit-append "init-word.js"

// @codekit-append "check-letter.js"

/**** ITEMS IN SCENE ****/

/** Sun **/
// @codekit-append "items/sun.js"

/** Tree **/
// @codekit-append "items/tree.js"

/** Man **/
// @codekit-append "items/man.js"



// Set font sizes
MoveTo.addFrame(function (){
	// Main font size
	$('html').css({
		fontSize: $('#scene').width()/100
	});
});


// Position UI based on mouse movement
/*
var $ui = $('#ui');
MoveTo.addFrame(function (){
	var top = -$ui.height()/2,
		left = 0;

	top -= Hangman.positions.mousePos.y.current * 0.2;
	left -= Hangman.positions.mousePos.x.current * 0.2;

	var trans = "translate(" + left + "px, " + top + "px) ";

	$ui.css({
		transform: trans
	});
});
*/