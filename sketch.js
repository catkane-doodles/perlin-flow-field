let fr = 30;

let cols, rows, totalCount;
let xoff,
  yoff,
  zoff = 0;

let flowfield;
let particles = [];
let numberOfParticles = 1000;
let mag = 3;

// user changeable
let inc = 0.1;
let scl = 25;
let showFlow = false;
let shownParticles = numberOfParticles / 2;

// dom elements
let flowCheckBox;
let particleSlider;

function setup() {
  frameRate(fr);

  // create dom
  let cnv = createCanvas(800, 800);
  cnv.parent("canvas");

  flowCheckBox = createCheckbox("Show Flow Field", false);
  flowCheckBox.parent("canvas");

  textToShow = createP("Number of Particles: " + shownParticles);
  textToShow.parent("slider");

  particleSlider = createSlider(50, numberOfParticles, shownParticles, 10);
  particleSlider.size(width);
  particleSlider.parent("slider");

  flowCheckBox.changed(function toggle() {
    showFlow = !showFlow;
  });

  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  totalCount = cols * rows;

  background(70);

  flowfield = new Array(totalCount);

  for (var i = 0; i < numberOfParticles; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(50, 200);

  for (let y = 0; y < rows; y++) {
    yoff = y * inc;
    for (let x = 0; x < cols; x++) {
      xoff = x * inc;
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(3);
      flowfield[index] = v;
      if (showFlow) {
        stroke(0, 50);
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        strokeWeight(1);
        line(0, 0, scl, 0);
        pop();
      }
    }

    zoff += 0.0003;
  }
  shownParticles = particleSlider.value();
  textToShow.html("Number of Particles: " + shownParticles);
  for (let i = 0; i < shownParticles; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
