const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var muteButton
var blower

var bg_img;
var food;
var rabbit;
var airSound


var ropeSound,eatingSound
var button;
var button1
var button2
var bunny;

var cWidth,cHeight;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
 

 
  
  blink.playing = true;
  eat.playing = true;
  
  eat.looping = false; 

  
  ropeSound = loadSound('rope_cut.mp3') 
  eatingSound = loadSound('eating_sound.mp3')
  airSound = loadSound('air.wav')
  
  
}

function setup() {
  
  var isMobile = /iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    cWidth = displayWidth
    cHeight = displayHeight
    createCanvas(cWidth,cHeight)
  }

  else{
    cWidth = windowWidth
    cHeight = windowHeight
    createCanvas(cWidth,cHeight);
  }

  frameRate(80);
  //bgSound.play()
  
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(width/2-250,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(width/2-500,40);
  button1.size(50,50);
  button1.mouseClicked(drop1);
  
  

  rope = new Rope(7,{x:width/2-250,y:30});
  rope1 = new Rope(7, {x:width/2-500,y:40});
  

  ground = new Ground(width/2,height,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  

  bunny = createSprite(width/2+600,height-120,100,100);
  bunny.scale = 0.3;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  

  blower = createImg('blower.png')
  blower.position(width/2-600,200)
  blower.size(150,150)
  blower.mouseClicked(airBlow)

 

 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,cWidth,cHeight);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope1.show()
  
  
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    eatingSound.play()
    fruit = null
  }
   
  if(collide(fruit,ground.body,80)==true )
  {
    mute()
     bunny.changeAnimation('crying');
   
    
    }
   
    

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  ropeSound.play()
}

function drop1()
{
  rope1.break();
  fruit_con1.dettach();
  fruit_con1 = null; 
  ropeSound.play()
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  frit_con2 = null; 
  ropeSound.play()
}


function collide(body,sprite,x)
{
  
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
          ;
            
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
airSound.play()
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.1,y:0})
}

function mute(){
if(bgSound.isPlaying()){
  bgSound.stop()
}
else{
  bgSound.play()
}
}