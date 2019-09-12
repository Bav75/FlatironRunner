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

// load all image assets 
let bg = new Image();
bg.src = "assets/purple_bg.jpeg";
let title = new Image();
title.src = "assets/titleScreen.png";
let menu = new Image();
menu.src = "assets/menu.png";

// initialize the game session
let masterGame = new Game("title");

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 

    title.onload = function() {
        // let masterGame = new Game("title");
        
        ctx.drawImage(title, 0, 0, 800, 512);

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

        cvs.onclick = function() {
            changeState(masterGame.state);
        };

        submitButton.onclick = function() {
            handlePlayers(usernameInput.value);
        };
       
        // masterGame.addEventListener("keydown", changeState);

    }

    // bg.src = "assets/purple_bg.jpeg";
    // ctx.drawImage(bg, 0, 0, 900, 512);
};

function changeState(gameState) {
    if (gameState === "title") {
        masterGame.state = "menu";
        ctx.drawImage(menu, 0, 0, 800, 512);
    };
}

function handlePlayers(name) {
    // make use of find or create by on the backend based off the username provided 
    configObject = {
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

draw();




