// create a class for the Game to handle game states 
class Game {
    constructor(state) {
        this.state = state;
    };

    // get state() {
    //     return this.state;
    // };

    // set state(newState) {
    //     this.gameState = newState;
    // };

};

// URLS
const BASE_URL = "http://localhost:3000"
const PLAYERS_URL = `${BASE_URL}/players`


// create main menu
// let main = document.querySelector('main');

// let mainMenu = document.createElement('div');
// mainMenu.className = "main-menu";

// let usernamePrompt = document.createElement('h1');
// usernamePrompt.innerHTML = "Enter your username below";

// let usernameInput = document.createElement('input');
// usernameInput.type = "text";
// usernameInput.id = "username";

let submitButton = document.getElementById('playerSubmit');
let usernameInput = document.getElementById("username");
// submitButton.type = "submit";

// usernamePrompt.appendChild(usernameInput);
// usernamePrompt.appendChild(submitButton);

// mainMenu.appendChild(usernamePrompt);

// main.appendChild(mainMenu);

// vars for handling canvas & context 
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load title screen & level assets 
let bg = new Image();
bg.src = "assets/purple_bg.jpeg";
let title = new Image();
title.src = "assets/titleScreen.png";
let menu = new Image();
menu.src = "assets/menu.png";

// load sprite assets
let sprite = new Image();
sprite.src = "assets/man_sprite.png";

// set sprite initial values
let sX = 0; //x-axis pos
let sY = 200; //x-axis pos

// set value of gravity / fall speed 
let gravity = 7.5;

let bomb = new Image();
bomb.src = "assets/bomb.png";

// initialize the game session
let masterGame = new Game("title");

title.onload = function() {
    ctx.drawImage(title, 0, 0, 800, 512);

    // cvs.onclick = function() {
        cvs.addEventListener("click", function() {
            changeState(masterGame.state);
        });

        if (masterGame.state === "bg") {
            cvs.removeEventListener("click", changeState);
        };

        submitButton.onclick = function() {
            handlePlayers(usernameInput.value);
        };

        draw(masterGame.state);
    };

  

// };


// am only able to get animations running when they are defined in the global scope??
// FOR LOOP APPROACH 
let obstacles = [];
obstacles[0] = {x: cvs.width, y: 380};


// WHILE LOOP APPROACH
// let obstacle = {
//     x: cvs.width,
//     y: 380
// };

// THIS WORKS!!!!!
// change the requirements for the reloadCounter ,i.e. how many obstacles on the level, depending on a difficulty modifier 
// const DIFFICULTY = 5;
// const GAP = 100;

var reloadCounter = 0;

document.addEventListener("keydown", function(e) {
    if (sX < 705 && sY > -100) {
        // handle jumping using space bar 
        if (e.keyCode === 32) {
            jump();
        };
    
        // handle moving forward using d
        if (e.keyCode === 68) {
            moveRight();
        };
    };

    // handle moving backwards using a
    if (sX > -1) {
        if (e.keyCode === 65) {
            moveLeft();
        };
    };
    
   
});

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 

    if (masterGame.state === "bg") {
        // x = 0, y = 200 is the ground for the man sprite 

        // ********************************************************
        // FOR LOOP APPROACH START 
        // var reloadCounter = 0;
        for (let i = 0; i < obstacles.length; i++) {

            ctx.drawImage(bg, 0, 0, 800, 512);
            ctx.drawImage(sprite, sX, sY, 165, 270); 

            if (reloadCounter == 5) {
                location.reload();
            } else {
                // console.log(reloadCounter);
                ctx.drawImage(bomb, obstacles[i].x, obstacles[i].y, 70, 70);
                obstacles[i].x -= 7.5;

                // collisions

                if (sX + 11 >= obstacles[i].x && sX <= obstacles[i].x + 70 && sY + 180  >= obstacles[i].y) {
                    // sX + 11 >= obstacles[i].x || sX <= obstacles[i].x + 70 && sY + 22  >= obstacles[i].y
                    // (sY <= obstacles[i].y + 30 || sY + 22  >= obstacles[i].y)
                    // sY + 180  >= obstacles[i].y)
                    alert("You hit the bomb!");
                    // alert(`bomb height ${obstacles[i].y}, sprite height ${sprite.height}, sY ${sY}`);
                    location.reload();
                };
                
                if (obstacles[i].x == cvs.width - 900) {
                    obstacles.push({
                        x: cvs.width,
                        y: 380
                    });
                    ++reloadCounter;
                };
            };

            // player sprite fall speed
            if (sY <= 200) {
                sY += gravity;
            }
        };
        // ********************************************************
        // FOR LOOP APPROACH END 
    };
        
    requestAnimationFrame(draw);
};


