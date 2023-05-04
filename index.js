//constants,variables
let inputDir = {x:0,y:0};
//let lastinputDir = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
   {x:13,y:15}
]
food = {x:6 , y:7};

// functions
function main(ctime){
   window.requestAnimationFrame(main);
   //console.log(ctime);
   if((ctime-lastPaintTime)/1000 < 1/speed){
      return;
   }
   lastPaintTime = ctime;
   gameEngine();

}

function isCollide(snake){
   //if you bump yourself
   for(let i = 1; i<snakeArr.length;i++){
      if(snake[i].x===snake[0].x && snake[i].y === snake[0].y){
         return true;
      }
   }  // bump into wall
   if (snake[0].x >= 21 || snake[0].x<=0 || snake[0].y >=21 || snake[0].y<=0){
      return true
   }
}
   

function gameEngine(){

   //part1: update snake array and food


   if(isCollide(snakeArr)){
      gameOverSound.play();
      musicSound.pause();
      inputDir = {x:0,y:0};
      alert("Game Over. Press any key to play again..");
      snakeArr = [ 
         {x:13,y:15}
      ]
      musicSound.play();
      score = 0;
   }

   
   // if you eat food increment score and add new food
   if(snakeArr[0].x===food.x &&snakeArr[0].y === food.y){
      foodSound.play()
      score+=1;
      if(score > hiscoreval){
         hiscoreval = score;
         localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
         hiscoreBox.innerHTML = "Hiscore:"+hiscoreval;
      }
      scoreBox.innerHTML = "Score: "+score;
      snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y+inputDir.y});
      food = {x:Math.round(1+(20-1)*Math.random()),y:Math.round(1+(20-1)*Math.random())};
   }

   //moving snake
   for(let i = snakeArr.length-2 ; i>=0;i--){
      snakeArr[i+1] = {...snakeArr[i]};
   }
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;



   //part2: display snake
   board.innerHTML = "";
   snakeArr.forEach((e,index)=>{
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
            
      if(index === 0){
         snakeElement.classList.add('head');
      }
      else{
         snakeElement.classList.add('snake');
      }

      board.appendChild(snakeElement);

   });

   //display food

   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food');
   board.appendChild(foodElement);

}


//Main
musicSound.play()
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
   hiscoreval = 0;
   localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
   hiscoreval = JSON.parse(hiscore);
   hiscoreBox.innerHTML = "Hiscore:"+hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
   inputDir = {x:0,y:1} //Game starts
   moveSound.play();
   switch(e.key){
      case "ArrowUp":
         //if(lastinputDir.y!==0) break
         //console.log("Arrowup");
         inputDir.x=0;
         inputDir.y=-1;
         break;
      case "ArrowLeft":
         //if(lastinputDir.x!==0) break
         inputDir.x=-1;
         inputDir.y=0;
         //console.log("ArrowLeft");
         break;
      case "ArrowDown":
         //if(lastinputDir.y!==0) break
         inputDir.x=0;
         inputDir.y=1;
         //console.log("ArrowDown");
         break;
      case "ArrowRight":
         //if(lastinputDir.x!==0) break
         inputDir.x=1;
         inputDir.y=0;
         //console.log("ArrowRight");
         break;
      
   }
   


});
//lastinputDir = inputDir;


 