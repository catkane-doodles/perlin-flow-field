let fr = 30;
let inc = 0.1;
let scl = 15;
let cols, rows, totalCount;

let xoff,
  yoff,
  zoff = 0;

let particles = [];

let flowfield;

function setup() {
  frameRate(fr);
  createCanvas(1920, 1080);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  totalCount = cols * rows;

  background(70);

  flowfield = new Array(totalCount);

  for (var i = 0; i < sqrt(width * height); i++) {
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
    }

    zoff += 0.0003;
  }

  particles.forEach(function (p) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  });
}
