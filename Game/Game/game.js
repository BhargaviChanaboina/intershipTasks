window.addEventListener("keydown", dealWithKeyboard, false);
window.addEventListener("keypress", dealWithKeyboard, false);
window.addEventListener("keyup", dealWithKeyboard, false);
var speed=150;
var direction=39;
var y=1;
var x=1;
var points = 0;
var over = false;
var snake = document.getElementById('move');
var food =  document.getElementById('foodId');
var score = document.getElementById('scoreId');
var refreshIntervalId;
var food_x = 50;
var food_y = 50;
var snake_parts = new Array();
snake.style.position = "absolute";
snake_parts.push({"x":1,"y":3});
snake_parts.push({"x":1,"y":2});
snake_parts.push({"x":1,"y":1});
//console.log(snake_parts);

function setSpeed(id){
	speed = id.value;
}
function getRandomFood() {
  return Math.floor(Math.random() * (390)) + 1;
}
function place_food()
{
	food.style.left = food_y+'px';
	food.style.top  = food_x+'px';
}
place_food();
function dealWithKeyboard(e) {
	  if(over) return;
	  direction = e.keyCode;
	  if(direction<37||direction>40)
	  {
	  	if(refreshIntervalId)
	  	{
		clearInterval(refreshIntervalId);
		refreshIntervalId=null;
		return;
	    }
	    else
	    direction = prev;	
	  }
	  prev = direction;
	  if (refreshIntervalId) {
		clearInterval(refreshIntervalId);
		refreshIntervalId=null;
	  }
	  refreshIntervalId = setInterval(function game(){
	  	snake_parts.pop();
	  	if (direction===37)
	  	snake_parts.unshift({"x":x,"y":y-=10});
	    else if(direction===38) 
	    snake_parts.unshift({"x":x-=10,"y":y});
	    else if(direction===39)
	  	snake_parts.unshift({"x":x,"y":y+=10});
	    else
	  	snake_parts.unshift({"x":x+=10,"y":y});
	    
	  	var myNode = document.getElementById("move");
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}
	  for (var i = 0; i < snake_parts.length; i++) {
        var node = document.createElement("div");
	  	node.setAttribute("class","dot");
	  	node.setAttribute("id","dot"+i);
	  	if(i==0)
	  	node.setAttribute("style",'background:orange;z-index:1000;left:'+snake_parts[i].y+'px;top:'+snake_parts[i].x+'px;');
	    else
	    node.setAttribute("style",'left:'+snake_parts[i].y+'px;top:'+snake_parts[i].x+'px;');	
	  	document.getElementById("move").appendChild(node);
      }
      for (var i = snake_parts.length - 1; i > 0; i--) {
      	if(Math.abs(snake_parts[0].x-snake_parts[i].x)==0&&Math.abs(snake_parts[0].y-snake_parts[i].y)==0)
      	{
      	var audio = new Audio('game.mp3');
        audio.play();
	  	clearInterval(refreshIntervalId);

	  	//snake.innerHTML='<h1 class="over">Game Over <a href="file:///C:/Users/arun/Desktop/Game/game.html">Restart</a></h1>';
	  	food.parentNode.removeChild(food);
	  	over = true;
      	}	
      }
      if(x<0||x>399||y<0||y>399)
	  {
	  	var audio = new Audio('game.mp3');
        audio.play();
	  	clearInterval(refreshIntervalId);
	  	//snake.innerHTML='<h1 class="over">Game Over <a href="file:///C:/Users/arun/Desktop/Game/game.html">Restart</a></h1>';
	  	food.parentNode.removeChild(food);
	  	over = true;
	  }
	  if(Math.abs(snake_parts[0].x-food_x)<10&&Math.abs(snake_parts[0].y-food_y)<10)
	  {
	  	points++;
	  	score.innerText = points;
	  	food_x = getRandomFood();
	  	food_y = getRandomFood();
	  	place_food();
	  	var len =snake_parts.length;
	  	snake_parts.push({"x":snake_parts[len-1].x,"y":snake_parts[len-1].y});
	  }
      console.log(snake_parts[0].x+" "+snake_parts[0].y);
	  
	  /*console.log(y_pos);
	  console.log(food_x);
	  console.log(food_y);*/
	  }, speed);
}