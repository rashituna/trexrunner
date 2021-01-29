
var trex,trex_running,edges,ground,ground_move,ground2,
    cloudimg,cloud,o1,o2,o3,o4,o5,o6,obstacle,
    groupcl,groupobst,trexcollided,goimg,go,reimg,re;
var score=0
var PLAY=1
var END=0
var gameState=PLAY
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
ground_move= loadImage("ground2.png")
  cloudimg= loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  trexcollided=loadAnimation("trex_collided.png")
  goimg=loadImage("gameOver.png")
  reimg=loadImage("restart.png")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.scale=0.5
  edges=createEdgeSprites()
  ground=createSprite(300,180,600,10)
  ground.addImage("gr",ground_move)
  ground.x=ground.width/2
  ground2=createSprite(300,190,600,10)
  ground2.visible=false
  groupcl=createGroup()
  groupobst=createGroup()
go=createSprite(300,70,10,10)
  go.addImage("go",goimg)
re=createSprite(300,100,10,10)
  re.addImage("re",reimg)
  re.scale=0.6
  go.scale=0.6
}

function draw(){
  background("white")
  

  text("score:"+score,500,50)
 
  trex.collide(ground2)
  if(gameState===PLAY){
    if(keyDown("space")&&trex.y>=161){
    trex.velocityY=-8
  }
  console.log(trex.y)
  ground.velocityX=-2
  if(ground.x<0){
    ground.x=ground.width/2
    
  }
     trex.velocityY=trex.velocityY+0.8
    score=score+Math.round(getFrameRate()/60)
    go.visible=false
    re.visible=false
    spclo();
  spobstacle();
    if(groupobst.isTouching(trex)){
      gameState=END
    }
  }
  else if(gameState===END){
    ground.velocityX=0
    trex.velocityY=0
     trex.changeAnimation("collided", trexcollided)
    groupcl.setVelocityXEach(0)
    groupobst.setVelocityXEach(0)
    groupobst.setLifetimeEach(-1) 
    groupcl.setLifetimeEach(-1)
    re.visible=true
    go.visible=true
    if(mousePressedOver(re)){
      reset()
    }
  }
  
  drawSprites();

}
function reset(){
  
}
function spclo(){
 if(World.frameCount%60===0){
  cloud = createSprite(600,random(100,120),10,10);
cloud.addImage("cloud",cloudimg);
cloud.scale=0.7
cloud.velocityX=-3
   trex.depth=cloud.depth
   trex.depth=trex.depth+1
   groupcl.add(cloud)
   cloud.lifetime=200
     
}
}
function spobstacle(){
  if(World.frameCount%80===0){
    obstacle=createSprite(600,160,10,40)
    obstacle.velocityX=-3
    var ran= Math.round(random(1,6))
    switch(ran){
      case 1:obstacle.addImage(o1)
    break;
    case 2:obstacle.addImage(o2)
    break;
    case 3:obstacle.addImage(o3)
    break;
    case 4:obstacle.addImage(o4)
    break;
    case 5:obstacle.addImage(o5)
    break;
    case 6:obstacle.addImage(o6)
    break;
    default:break
    }
    obstacle.scale=0.5
    groupobst.add(obstacle)
    obstacle.lifetime=200
  }
    
}