define(function(require, exports, module) {
  // Requires
  var Engine              = require('famous/core/Engine');
  var Surface             = require('famous/core/Surface');
  var Modifier            = require('famous/core/Modifier');
  var GridLayout          = require('famous/views/GridLayout');
  var Flipper             = require('famous/views/Flipper');

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
  var surfaces = [];

  // Make the grid a set of surfaces
  grid.sequenceFrom(surfaces);


  // create the individual panels to
  // go on the grid 
  for(var i = 0; i < numPanels; i++) {
    createPanel(i);
  } 

  function createPanel(panelNum) {
    // create the front of the panel
    var panelFront = new Surface({
      properties: {
        backgroundColor: "hsl(" + (panelNum * 360 / 10) + ", 75%, 50%)",
        color: "#404040",
        lineHeight: '100px',
        textAlign: 'center'
      }
    });

    // create the back of the panel
    var panelBack = new Surface({
      size: [undefined, undefined],
      properties: {
        backgroundColor: "hsl(" + (panelNum * 360 / 30) + ", 75%, 50%)",
        color: "#404040",
        lineHeight: '100px',
        textAlign: 'center'
      }
    });   

    // make a new flipper for each panel
    // and set the front and back
    var flipper = new Flipper();
    flipper.setFront(panelFront);
    flipper.setBack(panelBack);  

    // flip panels
    panelFront.on('mouseover', function() {
      angle = Math.PI;
      flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
    });
    panelBack.on('mouseover', function() {
      angle = 0;
      flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
    });

    // surfaces is an array of all the flippers
    surfaces.push(flipper);
  }

  mainContext.add(centerModifier).add(grid);

});
