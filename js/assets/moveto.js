MoveTo = {
  defaults: {
    speed: 20 // More is slower
  },
  anims: [] // The variable objects to animate value of
};
MoveTo.add = function (obj){
  MoveTo.anims.push(obj);
}
MoveTo.render = function (){
  // Each object to animate
  for (var key in MoveTo.anims) {
    if (MoveTo.anims.hasOwnProperty(key)) {
      // Current object
      var anim = MoveTo.anims[key];

      // All vars to animate in the curret object
      for (var key in anim['values']) {
        if (anim['values'].hasOwnProperty(key)) {
          // Current var
          var pos = anim['values'][key],
              speed = pos.speed || MoveTo.defaults.speed;

          // Increment towards new value
          pos.current += (pos.to - pos.current) / speed;

          // Round up if they are very close to each other
          if (Math.round(pos.current) === Math.round(pos.to))
            pos.current = pos.to;
        }
      }

      // Run callback (for example to position an element based on variable)
      anim.callback();
    }
  }
  
  // Rerender
  requestAnimFrame(MoveTo.render);
};
MoveTo.render();