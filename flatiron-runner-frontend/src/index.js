// URLS
const BASE_URL = "http://localhost:3000"
const PLAYERS_URL = `${BASE_URL}/players`


// declare classes
class Game {
    constructor(state, score=0) {
        this.state = state;
        this.score = score;
    };

    // State management functions 
    changeState() {
        if (this.state === "title") {
            this.state = "bg";
        } else if (this.state === "bg") {
            this.state = "title"
        }; 
    };

};

class Player {
    constructor(username, hiScore, id) {
        this.username = username;
        this.hiScore = hiScore;
        this.id = id;
    };

    // Game mechanic functions 
    jump() {
        sY -= 100;
        sX += 70;
    };

    moveRight() {
        sX += 5;
    };

    moveLeft() {
        sX -= 5;
    };

    // Score functions
    checkScore() {
        if (masterGame.score > this.hiScore) {
            alert(`Congrats on your new hi-score of ${masterGame.score}!`);
            updateScore();
        };
    };
    
    updateScore() {
        let player_url = PLAYERS_URL + `/${masterPlayer.id}`;
    
        let configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: masterPlayer.username,
                score: masterGame.score
            })
        };
    
        fetch(player_url, configObject);
    };
};

// set vars for handling canvas & context 
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load title screen & declare level assets 
let bg = new Image();
let title = new Image();
title.src = "assets/titleScreen.png";

// load sprite assets
let sprite = new Image();
sprite.src = "assets/man_sprite.png";
let bomb = new Image();
bomb.src = "assets/bomb.png";

// set sprite initial values
let sX = 0; //x-axis pos
let sY = 200; //x-axis pos

// set value of gravity / fall speed 
let gravity = 7.5;

// am only able to get animations running when they are defined in the global scope??
// FOR LOOP APPROACH - initialize obstacles 
let obstacles = [];
obstacles[0] = {x: cvs.width, y: 380};

// initialize the game session
let masterGame = new Game("title");

// declare global player variable 
let masterPlayer;

// grab start menu buttons & input for fetch request
let submitButton = document.getElementById('playerSubmit');
let usernameInput = document.getElementById("username");

// event listeners for moving character 
document.addEventListener("keydown", function(e) {
    if (masterGame.state === "bg") {
        if (sX < 705 && sY > -100) {
            // handle jumping using space bar 
            if (e.keyCode === 32) {
                masterPlayer.jump();
            };
        
            // handle moving forward using d
            if (e.keyCode === 68) {
                masterPlayer.moveRight();
            };
        };

        // handle moving backwards using a
        if (sX > -1) {
            if (e.keyCode === 65) {
                masterPlayer.moveLeft();
            };
        };
    };
});

// kick things off once the title loads
title.onload = function() {
    // clear canvas & load title screen
    loadTitle();

    //handle fetching player from db or creating new player
    submitButton.onclick = function(e) {
        // have to prevent the default behavior of the submit button to get this working properly.
        e.preventDefault();

        fetchPlayers(usernameInput.value);
    };
};

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 

    // if (masterGame.state === "bg") {
        // x = 0, y = 200 is the ground for the man sprite 

        // handle level selection dynamically 
        let level = document.getElementById("level-select");
        bg.src = `assets/bg${level.value}.png`;

        // ********************************************************
        // FOR LOOP APPROACH START 
        for (let i = 0; i < obstacles.length; i++) {

            ctx.drawImage(bg, 0, 0, 800, 512);
            ctx.drawImage(sprite, sX, sY, 165, 270); 
            ctx.drawImage(bomb, obstacles[i].x, obstacles[i].y, 70, 70);

            // movement speed for obstacles
            obstacles[i].x -= 7.5;

            // collisions & game over functionality 
            if (sX + 11 >= obstacles[i].x && sX <= obstacles[i].x + 70 && sY + 180  >= obstacles[i].y) {
                alert(`You hit the bomb! Your final score is ${masterGame.score}`);

                // handle checking / updating of score
                // checkPlayerScore();
                masterPlayer.checkScore();

                // reset score
                masterGame.score = 0;

                // reset to title screen
                // location.reload();
                masterGame.changeState();
                resetSprites();
                return loadTitle();
            };
            
            if (obstacles[i].x == cvs.width - 900) {
                // increment score by 10 for each bomb dodged 
                masterGame.score += 10;

                // add more obstacles to the level
                obstacles.push({
                    x: cvs.width,
                    y: 380
                });
            };
        };

        // player sprite fall speed
        if (sY < 200) {
            sY += gravity;
        };

        // scoreboard 
        ctx.fillStyle = "#000";
        ctx.font = "30px Times New Roman";
        ctx.fillText("Score : " + masterGame.score, 10, cvs.height-20);
            
        // loop animation 
        requestAnimationFrame(draw);
    // };
    // loadTitle();
        // ********************************************************
        // FOR LOOP APPROACH END 
};

