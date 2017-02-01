
document.getElementById("highestScorers").className = "splashHidden";
document.getElementById("splash").className = "splashShow";
document.getElementById("dangerousAlone").className = "splashHidden";


// Reset for new game
function reset(){
	document.getElementById("highestScorers").className = "splashHidden";
	document.getElementById("splash").className = "splashShow";
	document.getElementById('player-name').innerHTML = "Player Name";
	document.getElementById('score').innerHTML = "--";
	document.getElementById('timer').innerHTML = "--";
	document.getElementById('rupee-counter').innerHTML = " --";
	// setHearts();

}


// Life bar start with 3 hearts full.
var life = [];
var lifeBar;
var playerNumber = 0;
function setHearts(){
	life = [];

	if(playerNumber <= 1){
		var healthList = document.getElementById('health');
		healthList.removeChild(healthList.childNodes[0]);
	}

	for(var i = 0; i <= 2; i++){
		var heart = new Heart()
		life.push(heart);				
		lifeBar = '<img id="' + i + '" src="' + heart.src + '">';		
		var divEl = document.createElement('div');
		divEl.innerHTML = lifeBar;
		divEl.className = "health-row";
		var healthList = document.getElementById('health');			
		document.getElementById('health').appendChild(divEl);
		healthList.removeChild(healthList.childNodes[0]);
		console.log(life);
	}
	playerNumber++;
	console.log(playerNumber);

	
	heartIndex = life.length-1;

	function Heart(value = 2, src = "images/heart.gif"){
	this.value = value;
	this.src = src;				
	}
}

for(var i = 0; i <= 2; i++){
		var heart = new Heart()
		life.push(heart);				
		lifeBar = '<img id="' + i + '" src="' + heart.src + '">';		
		var divEl = document.createElement('div');
		divEl.innerHTML = lifeBar;
		divEl.className = "health-row";
		document.getElementById('health').appendChild(divEl);
		console.log(life[heartIndex]);
	}
	playerNumber++;
	console.log(playerNumber);
// setHearts();
function Heart(value = 2, src = "images/heart.gif"){
	this.value = value;
	this.src = src;				
}
var heartIndex = life.length-1;
	
function hitCheck (heartIndex){
	if (life[heartIndex].value == 1) {
		// console.log("heartIndex: " + heartIndex + ", value: " + life[heartIndex].value);
		// console.log(life[heartIndex]);
		// life[heartIndex].src = "half-heart.gif";
		var heart = new Heart(1, "half-heart.gif");
		life.splice(heartIndex, 1, heart);
		document.getElementById(heartIndex).src = "half-heart.gif";
		// lifeBar = '<img src="' + heart.src + '">';
		// var divEl = document.createElement('div');
		// divEl.innerHTML = lifeBar;
		// divEl.className = "health-row";
		// document.getElementById('health').appendChild(divEl);
	}
	if (life[heartIndex].value == 0) {
		// console.log("heartIndex: " + heartIndex + ", value: " + life[heartIndex].value);
		// life[heartIndex].src = "empty-heart.gif";
		var heart = new Heart(0, "empty-heart.gif");
		life.splice(heartIndex, 1, heart);
		document.getElementById(heartIndex).src = "empty-heart.gif";
		// lifeBar = '<img src="' + heart.src + '">';
		// var divEl = document.createElement('div');
		// divEl.innerHTML = lifeBar;
		// divEl.className = "health-row";
		// document.getElementById('health').appendChild(divEl);

		// heartIndex--;
	}
	// if (life[heartIndex].value < 0) {
	// 	heartIndex--;
	// }

	if (life[0].value == 0) {
		gameOver();
	}
}



// 	document.getElementById('health').innerHTML = heart.src;


// If new heart container, UNSHIFT array once for new heart.

// Max life is 12 life or 6 hearts.


// Logic to decide how to remove and Then, add life.
// I made the heartIndex counter and shifted as values of each heart decreased. Just need to add the heart gifs^^^





function Player(name){
	this.name = name;
	this.score = 0;
	this.highscore = 0;
}

var playerArray = [];
var currentPlayerIndex;


function newPlayer(){
	var playerNameDiv = document.getElementById('player-name');
	var playerName = playerNameDiv.value;
	playerArray.push(new Player(playerName));
	console.log(playerArray);
	document.getElementById("start").style.display = "block";
	document.getElementById("player").style.display = "none";
	document.getElementById("player-name").style.display = "none";
	currentPlayerIndex = playerArray.length-1;
	playerArray[currentPlayerIndex].score = gameStart;
	gameStart = 0;
	playerScore = 0;
	rupeeCount = 0;
	reset();
}



