var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg, wizard, ground;
var wizardImg, wizardShootImg, bgImg, groundImg;
var spider, spidersGroup, spiderImg;
var fire, fireImg;
var gameOver, gameOverImg;

function preload() {
  bgImg = loadImage("bg.jpeg");
  wizardShootImg = loadImage("wizard_shooting.png");
  wizardImg = loadImage("wizard.png");
  spiderImg = loadImage("spiderImg.png");
  fireImg = loadImage("fire.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  bg.addImage("bg", bgImg);
  bg.scale = 2;

  wizard = createSprite(180, 650, 50, 50);
  wizard.addImage("wizard", wizardImg);
  wizard.scale = 0.4;

  gameOver = createSprite(windowWidth/2, windowHeight/2, 10, 10);
  gameOver.addImage("gameOver", gameOverImg);

  spidersGroup = createGroup();

}

function draw() {
  background(225);  

  if (gameState === PLAY) {
    bg.velocityX = -5;
    gameOver.visible = false;

    if(bg.x<0) {
      bg.x = windowWidth/2 + 200;
    }

    if (keyDown("space")) {
      fire = createSprite(180, 625, 10, 10);
      fire.addImage("fire", fireImg);
      fire.scale = 0.3;
      fire.velocityX = 12;

      if (fire.isTouching(spidersGroup)){
        spidersGroup.visible = false;      }
    }

  
    if (spidersGroup.isTouching(wizard)) {
      wizard.destroy();
      gameState = END;
    }
    spawnSpider();

    

  }

  if (gameState === END) {
    bg.velocityX = 0;
    spidersGroup.destroyEach();
    gameOver.visible = true;
    fire.destroy();

  }
  

  drawSprites();
}


function spawnSpider() {
  if (frameCount % 80 === 0) {
    spider = createSprite(50, 0, 10, 10);
    spider.x = Math.round(random(360,1200));
    spider.addImage("spider", spiderImg);
   spider.scale = 0.5;
   spider.velocityY = 5;

   
    //assign lifetime to the variable
   spider.lifetime = 200;
   
   //adding cloud to the group
  spidersGroup.add(spider);

  }
}