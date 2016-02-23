

/* 
	The hangman object to store all javascript cross-file functions and 
	variables so they're saved on the global scope. 
*/
HangmanWords = [
	{
		word: "JSON",
		clue: "Alternative to XML",
	},
	{
		word: "ECMASCRIPT2015",
		clue: "The latest version of javascript",
		size: "small",
		letterSize: "2rem"
	},
	{
		word: "BABEL",
		clue: "Compiler for the latest version of javascript",
		size: "small"
	},
	{
		word: "DIV",
		clue: "The most common HTML element",
		size: "small"
	},
	{
		word: "SASS",
		clue: "CSS preprocessor"
	},
	{
		word: "HTML",
		clue: "Hypertext markup"
	},
	{
		word: "FIREBASE",
		clue: "Cloud based database provider",
		size: "small"
	},
	{
		word: "JAVASCRIPT",
		clue: "Web programming language"
	}
];

// Shuffle
function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
HangmanWords = shuffle(HangmanWords);

// Reverse
// HangmanWords = HangmanWords.reverse();

Hangman = {
	stop: false,
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