function startGame(){
	gameOn = true;
	// gameStart++;
	// gameStart = Date.now();
	// gameEnd = Date.now() + 300000;
	timerInterval = setInterval(updateTimer, 100);
	document.getElementById("start").style.display = "none";
	if(gameOn){
		document.getElementById("splash").className = "splashHidden";

	}
}
var newHighScore = false;
function updateTimer(){
	gameStart++;
	if(gameOn == false){
		clearInterval(timerInterval);
	}
	playerArray[currentPlayerIndex].score = gameStart;
	playerScore = playerArray[currentPlayerIndex].score;
	// console.log(playerScore);
	if (playerArray[currentPlayerIndex].score > storedHighScore){
		playerArray[currentPlayerIndex].highscore = storedHighScore;
		storedHighScore = playerArray[currentPlayerIndex].score;
		newHighScore = true;
		// console.log(playerArray[currentPlayerIndex].score);
		
	}
	
	document.getElementById('timer').innerHTML = ((gameStart/10)).toFixed(1) + " seconds";
	document.getElementById('score').innerHTML = playerArray[currentPlayerIndex].score;
	document.getElementById('hi-score').innerHTML = storedHighScore;
	
	if(newHighScore == true){
		// console.log(playerArray);
		highestScores = playerArray.slice(0,playerArray.length);
		highestScores.sort(compare);

		// console.log("storedHighScore = " + (storedHighScore+1));	
		document.getElementById('hi-score').innerHTML = (storedHighScore+1);				
		// console.log(highestScores);
		// console.log("added to highestScores");
	}

	function compare(a,b) {
		if (a.score < b.score){
			return -1;
		}
	  	if (a.score > b.score){
	    	return 1;
	  	}
	  	return 0;
	}
	
}
var highestScores = [];
var gameStart = 0;
var gameEnd = 0;
var timerInterval;
var playerScore = 0;
var blinking = false;
var storedHighScore = 100;
var scoreDisplay;
var rupeeCount = 0;


function levels(){
	if (gameStart <= 30){
		gameOn = true;
	}

	if (gameStart == 30){
		gameOn = false;
		setTimeout(function(){gameOn = true;}, 5000);
		document.getElementById("dangerousAlone").className = "splash";
	}

	if (gameStart == 40){
		gameOn = true;
		document.getElementById("dangerousAlone").className = "splashHidden";
	}

}


// gameOver saves the current time, score, compares to highscore, records highscore, sets gameOn to false and displays new player entry
function gameOver(){
	console.log("GAME OVER");
	gameOn = false;
	gameEnd = 0;
	timerInterval;
	storedHighScore;
	document.getElementById("player").style.display = "inline-block";
	document.getElementById("player-name").style.display = "inline-block";
	for(var i = 0; i < highestScores.length; i++){
		///////////
		scoreDisplay = '<span id="highestArrayName' + [i] + '"> </span> - <span id="highestArrayScore' + [i] + '"> </span>';		
		var lineEl = document.createElement('li');
		lineEl.innerHTML = scoreDisplay;
		lineEl.className = "scoreLine";	
		lineEl.id = "scoreLine" + [i];	
		document.getElementById('scoreList').appendChild(lineEl);
		///////////
		// document.getElementById('highestArray').innerHTML = highestScores[i.name, i.highscore];
		document.getElementById('highestArrayName' + [i]).innerHTML = highestScores[i].name;
		document.getElementById('highestArrayScore' + [i]).innerHTML = (highestScores[i].highscore)+1;
	}
	document.getElementById("highestScorers").className = "splashShow";

	setHearts();
	

}

// Create canvas tag with js.
var canvas = document.createElement('canvas');
// Create context for (Methods and properties)
var context = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 480;

// Add to the DOM.
document.body.appendChild(canvas);

// document.getElementById('game').appendChild(canvas);

var backgroundImage = new Image();
backgroundImage.src = "images/background-1.png";

var speedModifier = .5; 

var monsterSpeedModifier = 4.29;

var playerHits = 0;

var gameOn = false;



// Make the sword
// var sword = new Image();
// sword.src = "sword.png";
// var swordLocation = {
// 	x: 240,
// 	y: 226
// }

// make a var for hero.
var hero = new Image();
hero.src = "images/link_down.png";
var heroLocation = {
	x:300,
	y:200
}

// function monster = new Monster(){
// 	this.src = 
// }

// Make a var for the monster.
var monster = new Image();
monster.src = "images/octorok-front.gif";
var monsterLocation = {
	x:180,
	y:100,
	newX:180,
	newY:100
}

