var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern =[];

var started = false;
var level = 0;

//press key to start a game
$(document).keydown(function(){

    if (!started){
        
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})

//when clicked, it will paly sound and play animattion.
$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
});

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("level " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var color_audio = new Audio('sounds/' + randomChosenColour + '.mp3')
    color_audio.play();

    playSound(randomChosenColour);

}

function playSound(name){

    var color_audio = new Audio('sounds/' + name + '.mp3')
    color_audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed")
    setTimeout(function(){$("."+ currentColour).removeClass("pressed")},100);
}

function checkAnswer(currentLevel){
    //if the random color is the same as click color;
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        //if length is the same;
        if(gamePattern.length === userClickedPattern.length){
            //after 1000ms it show what the next color.
            setTimeout(function(){nextSequence()},1000);
        }
    }
    else{
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//step 10:after gameover, press any key to restar.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}




