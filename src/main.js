define(function(require, exports, module) {
  // Requires
  var Engine      = require('famous/core/Engine');
  var Surface     = require('famous/core/Surface');
  var Modifier    = require('famous/core/Modifier');
  var Flipper     = require('famous/views/Flipper');
  var GridLayout  = require('famous/views/GridLayout');

  // create mainContext to add 
  // renderables/modifiers to
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  // set grid dimension
  var dimensions = [7, 4];

  // create grid layout
  var grid = new GridLayout({
    dimensions: dimensions
  });

  // modifier on the grid gets applied
  // to each panel, this makes the pivot
  // of the flip be the center of the panel
  var centerModifier = new Modifier({
    origin: [0.5, 0.5]
  });
  
  // set num of panels based on the ratio 
  var numPanels = dimensions[0] * dimensions[1];
  var arrayOfPanels = [];

  // Make the grid a set of surfaces
  grid.sequenceFrom(arrayOfPanels);

  // create the individual panels to go on the grid 
  for(var i = 0; i < numPanels; i++) {
    var front = createFront(i);
    var back = createBack(i);
    createPanel(i, front, back);
  } 

  // creates the front of the panel by creating a surface
  function createFront(panelNum) {
    var panelFront = new Surface({
      properties: {
        // creates the rainbow effect
        backgroundColor: "hsl(" + (panelNum * 360 / 10) + ", 75%, 50%)",
      }
    });
    return panelFront;
  }

  // creates the back of the panel by creating a surface
  function createBack(panelNum) {
    var panelBack = new Surface({
      properties: {
        // creates the rainbow effect
        backgroundColor: "hsl(" + (numPanels-panelNum * 360 / 10) + ", 75%, 50%)",
      }
    });   
    return panelBack;
  }

  // takes the front and back surfaces and combines them 
  // into a panel using a flipper. Also sets the 
  // mouseover events for both sides of the panel
  function createPanel(panelNum, panelFront, panelBack) {
    // make a new flipper for each panel
    // and set the front and back
    var panel = new Flipper();
    panel.setFront(panelFront);
    panel.setBack(panelBack);  

    // flip panels on mouseover
    panelFront.on('mouseover', function() {
      angle = Math.PI;
      panel.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
    });

    panelBack.on('mouseover', function() {
      angle = 0;
      panel.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
    });

    arrayOfPanels.push(panel);
  }

  // finally, add the center modifier
  // and the grid to the main context
  mainContext.add(centerModifier).add(grid);

});