// function to make a new rupee
var rupee = new Image();
rupee.src = "images/5-rupees.gif";
rupee.id = "aRupee";
rupee.className = "rupeesClass";
rupee.width = 10;
rupee.height = 20;
var rupeeLocation = {
	x:400,
	y:400
}
console.log(rupee);


	
	// document.getElementById("aRupee").className = " splashHidden";
	



///////////////////////////
//Sprite animations




///////////////////////////

// CANVAS PROPERTIES
var ctx = canvas.getContext('2d');
ctx.lineWidth = 50;
ctx.strokeStyle = '#aaa';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowBlur = 10;
ctx.shadowColor = '#000';

// // CANVAS MATH
// var x = heroLocation.x,
//     y = heroLocation.y,
//     radius = 100,
//     circum = Math.PI * 2,
//     start = Math.PI / 2, // Start position (top)
//     finish = 100, // Finish (in %)
//     curr = 0; // Current position (in %)

// // CANVAS ANIMATION

// // Enables browser-decided smooth animation (60fps)
// var raf =
//     window.requestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.msRequestAnimationFrame;
// window.requestAnimationFrame = raf;

// // Animate function
// function animate(draw_to) {
//   // Clear off the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // ctx.clearRect(0, 0, width, height);
//   // Start over
//   ctx.beginPath();
//   // arc(x, y, radius, startAngle, endAngle, anticlockwise)
//   // Re-draw from the very beginning each time so there isn't tiny line spaces between each section (the browser paint rendering will probably be smoother too)
//   ctx.arc(x, y, radius, start, draw_to, false);
//   // Draw
//   ctx.stroke();
//   // Increment percent
//   curr++;
//   // Animate until end
//   if (curr < finish + 1) {
//     // Recursive repeat this function until the end is reached
//     requestAnimationFrame(function () {
//       animate(circum * curr / 10 + start);
//     }); 
//   }
//   // animateSword();
// }


///////////////////////////




// An array to hold all keys down.
var keysDown = [];

addEventListener('keyup', function(event){
	delete keysDown[event.keyCode];

});

// Need a way to check for arrow keypresses.
addEventListener('keydown', function(event){
	// if keyDown[39] is true, right arrow was pushed
	// if keyDown[40] is true, down arrow was pushed
	// if keyDown[37] is true, left arrow was pushed
	// if keyDown[48] is true, up arrow was pushed
	keysDown[event.keyCode] = true;
	// we know a key was pressed at this point.
	// what key did they press?
	// console.log(event.key);
	// if(event.key === 'ArrowDown'){
	// 	console.log('User pressed Down Arrow');
	// 	heroLocation.y += 10;
	// }
	// if(event.key === 'ArrowUp'){
	// 	console.log('User pressed Up Arrow');
	// 	heroLocation.y -= 10;
	// }
	// if(event.key === 'ArrowLeft'){
	// 	console.log('User pressed Left Arrow');
	// 	heroLocation.x -= 10;
	// }
	// if(event.key === 'ArrowRight'){
	// 	console.log('User pressed Right Arrow');
	// 	heroLocation.x += 10;
	// }
});
// this is where we will update the hero's position based on keysDown info.
function update(){
	
	//User pressedright at some point
	
		
	if(39 in keysDown || 68 in keysDown){
		hero.src = "images/link_right.png";
		if(heroLocation.x <= 450){
			heroLocation.x += (10 * speedModifier);
		}
	}
	if(37 in keysDown || 65 in keysDown){
		hero.src = "images/link_left.png";
		if(heroLocation.x >= 25){
			heroLocation.x -= (10 * speedModifier);
		}
	}
	if(38 in keysDown || 87 in keysDown){
		hero.src = "images/link_up.png";
		if(heroLocation.y >= 25){
			heroLocation.y -= (10 * speedModifier);
		}				
	}
	if(40 in keysDown || 83 in keysDown){
		hero.src = "images/link_down.png";
		if(heroLocation.y <= 410){
			heroLocation.y += (10 * speedModifier);
		}		
	}

	if((32 in keysDown) && (hero.src == "images/link_right.png")){
		console.log("right thrust!");
	}

	if((32 in keysDown) && (hero.src == "images/link_left.png")){
		console.log("left thrust!");
	}

	if(32 in keysDown && hero.src == "images/link_up.png"){
		console.log("up thrust!");
	}

	if(32 in keysDown && hero.src == "images/link_down.png"){
		console.log("down thrust!");
	}

	if(
	(heroLocation.x <= rupeeLocation.x + 20)
	&& (heroLocation.y <= rupeeLocation.y + 30)
	&& (rupeeLocation.x <= heroLocation.x + 20)
	&& (rupeeLocation.y <= heroLocation.y + 30)
){
	rupeeCount += 5;
	rupeeLocation.x = Math.floor(Math.random() * 0);
	rupeeLocation.y = Math.floor(Math.random() * 0);
	document.getElementById('rupee-counter').innerHTML = " - " + rupeeCount;
	context.clearRect(rupeeLocation.x, rupeeLocation.y, rupee.width, rupee.height);
	setInterval(rupeeLocation.x = Math.floor(Math.random() * 480), rupeeLocation.y = Math.floor(Math.random() * 450), 5000);
		
	console.log("rupee!!");
}


	if(
		(heroLocation.x <= monsterLocation.x + 32)
		&& (heroLocation.y <= monsterLocation.y + 32)
		&& (monsterLocation.x <= heroLocation.x + 32)
		&& (monsterLocation.y <= heroLocation.y + 32)
	){
		// console.log("Hero is left of monster");
		
		// blinking = setInterval(blinking, 0);
		// clearInterval(blinking);

		playerHits++;
		document.getElementById('deaths').innerHTML = "Hits: " + playerHits;
		// Decriment Health
		// heart at life[0] subtracts 1
		if(life[heartIndex].value > 0){
			life[heartIndex].value--;
		}else if(life[heartIndex].value <= 0){
			// console.log("decriment heartIndex");
			heartIndex --;
			life[heartIndex].value--;
		}
		hitCheck(heartIndex);
		// set new monsterLocation
		var random = Math.random() * 450;
		var random2 = Math.random() * 400;
		monsterLocation.x = random;
		monsterLocation.y = random2;
		// blinking = false;
	}else{
		// console.log("Hero is not close enough");
	}
}

