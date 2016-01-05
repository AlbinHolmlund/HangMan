

(function (){
	// Draw the sun
	var sun = $('<div>');
	sun.addClass('sun');

	// Append
	$('body').append(sun);

	// Sun position
	/*var rotateConst = 6.283185307175454;
	var sunRotatePoint = rotateConst / 2,
		timeToRotate = 6000;
	var sunPos = {
		values: {
			x: {
				current: 0,
				to: 0
			},
			y: {
				current: 0,
				to: 0
			}
		}
	};

	// Position element
	MoveTo.addFrame(function (){
		var sunDistance = $(window).width() / 2;

		// Change rotate point
		sunPos.values.x.to = $(window).width() - (sun.width()/2);
		sunPos.values.y.to = $(window).height() - (sun.height()/2);

		sunPos.values.x.to += Math.cos(sunRotatePoint) * sunDistance;
		sunPos.values.y.to += Math.sin(sunRotatePoint) * sunDistance;  

		// Increase the point on the circle for state 1
		var rotateAdd = rotateConst / timeToRotate;
		sunRotatePoint += rotateAdd;

		// Position sun
		sun.css({
			left: sunPos.values.x.current,
			top: sunPos.values.y.current
		});
	});

	// Init
	MoveTo.add(sunPos);*/
})($);

