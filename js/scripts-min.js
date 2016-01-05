
/** Test **/
// @codekit-append "test.js"



(function (){
	var vari = {
		values: {
			x: {
				current: 0,
				to: 300
			},
			y: {
				current: 0,
				to: 300
			}
		}
	};

	// Callback
	vari.callback = function (){
		
	}

	// Init
	MoveTo.anims.push(vari);
})($);

