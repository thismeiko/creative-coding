// let h;

// function setup() {
//   var can = createCanvas(windowWidth,windowHeight);
// can.position(0,0);
// can.style('z-index','-1');
//     background(245);
//   colorMode(HSB,360,100,100,100);
// var mic= new p5.AudioIn();
// mic.start();
// }

// function draw() {
//     var vol = mic.getLevel();
//     ellipse(width/2,height/2,100);

//   // p=createVector(x,y);
//   let rez = 0.02;
//   noStroke();
//   for(i=0;i<width;i++){
//     for(j=0; j<height; j++){
//       n=noise(i*rez,j*rez)*10;
//       if(n<2){
//        h = 80;
//       }
//       else if(n<4){
//         h = 150;
//       }
//       else if(n<6){
//         h = 210;
//       }
//       else if(n<8){
//         h = 280;
//       }
//       else{h =360;}
//       fill(h,180,90,40);
//       rect(i,j,3);
//     }
// }
// }