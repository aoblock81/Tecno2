var Engine = Matter.Engine,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

var engine;
var world;
var particles = [];
var boundaries = [];

var ground;

var mConstraint;
var canvas = createCanvas(800, 800); // me devulve una refe del lienzo

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0.0;
  // Engine.run(engine);

  var p1 = new Particle(random(30, 700), random(30, 700), random(50, 70));
  var p2 = new Particle(random(30, 700), random(30, 700), random(50, 70));
  var p3 = new Particle(random(30, 700), random(30, 700), random(10, 40));
  var p4 = new Particle(random(30, 700), random(30, 700), random(10, 40));
  var p5 = new Particle(random(30, 700), random(30, 700), random(10, 40));
  var p6 = new Particle(random(30, 700), random(30, 700), random(10, 40));

  particles.push(p1);
  particles.push(p2);
  particles.push(p3);
  particles.push(p4);
  particles.push(p5);
  particles.push(p6);

  var options = {
    bodyA: p1.body,
    bodyB: p2.body,
    length: 150,
    stiffness: 0.4,
  };

  var constraint = Constraint.create(options);
  World.add(world, constraint);

  // paredes/limites
  boundaries.push(new Boundary(width / 2, height + 100, width + 200, 100, 0)); // piso
  boundaries.push(new Boundary(width / 2, -100, width + 200, 100, 0)); // techo
  boundaries.push(new Boundary(-100, height / 2, 100, width + 200, 0));
  boundaries.push(new Boundary(width + 100, height / 2, 100, width + 200, 0));

  //grandes
  particles.push(
    new Particle(random(100, 400), random(100, 300), random(150, 180))
  );
  particles.push(
    new Particle(random(100, 400), random(200, 400), random(150, 180))
  );
  particles.push(
    new Particle(random(200, 300), random(200, 300), random(80, 130))
  );
  particles.push(
    new Particle(random(200, 300), random(20, 300), random(80, 130))
  );
  particles.push(
    new Particle(random(200, 400), random(200, 400), random(80, 130))
  );

  // add mouse control
  var canvasmouse = Mouse.create(canvas.elt);
  var options = {
    mouse: canvasmouse,
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  background(118, 194, 166);

  drawColorsBeige();
  drawColorsCeleste2();
  drawColorsCeleste1();
  drawColorsNaranja();

  Engine.update(engine);
  for (var i = 0; i < boundaries.length; i++) {
    /// dibuja los limites
    boundaries[i].show();
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  // linea
  // strokeWeight(4);
  // stroke(245, 0, 0);
  //line(particles[0].body.position.x,particles[0].body.position.y, particles[1].body.position.x, particles[1].body.position.y);

  //marco
  noFill();
  strokeWeight(80);
  stroke(245);
  rect(0, 0, width, height);
}


function getRandomDiameter() {
  return Math.random() * (180 - 20) + 20; //  diámetro aleatorio entre 20 y 180
}


