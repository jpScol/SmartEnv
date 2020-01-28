

var myGamePiece;
var myObstacles = [];
var gaps = [];
var reperes = []
var myScore;
var posY; 
var gapY;

function startGame() {
    myGamePiece = new component(15, 15, "red", 10, 120);
    myGamePiece.speedY = 4;
  	myGamePiece.mitigateTimer = 2;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

function restartGame() {
    myGamePiece.x = 10;
    myGamePiece.y = 120;
    myGamePiece.speedY = 4;
  	myGamePiece.mitigateTimer = 2;
	myGameArea.frameNo = 0;
	myObstacles = [];
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
  	this.mitigateTimer = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
      	if (this.mitigateTimer > 0){
        	this.y += (this.speedY + this.gravitySpeed) * (20 - this.mitigateTimer) / 20;
          this.mitigateTimer -= 1;
        } else {
          this.y += this.speedY + this.gravitySpeed;
        }
      	
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
        var top = 0;
        if (this.y < top) {
            this.y = top;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 100;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        gaps.push(height + (gap/2));
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    
    for (i = 0; i < gaps.length; i++) {
        posY = myGamePiece.y + 7.5; // position de joueur (centre)
        console.log(posY);
        gapY = gaps[i]; // coordonées gap (centre)
        console.log(gapY);

    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.speedY = n;
    myGamePiece.mitigateTimer = 20;

    //arr = passParamsToGETRequest(i);
    /* reperes.push(new component(480, 1, "black", 0, posY));
    reperes.push(new component(480, 1, "blue", 0, gapY));
    for (i = 0; i < reperes.length; i++) {
        reperes[i].update();
    } */
    
}
/*
function passParamsToGETRequest(i){
    var arr = new Array;
    var posY = myGamePiece.y + 7.5; // position de joueur (centre)
    console.log(posY);
    arr.push(posY);
    var gapY = gaps[i]; // coordonées gap (centre)
    console.log(gapY);
    arr.push(gapY);
    return arr;
}
*/