// Game Menu and Player functions 
    
function changeState(gameState) {
    // if (gameState === "title") {
    //     masterGame.state = "menu";
    //     ctx.drawImage(menu, 0, 0, 800, 512);
    // };
    if (gameState === "title") {
        masterGame.state = "bg";
    };
}

function handlePlayers(name) {
    // make use of find or create by on the backend based off the username provided 
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: name
        })
    };

    return fetch(PLAYERS_URL, configObject)
    .then(response => response.json())
    .then(json => console.log("I was called in fetch!"));
};

function displayPlayerMenu(playerJSON) {
    console.log("I was called!")
    let playerName = document.createElement('h1');
    playerName.innerHTML = playerJSON;

    document.getElementById("main-menu").appendChild(playerName);
};


// Game movement functions 

function jump() {
    sY -= 100;
    sX += 70;
};

function moveRight() {
    sX += 5;
};

function moveLeft() {
    sX -= 5;
};

// update player model progress - have it be an integer that points to a specific set of levels on the frontend 

// draw();


  // ********************************************************
        // WHILE LOOP APPROACH START
        // ctx.drawImage(bomb, obstacles[0].x, 380, 70, 70);
        // ctx.drawImage(bomb, obstacle.x, obstacle.y, 70, 70);
        // // let i = 0;
        // let i = [];
        // while (i.length < 5) {
        //     console.log(i);
        //     // ctx.drawImage(bomb, obstacles[0].x, 380, 70, 70);
        //     // console.log(i);

        //     // obstacles[0].x--;
        //     obstacle.x--;
        //     // --obstacle.x;

        //     // if (obstacles[0].x == cvs.width - 600) {
        //     if (obstacle.x == cvs.width - 600) {
        //         console.log("You hit the inside")
        //         // obstacles.push({
        //         //     x: cvs.width,
        //         //     y: 380
        //         // });
        //         obstacle.x = cvs.width;
        //         // i += 1;
        //         i.push(1);
        //     };

        // WHILE LOOP APPROACH END 
        // ********************************************************

// for (x = 0; x < DIFFICULTY; x++) {
        //     ctx.drawImage(bomb, (200 + GAP + (Math.floor(Math.random() * 500))), 380, 70, 70); 
        // };

        // ctx.drawImage(bomb, 200, 380, 70, 70); 
        // x = 200, y = 380 is the ground for the bomb sprite 


// requestAnimationFrame(draw);

        // let masterGame = new Game("title");
        

        // if player is on start screen & clicks then change state to menu  
        // handle the state check here instead of a sep function? 

        // setTimeout(function() {
        //     if (masterGame.state === "title") {
        //         cvs.onclick = function() {
        //             changeState(masterGame.state);}
        //         ctx.drawImage(bg, 0, 0, 800, 512);
        //     };
        // }, 5000);

        // event was firing autoamtically because I was passing value instead of reference to function 
        // cvs.addEventListener('click', function() {
        //     changeState(masterGame.state)}
        //     );

     
       
        // masterGame.addEventListener("keydown", changeState);


    // requestAnimationFrame(draw);

    // bg.src = "assets/purple_bg.jpeg";
    // ctx.drawImage(bg, 0, 0, 900, 512);
// };