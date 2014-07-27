define(function(require, exports, module) {
  // Requires
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var GridLayout = require('famous/views/GridLayout');
  var Flipper    = require('famous/views/Flipper');
  var RenderNode = require('famous/core/RenderNode');


  // create mainContext to add 
  // renderables/modifiers to
  var mainContext = Engine.createContext();
  mainContext.setPerspective(500);

  var dimensions = [7, 4];

  // create grid layout
  var grid = new GridLayout({
    dimensions: dimensions
  });
  
  // set num of panels based on the ratio 
  var numPanels = dimensions[0] * dimensions[1];
  var surfaces = [];

  // Make the grid a set of surfaces
  grid.sequenceFrom(surfaces);


  // create the individual panels to
  // go on the grid 
  for(var i = 0; i < numPanels; i++) {
    (function(i) {

      // create the front of the panel
      var panelFront = new Surface({
        content: "panelFront " + (i + 1),
        size: [undefined, undefined],
        properties: {
          backgroundColor: "hsl(" + (i * 360 / 10) + ", 50%, 50%)",
          color: "#404040",
          lineHeight: '100px',
          textAlign: 'center'
        }
      });

      // create the back of the panel
      var panelBack = new Surface({
        content: "panelBack " + (i + 1),
        size: [undefined, undefined],
        properties: {
          backgroundColor: "hsl(" + (i * 360 / 20) + ", 50%, 50%)",
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

      // toggle the panels and make them flip
      var toggle = false;

      panelFront.on('click', function() {
        console.log('click')
        var angle = toggle ? 0 : Math.PI;
        flipper.setAngle(angle, {curve : 'easeOutBounce', duration : 500});
        toggle = !toggle;
        panelFront = (toggle === true) ? panelBack : panelFront;
      });

      // surfaces is an array of all the flippers
      surfaces.push(flipper);
    })(i)
  } 

  mainContext.add(grid);

});