// This will handle the monster updates and movement
function monsterUpdate(){
	if(
		(monsterLocation.newX <= monsterLocation.x + 31)
		&& (monsterLocation.newY <= monsterLocation.y + 31)
		&& (monsterLocation.x <= monsterLocation.newX + 31)
		&& (monsterLocation.y <= monsterLocation.newY + 31)
	){
		monsterLocation.newX = Math.ceil(Math.random() * 450);
		monsterLocation.newY = Math.ceil(Math.random() * 400);
		// console.log("set new location");
	}

	if(monsterLocation.x > monsterLocation.newX){
		monsterLocation.x -= 1 * monsterSpeedModifier;     
	}
	if(monsterLocation.x < monsterLocation.newX){
		monsterLocation.x += 1 * monsterSpeedModifier;
	}
	if(monsterLocation.y > monsterLocation.newY){
		monsterLocation.y -= 1 * monsterSpeedModifier;
	}
	if(monsterLocation.y < monsterLocation.newY){
		monsterLocation.y += 1 * monsterSpeedModifier;
	}

}

// This is where I will create timers
// First I need a timer for time played counting up until collision.

/* Do the function, call every 20 milliseconds*/
// startTime=new Date();

// drawFinalScore();

// // turn on the ticker and get a reference to the object
// var theInterval=setInterval(playGame, 20);

// // turn off the ticker
// clearInterval(theInterval);


// Then, add a timer for levels - every 30 sec add new goblin.





// This will handle the animation of the sword and the logic of hitting the monster.
// function animateSword(){

// 	var i = 0;

// 	function loop(){
// 		setTimeout(function(){
// 			i++;
// 			ctx.clearRect(0, 0, 512, 480);

// 			drawImageRot(sword, swordLocation.x, swordLocation.y, 32, 32, i);
// 			loop();
// 		}, 200)
// 	}
// 	function drawImageRot(img,x,y,width,height,deg){
// 		var rad = deg * Math.PI / 180;
// 		ctx.translate(x + width / 2, y + height /2);

// 		ctx.rotate(.5);
// 		ctx.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);
// 		ctx.rotate(rad * (-1));

// 		ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
// 	}
// 	loop();

// }

// Keep at the bottom!
function draw(){
	if(gameOn){
		update();
		monsterUpdate();
		levels();
	}
	
	// Put backgroundImage on context at x = 0, y= 0
	context.drawImage(backgroundImage,0,0);
	ctx.drawImage(hero,heroLocation.x,heroLocation.y);
	context.drawImage(rupee,rupeeLocation.x,rupeeLocation.y);
	ctx.drawImage(monster,monsterLocation.x,monsterLocation.y);
	requestAnimationFrame(draw);
	// var frequency = 200;

	// setInterval( if (!blinking || Math.floor(Date.now() / frequency) % 2) {
	// 	ctx.drawImage(hero,heroLocation.x,heroLocation.y);				
	// 	if (!blinking || Math.floor(Date.now() / frequency) % 2){
	// 		ctx.drawImage(hero,heroLocation.x,heroLocation.y);
	// 		blinking = false;
	// 		clearInterval(blinking);
	// 	}
	// }, 1000);
	
}

draw();