//Creats canvas and content holder
var canvas;
var context;
//Creates instance of player
var user = new player(100, 100, 25, 25, 10,5);
//Arrays that hold objects
var enemies;
var objects;
var attacks;
var direction; // 0 = Left, 1 = Right 

//function init() {
  canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  enemies = [];
  objects = [];
  attacks = [];
  direction = 0;
  
  draw();
  setInterval("draw()", 1000/60); 
//}

//Painter and game loop
function draw() {
	context.fillStyle = "#000000";
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (user != null) {
    if (user.health < 0) {user = null;}// Kills player with no health
 	  context.fillRect(user.x, user.y, user.width, user.height);
    if (user.health >= 4) {
      context.fillStyle = "#00FF00";
	    context.fillRect(user.x-15, user.y-10, (16*user.health), 5);  
    }
    else if (user.health >= 2) {
      context.fillStyle = "#FFFF00";
	    context.fillRect(user.x-15, user.y-10, (16*user.health), 5);
    }
    else {
      context.fillStyle = "#FF0000";
	    context.fillRect(user.x-15, user.y-10, (16*user.health), 5);
    }
  }
  context.fillStyle = "#000000";
	for (var i = 0; i < attacks.length; i++) {
		context.fillRect(attacks[i].x, attacks[i].y, attacks[i].width, attacks[i].height);
		attacks[i].frames -= 1;
		if (attacks[i].frames == 0) {attacks.length = 0;}
	}  
	for (var i = 0; i < enemies.length; i++) {
		context.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
	}  
	for (var i = 0; i < objects.length; i++) {
		context.fillRect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
	}
}

//Constructors
function player(x, y,width,height, dx, health) {
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	this.dx = dx;
  this.health = health;
}
function object(x,y,width,height,f) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.frames = f;
}
function enemy() {
    
}

//Player methods
user.moveUp = function() {
	this.y -= this.dx;
}
user.moveDown = function() {
	this.y += this.dx;
}
user.moveRight = function() {
	this.x += this.dx;
  direction = 1;
}
user.moveLeft = function() {
	this.x -= this.dx;
  direction = 0;
}
user.attack = function(length,frames) { //Attack needs to disappear
  if(direction == 0){
    var attack = new object(this.x - length, this.y, length, this.height, frames); 
  }
  else {
	  var attack = new object(this.x + this.width, this.y, length, this.height, frames);
 }
	attacks.push(attack);
  this.health -= 1;
}
user.collision = function() {

}


//Keylistner
document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) {
		user.moveLeft();
	}
	if (event.keyCode == 39) {
		user.moveRight();
	}
  if (event.keyCode == 38) {
		user.moveUp();
	}
	if (event.keyCode == 40) {
		user.moveDown();
	}
	if (event.keyCode == 32) {
		user.attack(15, 3);	
	}
});
