  'use strict';

  function gotKey (event) {
      
      var key = event.key;
      // Do something based on key press
      if (key == 'x') angles[0] -= angleInc;
      if (key == 'y') angles[1] -= angleInc;
      if (key == 'z') angles[2] -= angleInc;
      if (key == 'X') angles[0] += angleInc;
      if (key == 'Y') angles[1] += angleInc;
      if (key == 'Z') angles[2] += angleInc;
      
      // create a new shape and do a redo a draw
      draw();
  }
  
