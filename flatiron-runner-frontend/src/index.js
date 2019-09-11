
// vars for handling canvas & context 
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load all image assets 
var bg = new Image();
bg.src = "assets/purple_bg.jpeg";

// create a class for the Game to handle game states 
class Game {
    constructor(state) {
        this.state = state;
    };

    get state() {
        return this.state;
    };

    set state(newState) {
        this.state = newState;
    };
};

// initialize the game session
// var masterGame = new Game("title");

function draw() {
    // var bg = new Image();
    // // I have to give the img time to load.
    // // remember ASYNC! 

    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, 900, 512); 
    }

    // bg.src = "assets/purple_bg.jpeg";
    // ctx.drawImage(bg, 0, 0, 900, 512);
};

draw();




