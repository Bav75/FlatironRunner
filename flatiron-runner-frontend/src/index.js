
// vars for handling canvas & context 
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

function draw() {
    var bg = new Image();
    // I have to give the img time to load.
    // remember ASYNC! 
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, 900, 512);
    }
    bg.src = "assets/purple_bg.jpeg";
};

draw();