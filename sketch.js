var Engine = Matter.Engine,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;
 
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score1,score2,score3,score4,score5;
var score = 0
var turns = 0;
var particle;
var state = "play";
var score_title, turns_title, over, restart;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  score_title = createElement("h3");
  score_title.elt.id = "title";
  score_title.position(20, -15);

  turns_title = createElement("h3");
  turns_title.elt.id = "title";
  turns_title.position(200, -15);

  over = createElement("h3");
  over.elt.id = "over";
  over.position(240, 270);
  over.html("Game Over!");
  over.hide();

  restart = createButton("Restart");
  restart.elt.id = "restart";
  restart.position(332, 430);
  restart.hide();

  score1 = Math.round(random(1,5))*50;
  score2 = Math.round(random(1,5))*50;
  score3 = Math.round(random(1,5))*50;
  score4 = Math.round(random(1,5))*50;
  score5 = Math.round(random(1,5))*50;
  score6 = Math.round(random(1,5))*50;
  score7 = Math.round(random(1,5))*50;
  score8 = Math.round(random(1,5))*50;
  score9 = Math.round(random(1,5))*50;
  score10 = Math.round(random(1,5))*50;

  for (var k = 0; k <=width; k = k + 80){
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50){    
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){    
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){    
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){    
    plinkos.push(new Plinko(j,375));
  }    
}

function draw() {
  background("black");
  Engine.update(engine);

  score_title.html("Score: " + score);
  turns_title.html("Turns Left: " + (5 - turns));

  textSize(20)
  text(score1, 20, 530);
  text(score2, 105, 530);
  text(score3, 185, 530);
  text(score4, 260, 530);

  text(score5, 340, 530);
  text(score6, 420, 530);
  text(score7, 500, 530);

  text(score8, 580, 530);
  text(score9, 660, 530);
  text(score10, 740, 530);

  push();
  stroke("yellow");
  strokeWeight(10);
  line(0,450,800,450);
  pop();
  
  for (var i = 0; i < plinkos.length; i++) {     
    plinkos[i].display();     
  }
 
  for (var k = 0; k < divisions.length; k++) {     
    divisions[k].display();
  }

  if(turns >= 5){
    state = "end";
    if(particle==null){
      push();
      strokeWeight(6);
      stroke("red")
      rectMode(CENTER)
      rect(400,400,400,200,30);
      pop();
      over.show();
      restart.show();
    }
  }

  if(particle){
    particle.display();

    if(particle.body.position.y > 760 && particle.body.position.y < 780){
      if(particle.body.position.x < 80){
        score+=score1;
      }
      if(particle.body.position.x > 80 && particle.body.position.x < 160){
        score+=score2;
      }
      if(particle.body.position.x > 160 && particle.body.position.x < 240){
        score+=score3;
      }
      if(particle.body.position.x > 240 && particle.body.position.x < 320){
        score+=score4;
      }
      if(particle.body.position.x > 320 && particle.body.position.x < 400){
        score+=score5;
      }
      if(particle.body.position.x > 400 && particle.body.position.x < 480){
        score+=score6;
      }
      if(particle.body.position.x > 480 && particle.body.position.x < 560){
        score+=score7;
      }
      if(particle.body.position.x > 560 && particle.body.position.x < 640){
        score+=score8;
      }
      if(particle.body.position.x > 640 && particle.body.position.x < 720){
        score+=score9;
      }
      if(particle.body.position.x > 720 && particle.body.position.x < 800){
        score+=score10;
      }

      World.remove(world, particle.body)
      particle = null;
    }
  }

  restart.mousePressed(()=>{
    score = 0;
    turns = 0;
    state = "play";
    over.hide();
    restart.hide();
  })
}

function mousePressed(){
  if(state=="play"){
    turns+=1;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}