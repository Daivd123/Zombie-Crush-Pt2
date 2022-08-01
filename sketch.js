const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.bodies;
const Constraint = Matter.constraint;
const Body = Matter.body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var jointPoint;
var jointLink;
var zombie;
var zombie1, zombie2, zombie3, zombie4;
var breakButton;
var backgroundImage;

var stones = [];

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie3.png");

  backgroundImage = loadImage("./assets/background.png");
}


function setup() {
createCanvas( windowWidth, windowHeight);
engine = Engine.create();
world = engine.world;
frameRate(80);

ground = new Base(0, height - 10, width * 2, 20, "#0ac2bc", true);
leftWall = new Base(300, height / 2 + 50, 600, 100, "#a089b3", true);
rightWall = new Base(300, height / 2 + 50, 600, 100, "#cfe376", true);

bridge = new bridge(15, { x: width / 2 - 400, y: height / 2 });
jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#ff0000");

Matter.Composite.add(bridge.body, joinPoint);
jointLink = new Link(bridge, joinPoint);

for (var i = 0; i <= 8; i++) {
  var x = random(width / 2 - 200, width / 2 + 300);
  var y = random(-10, 140);
  var stone = new Stone(x, y, 80, 80);
  stones.push(stone);
  }


  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("leftorright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw () {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var stone of stones) {
    stone.show(); 
}

if (zombie.position.x >= width - 300) {
  zombie.velocityX = -10;
  zombie.changeAnimation("rightorleft");
}

if(zombie.position.x <= width - 300) {
  zombie.velocityX = 10;
  zombie.changeAnimation("lefttoright");
}

drawSprites ();


function handleButtonPress () {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}