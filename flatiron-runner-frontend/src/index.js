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
let main = document.querySelector('main');

let mainMenu = document.createElement('div');
mainMenu.className = "main-menu";

let usernamePrompt = document.createElement('h1');
usernamePrompt.innerHTML = "Enter your username below";

let usernameInput = document.createElement('input');
usernameInput.type = "text";
usernameInput.id = "username";

let submitButton = document.createElement('input');
submitButton.type = "submit";

usernamePrompt.appendChild(usernameInput);
usernamePrompt.appendChild(submitButton);

mainMenu.appendChild(usernamePrompt);

main.appendChild(mainMenu);

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

let bomb = new Image();
bomb.src = "assets/bomb.png";

// initialize the game session
let masterGame = new Game("title");

title.onload = function() {
    ctx.drawImage(title, 0, 0, 800, 512);

    cvs.onclick = function() {
        changeState(masterGame.state);
        draw(masterGame.state);
    };

    submitButton.onclick = function() {
        handlePlayers(usernameInput.value);
    };

};


// am only able to get animations running when they are defined in the global scope??
let obstacles = [];
// obstacles[0] = {x: cvs.width, y: 380};
obstacles[0] = {x: 500, y: 380};

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 


    if (masterGame.state === "bg") {
        const DIFFICULTY = 5;
        const GAP = 100;

        // let obstacles = [];
        // // obstacles[0] = {x: cvs.width, y: 380};
        // obstacles[0] = {x: 500, y: 380};

        ctx.drawImage(bg, 0, 0, 800, 512);
        ctx.drawImage(sprite, 0, 200, 165, 270); 
        // x = 0, y = 200 is the ground for the man sprite 
            
        // ctx.drawImage(bomb, cvs.width - 600, 380, 70, 70);

        // while (obstacles[0].x > 0) {
        //     obstacles[0].x--;
        // };

        for (let x = 0; x < obstacles.length; x++) {
            ctx.drawImage(bomb, obstacles[0].x, 380, 70, 70);
            obstacles[0].x--;

            if (obstacles[x].x == cvs.width - 600) {
                obstacles.push({
                    x: cvs.width,
                    y: 380
                });
            };
        };

        // requestAnimationFrame(draw);



        // while (obstacles.length < 6) {
        //     // ctx.drawImage(bomb, obstacles[0].x, 380, 70, 70);
        //     // obstacles[0].x -= 50;
        //     obstacles[0].x--;

        //     if (obstacles[0].x < 0) {
        //         obstacles.push(1);
        //     };
        //     // obstacles.push(1);
        // };



        // for (x = 0; x < DIFFICULTY; x++) {
        //     ctx.drawImage(bomb, (200 + GAP + (Math.floor(Math.random() * 500))), 380, 70, 70); 
        // };

        // ctx.drawImage(bomb, 200, 380, 70, 70); 
        // x = 200, y = 380 is the ground for the bomb sprite 
    };
    
    requestAnimationFrame(draw);
    
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
};

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

    fetch(PLAYERS_URL, configObject);
};

// update player model progress - have it be an integer that points to a specific set of levels on the frontend 

draw();
// requestAnimationFrame(draw);



