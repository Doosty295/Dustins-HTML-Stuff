setActiveCanvas("canvas");
setStrokeColor(rgb(0,0,0,0.2));
setFillColor(rgb(0,0,0,0.2));
setStrokeWidth(5);
var size = 1;

var chosenColor = "black";

var dotSize = [];
var eventList = [];
var dotColor = [];

var deletedEvent = [];
var deletedDot = [];
var deletedColor = [];

setTimeout(function(){hideElement("instructionlabel")}, 5000);


onEvent("canvas","mousemove",function(event){
  if(event.which === 1){
    var drawDotSize = dotRad(event.movementX, event.movementY);
    chosenColor = colorHandler(getText("colorModeSwitch"), chosenColor);

    setStrokeColor(chosenColor);
    setFillColor(chosenColor);
    circle(event.offsetX, event.offsetY, drawDotSize);




    eventList.push(event);
    dotSize.push(drawDotSize);
    dotColor.push(chosenColor);

  deletedEvent = [];
  deletedDot = [];
  deletedColor = [];

  }

});



//Delete Button
onEvent("clearButton", "click", function(event){
  clearCanvas();
  eventList = [];
  dotSize = [];
  dotColor = [];
  chosenColor = "black";
  setProperty("colorModeSwitch", "value", "Single Color");
  setText("colorSelector", "");

});

//Random
onEvent("randoButton", "click", function(event){
  clearCanvas();
  for(var i = 0; i < eventList.length; i++){
        setStrokeColor(dotColor[i]);
        setFillColor(dotColor[i]);
    circle(eventList[i].offsetX,eventList[i].offsetY,randomNumber(1,40));
  }
});

//Original
onEvent("origButton", "click", function(event){
    clearCanvas();

    for(var i = 0; i < eventList.length; i++){
    setStrokeColor(dotColor[i]);
    setFillColor(dotColor[i]);
    circle(eventList[i].offsetX,eventList[i].offsetY,dotSize[i]);
  }
});

//StrokeSpeed and stuff
function dotRad(changeX, changeY){
  var speed = Math.abs(changeX) + Math.abs(changeY);
  if(size<1){
    size = 1;
  }
  if(size>50){
    size = 50;
  }
  var output = size + 5/speed;
  return output;
}

//Color Handling
  function colorHandler(mode, color){
    if(mode === "Single Color"){
      return color;
    }
    if(mode === "Random Color"){
      var hexVal = ["#"]
      for(var i = 1; i < 7; i++){
        var ran = randomNumber(0,15);
        if(ran > 9){
          if(ran === 10){
          hexVal[i]="A";
        }
        else if(ran === 11){
          hexVal[i]="B";
        }
        else if(ran === 12){
          hexVal[i]="C";
        }
        else if(ran === 13){
          hexVal[i]="D";
        }
        else if(ran === 14){
          hexVal[i]="E";
        }
        else if(ran === 15){
          hexVal[i]="F";
        }
        }
        else{hexVal[i]=ran}

      }

      setText("colorSelector", hexVal[0] + hexVal[1] + hexVal[2] + hexVal[3] + hexVal[4] + hexVal[5] + hexVal[6]);

      return getText("colorSelector");
    }
  }

//Spray Button
onEvent("sprayButton", "click", function(event){
  clearCanvas();
    for(var i = 0; i < eventList.length; i++){
      for(var inc = 0; inc < 50; inc++){
        setStrokeColor(dotColor[i]);
        setFillColor(dotColor[i]);
        circle(eventList[i].offsetX + randomNumber(-5,5),eventList[i].offsetY + randomNumber(-5,5), .5);
      }
  }
});

//Line Button
onEvent("lineButton", "click", function(event){
  clearCanvas();

  for(var i = 0; i < eventList.length-10; i++){
    setStrokeColor(dotColor[i]);
    setFillColor(dotColor[i]);
    line(eventList[i].offsetX, eventList[i].offsetY, eventList[i+10].offsetX, eventList[i+10].offsetY);
  }
});


//KP Plus or KP Minus to change size
onEvent("screen1", "keydown", function(event){


  if(event.key === "+"){
    size+= 5;
    if(size > 50){size = 50;}
  }
  if(event.key === "-"){
    size-= 5;
    if(size < 1){size = 1;}
  }
  setText("sizeDisplay", size);
});

//sizebox
onEvent("sizeDisplay", "keydown", function(event){
  if(event.key === "Enter"){
    if(size !== getText("sizeDisplay")){
      size = getText("sizeDisplay");
      setText("sizeDisplay", size);
    }
  }
});


//Undo and redo Backspace and Shift respectively
onEvent("colorSelector", "keydown", function(event){
  if(event.key === "Enter"){
    chosenColor = getText("colorSelector");
    setText("colorSelector", "");
  }
});

onEvent("screen1","keydown", function(event){


  if(event.key === "Backspace" && eventList.length >= 1){
    deletedEvent.push(eventList.pop());
    deletedDot.push(dotSize.pop());
    deletedColor.push(dotColor.pop());



    clearCanvas();
    for(var i = 0; i < eventList.length; i++){
    setStrokeColor(dotColor[i]);
    setFillColor(dotColor[i]);
    circle(eventList[i].offsetX,eventList[i].offsetY,dotSize[i]);
  }
  }

  if(event.key === "Shift" && deletedEvent.length > 1){
    eventList.push(deletedEvent.pop());
    dotSize.push(deletedDot.pop());
    dotColor.push(deletedColor.pop());


    clearCanvas();
    for(var j = 0; j < eventList.length; j++){
    setStrokeColor(dotColor[j]);
    setFillColor(dotColor[j]);
    circle(eventList[j].offsetX,eventList[j].offsetY,dotSize[j]);

  }}


});

onEvent("infoButton", "click", function(event){
    showElement("instructionlabel");
    setTimeout(function(){hideElement("instructionlabel")}, 2500);
});
