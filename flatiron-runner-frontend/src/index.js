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

// vars for handling canvas & context 
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load all image assets 
let bg = new Image();
bg.src = "assets/purple_bg.jpeg";

// initialize the game session
let masterGame = new Game("title");

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 

    bg.onload = function() {
        // let masterGame = new Game("title");
        ctx.drawImage(bg, 0, 0, 900, 512); 
    }

    // bg.src = "assets/purple_bg.jpeg";
    // ctx.drawImage(bg, 0, 0, 900, 512);
};

draw();




