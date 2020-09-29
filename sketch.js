var ball,database;
var position;

function setup(){
    createCanvas(500,500);
    database=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition=database.ref('ball/position');
    ballPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').update({
        'x':ball.x+x,
        'y':ball.y+y
    });
}

function readPosition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;

}
function showError(){
    console.log("Error");
}
