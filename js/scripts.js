

/* 
	The hangman object to store all javascript cross-file functions and 
	variables so they're saved on the global scope. 
*/
HangmanWords = [
	{
		word: "JAVASCRIPT",
		clue: "A programming language"
	},
	{
		word: "FIREBASE",
		clue: "Cloud based databases"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	}
];
Hangman = {
	lost: false,
	currentIndex: 0,
	currentWord: null,
	guessesIndex: 0,
	usedLetters: {},
	correctLetters: {},
	positions: {},
	letterPos: []
};

// Lost game function is in items/man.js


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
