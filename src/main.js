define(function(require, exports, module) {
  // Requires
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
  var GridLayout = require('famous/views/GridLayout');
  // var Flipper    = require("famous/views/Flipper");


  // create mainContext to add 
  // renderables/modifiers to
  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  var dimensions = [7, 4];

  // create grid layout
  var grid = new GridLayout({
    dimensions: dimensions
  });
  
  var numPanels = dimensions[0] * dimensions[1];
  var surfaces = [];
  grid.sequenceFrom(surfaces);

  for(var i = 0; i < numPanels; i++) {
    var panelFront = new Surface({
      content: "panelFront " + (i + 1),
      size: [undefined, undefined],
      properties: {
        backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
        color: "#404040",
        lineHeight: '100px',
        textAlign: 'center'
      }
    });
    var panelBack = new Surface({
      content: "panelBack " + (i + 1),
      size: [undefined, undefined],
      properties: {
        backgroundColor: "hsl(" + (i * 360 / 8) + ", 100%, 50%)",
        color: "#404040",
        lineHeight: '100px',
        textAlign: 'center'
      }
    }); 
    // flipper.setFront(panelFront);
    // flipper.setBack(panelBack)

    surfaces.push(panelFront);
  } 
  mainContext.add(grid);


});
