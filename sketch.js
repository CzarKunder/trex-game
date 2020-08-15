var trex, trexRunning, trexCollided, ground, groundImage, invisibleGround, cloud, cloudImage, obstacle, obstacle1Image, obstacle2Image, obstacle3Image, obstacle4Image, obstacle5Image, obstacle6Image, ObstaclesGroup, CloudsGroup;
var PLAY = 1,
  END = 0,
  gameState = PLAY;

function preload() {
  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("stillTrex", trexRunning);
  trex.scale = 0.5;
  ground = createSprite(300, 180, 600, 10);
  ground.addImage("groundSprite", groundImage);
  ground.velocityX = -4;
  invisibleGround = createSprite(300, 185, 600, 10);
  invisibleGround.visible = false;
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
}

function draw() {
  background(180);

  if (gameState === PLAY) {
    trex.velocityY = trex.velocityY + 0.8;
    trex.collide(invisibleGround);
    console.log(trex.y);
    spawnClouds();
    spawnObstacles();
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 156) {
      trex.velocityY = -12;
    }
    if(ObstaclesGroup.isTouching(trex)){
      gameState=END; 
    }
  }
  else if(gameState===END){
  trex.velocityY=0;
    trex.velocityX=0;
    ground.velocityX=0;
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    
  }

  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    //assign lifetime to the variable
    cloud.lifetime = 200;
    CloudsGroup.add(cloud);


    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1Image);
        break;
      case 2:
        obstacle.addImage(obstacle2Image);
        break;
      case 3:
        obstacle.addImage(obstacle3Image);
        break;
      case 4:
        obstacle.addImage(obstacle4Image);
        break;
      case 5:
        obstacle.addImage(obstacle5Image);
        break;
      case 6:
        obstacle.addImage(obstacle6Image);
        break;
      default:
        break;
    }


    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}