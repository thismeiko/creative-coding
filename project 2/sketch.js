//animation - background(fatasy color, noise() or random()) 
//video
//capture the video and save it in this cannvas
let faceapi;
let video;
let canvas;
let detections;
let size = 20;
let noiseRes;
let offset=0.00001;
let colors=['#6d2a4f','#d32729','#f4545e'];
// // by default all options are set to true
const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

function setup() {
canvas=createCanvas(windowWidth, windowHeight);
canvas.id("canvas");
// canvas.position(400,200);
// canvas.style('z-index','1');
// load up your video
background('#25091c');

// let slider = createSlider(1,200,50);
// slider.position(10,500);
// slider.style('width','80px');
// let sliderB = createSlider(1,10,1);
// sliderB.position(10,580);
// sliderB.style('width','80px');
// text('circle size',100,574);
// text('stroke weight',100,594);
// textSize(32);

translate(width/2-256,height/2-360);
video = createCapture(VIDEO);
 video.id("video");
 video.size(512, 360);
 video.style('border-width','3');
video.hide(); // Hide the video element, and just show the canvas

faceapi = ml5.faceApi(video, detectionOptions, modelReady);
 push();
 translate(-width/2+256,360-height/2);
strokeWeight(3);
noiseRes = random(0.01,0.2);
for(var x=0; x<width; x+=size){
  for(var y=0; y<height; y+=size){
    let n=noise((x+offset)*noiseRes,(y+offset)*noiseRes);
    let a;
    if(n>0.6){
      a=colors[0];
    }
    else if(n>0.3){
      a=colors[1];
    }
    else{
      a=colors[2];
    }
    stroke(a);
    let c = random(0,3);
    if(c<1){
      line(x,y,x+size,y+size);
    }
    else if(c<2){
      line(x,y+size,x+size,y);
    }
    else if (c<3){
     line(x,y,x,y+size);
    }
  }
}
pop();
}

// function draw(){
//   // let randomSize = slider.value();
//   }

function modelReady() {
  console.log("ready!");
  console.log(faceapi);
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  // console.log(result)
  detections = result;

  // background(220);
 
  image(video, 0, 0, 512, 360);
  if (detections) {
    if (detections.length > 0) {
      // console.log(detections)
      drawBox(detections);
      drawLandmarks(detections);
    }
  }
  faceapi.detect(gotResults);
}

function drawBox(detections) {
  for (let i = 0; i < detections.length; i++) {
    const alignedRect = detections[i].alignedRect;
    const x = alignedRect._box._x;
    const y = alignedRect._box._y;
    const boxWidth = alignedRect._box._width;
    const boxHeight = alignedRect._box._height;

    noFill();
    stroke('#fd8326');
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke('#fd8326');
  strokeWeight(3);

  for (let i = 0; i < detections.length; i ++) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);
  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i += 1) {
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}