let gameStart = function () {
    alert("Let the games begin!");
    masterGame.changeState();
    cvs.removeEventListener("click", gameStart);
    draw();
};

// Player functions 

// rename to fetchPlayers from handlePlayers
function fetchPlayers(name) {
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
    .then(json => createPlayer(json))
    .then(player => createPlayerMenu(player));
};

function createPlayer(playerJSON) {
    let username = playerJSON['data']['attributes']['username'];
    let hiScore = playerJSON['data']['attributes']['score'];
    let id = parseInt(playerJSON['data']['id'], 10);
    masterPlayer = new Player(username, hiScore, id);
    return masterPlayer;
};

// Game Menu functions 

function createPlayerMenu(player) {
    // select menu element
    let menu = document.getElementById("main-menu");

    // replace standard header with username 
    let playerName = document.getElementById('menu-header');
    playerName.innerHTML = `Player: ${player.username}`;

    // add hi-score
    let hiScore = document.createElement("h2");
    hiScore.id = "hi-score";
    hiScore.innerHTML = `Your hi-score: ${player.hiScore}`;
    menu.appendChild(hiScore);

    // add level selector
    let levelHeader = document.createElement("h3");
    levelHeader.innerHTML = "Select your level (1-6) below";

    let levelSelect = document.createElement("input");
    levelSelect.id = "level-select";
    levelSelect.type = "number";
    menu.appendChild(levelHeader);
    menu.appendChild(levelSelect);

    // remove the username form
    let form = document.getElementById("user-form");
    menu.removeChild(form);
};

// handle loading / reloading of title screen
function loadTitle() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    // obstacles.length = 0;
    ctx.drawImage(title, 0, 0, 800, 512);
    cvs.addEventListener("click", gameStart);
};

function resetSprites() {
    sX = 0;
    sY = 200;

    // reset obstacles
    obstacles.length = 0;
    obstacles[0] = {x: cvs.width, y: 380};
};


// // Game mechanic functions 

// function jump() {
//     sY -= 100;
//     sX += 70;
// };

// function moveRight() {
//     sX += 5;
// };

// function moveLeft() {
//     sX -= 5;
// };



//////////NOTES//////////

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

// create main menu
// let main = document.querySelector('main');

// let mainMenu = document.createElement('div');
// mainMenu.className = "main-menu";

// let usernamePrompt = document.createElement('h1');
// usernamePrompt.innerHTML = "Enter your username below";

// let usernameInput = document.createElement('input');
// usernameInput.type = "text";
// usernameInput.id = "username";

// submitButton.type = "submit";

// usernamePrompt.appendChild(usernameInput);
// usernamePrompt.appendChild(submitButton);

// mainMenu.appendChild(usernamePrompt);

// main.appendChild(mainMenu);

// bg.src = "assets/purple_bg.jpeg";
// bg4 = "assets/bg4.png";
// bg3 = "assets/bg3.png";
// bg2 = "assets/bg2.png";
// bg1 = "assets/bg1.jpeg";

// bg.src = bg2;

// WHILE LOOP APPROACH
// let obstacle = {
//     x: cvs.width,
//     y: 380
// };

// THIS WORKS!!!!!
// change the requirements for the reloadCounter ,i.e. how many obstacles on the level, depending on a difficulty modifier 
// const DIFFICULTY = 5;
// const GAP = 100;

// var reloadCounter = 0;

// function checkPlayerScore() {
//     if (masterGame.score > masterPlayer.hiScore) {
//         alert(`Congrats on your new hi-score of ${masterGame.score}!`);
//         updatePlayerScore();
//     };
// };

// function updatePlayerScore() {
//     let player_url = PLAYERS_URL + `/${masterPlayer.id}`;

//     let configObject = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             username: masterPlayer.username,
//             score: masterGame.score
//         })
//     };

//     fetch(player_url, configObject);
// };

// // State management functions 
// function changeState(gameState) {
//     if (gameState === "title") {
//         masterGame.state = "bg";
//     } else if (gameState === "bg") {
//         masterGame.state = "title"
//     }; 
// };
