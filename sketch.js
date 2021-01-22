var balloonImage, balloon;
var backgroundIMG;
var database;
var position;

function preload ()
{
  balloonImage = loadImage ("pro-C35 images/Hot Air Ballon-02.png");
  backgroundIMG = loadImage ("pro-C35 images/BackGround.png");
}


function setup () 
{
  createCanvas(800,400);
  database = firebase.database ();

  balloon = createSprite(100, 295, 50, 50);
  balloon.addImage (balloonImage);
  balloon.scale = 0.4;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readHeight, showError);
}

function draw () 
{
  background(backgroundIMG); 
  textSize (25);
  fill ("black")
  text ("Use the Arrow Keys to Move",20,50);
  
  if (keyDown(LEFT_ARROW))
  {
    balloon.x = balloon.x - 2;
  } else if (keyDown(RIGHT_ARROW))
  {
    balloon.x = balloon.x + 2;
  } else if (keyDown(UP_ARROW)) 
  {
    balloon.y = balloon.y - 2; 
  } else if (keyDown(DOWN_ARROW))
  {
    balloon.y = balloon.y + 2;
  }
  drawSprites();
} 

function readHeight (data)
{
  position = data.val ();
  balloonPosition.x = position.x;
  balloonPosition.y = position.y;
} 

function showError ()
{
  console.log ("Error in writing to the database");
}