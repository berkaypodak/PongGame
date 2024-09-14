var p1score = 0
var p2score = 0
let container;
gC = document.getElementsByClassName('gC')[0];
sr_btn = document.getElementById('sr-btn');
var cWidth = gC.offsetWidth;
var cHeight = gC.offsetHeight;
let squareFont;
var leftPaddle;
var rightPaddle;
var ball;
var paddleMargin  = 20;
var textMargin = 100;
var leftpaddleYincrement = 10;
var rightpaddleYincrement = 10;
var gameMargin = 20;
var ballLaunchDirection = Math.floor(Math.random()*2);
var ballLaunchAxis = Math.floor(Math.random() * (8-4) *10)/10;
var ballVelocity = 7;
var gameStarted = false;
var maxScore = 5;
var isGamePaused = false;
var fieldColor = color(50, 150, 50);
var sonFirlatmaZamani;
let gamePaused = false;

function togglePause() {
    if (gameStarted) {
        if (isGamePaused) {
            loop();
            isGamePaused = false;
            document.getElementById('pause-btn').innerText = 'DURDUR';
        } else {
            noLoop();
            isGamePaused = true;
            document.getElementById('pause-btn').innerText = 'DEVAM ET';
        }
    }
}

function increaseScore(player) {
    if (player == 0) {
        p1score += 1;
    } else {
        p2score += 1;
    }

    if (p1score === maxScore || p2score === maxScore) {
        gameStarted = false;
        sr_btn.innerText = 'BAŞLAT';
        noLoop();
        let winnerMessage = (p1score === maxScore) ? "1. Oyuncu kazandı!" : "2. Oyuncu kazandı!";
        
        let messageBox = document.createElement('div');
        messageBox.className = 'winner-box';
        messageBox.innerHTML = "<p>Oyun bitti! " + winnerMessage + " Skor: 1. Oyuncu - " + p1score + ", 2. Oyuncu - " + p2score + "</p>";
        messageBox.style.fontSize = '1em';
        messageBox.style.color = 'white';//bu satırlarda message box ayarları ve içindeki yazıyı yaptık

        let restartButton = document.createElement('button');//TEKRAR OYNA BUTONU AYARLARI
        restartButton.innerText = 'TEKRAR OYNA';
        restartButton.style.width = '300px';
        restartButton.style.padding = '5px';
        restartButton.style.fontSize = '1.5em';
        restartButton.style.letterSpacing = '0.1em';
        restartButton.style.backgroundColor = '#66eb4b';
        restartButton.style.color = 'white';
        restartButton.style.cursor = 'pointer';
        restartButton.style.textAlign = 'center';
        restartButton.style.userSelect = 'none';
        restartButton.style.mozUserSelect = 'none';
        restartButton.style.webkitUserSelect = 'none';
        restartButton.style.marginBottom = '0.5em';
        restartButton.style.marginRight = '5px';

        // "TEKRAR OYNA" butonuna hover efekti 
    restartButton.addEventListener('mouseover', function () {
        restartButton.style.transition = '1s';
        restartButton.style.color = '#1bf02d';
        restartButton.style.backgroundColor = 'white';
});

    restartButton.addEventListener('mouseout', function () {
        restartButton.style.transition = '1s';
        restartButton.style.color = 'white';
        restartButton.style.backgroundColor = '#66eb4b';
});
        restartButton.addEventListener('click', function() {
            p1score = 0;
            p2score = 0;
            reset();
            location.reload();
        });

        messageBox.appendChild(restartButton);
        document.body.appendChild(messageBox);
    }
}

function setup() {
    container = createCanvas(cWidth, cHeight);
    container.parent('game-container');
    background(255);
    frameRate(60);

    ball = createSprite(cWidth/2, cHeight/2);
    ball.draw = function() {
        ellipse(0, 0, 12, 12);
    }
    ball.shapeColor = color(0);

    leftPaddle = createSprite(paddleMargin, cHeight/2, 12, 70);
    leftPaddle.shapeColor = color(40, 0, 175);

    rightPaddle = createSprite(cWidth - paddleMargin, cHeight/2, 12, 70);
    rightPaddle.shapeColor = color(120, 0, 0);
    
    sonFirlatmaZamani = millis();
}

function launchBall() {
    if(keyIsDown(UP_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(83) || keyIsDown(87)) {
        console.log('ehehe');
    }
    
    ball.position.x = cWidth/2;
    ball.position.y = cHeight/2;
    ballLaunchDirection = Math.floor(Math.random()*2);
    ballLaunchAxis = Math.floor(Math.random() * (8-4) *10)/10;
    if(ballLaunchDirection == 0) {
        ball.velocity.x = -1 * ballVelocity;
        ball.velocity.y = -1 * ballLaunchAxis;
    }
    else if(ballLaunchDirection == 1) {
        ball.velocity.x = ballVelocity;
        ball.velocity.y = ballLaunchAxis;
    }
    sonFirlatmaZamani = millis();
}

function reset() {
    background(255);
    stroke(55);
    strokeWeight(8);
    line(cWidth/2, 0, cWidth/2, cHeight);
    textFont("monospace");
    textSize(50);
    fill(150);
    stroke(0);
    textAlign(CENTER,CENTER);
    text(p1score.toString(),textMargin,100);
    textSize(50);
    fill(150);
    stroke(0);
    textAlign(CENTER,CENTER);
    text(p2score.toString(),cWidth-textMargin,100);
    loop();
    launchBall();
    isGamePaused = false;
    document.getElementById('pause-btn').innerText = 'DURDUR';
}

function draw() {
    background("#538d22");
    stroke(250, 250, 250);
    strokeWeight(5);
    line(cWidth/2, 0, cWidth/2, cHeight);
    textFont("JetBrains Mono");
    textSize(50);
    fill(0,0,250);
    stroke(40, 0, 175);
    textAlign(CENTER,CENTER);
    text(p1score.toString(),textMargin,100);
    textSize(50);
    fill(250,0,0);
    stroke(120, 0, 0);
    textAlign(CENTER,CENTER);
    text(p2score.toString(),cWidth-textMargin,100);
    ball.shapeColor = color(250, 250, 250);

    fill(ball.shapeColor);
    noStroke(1);
    ellipse(ball.position.x, ball.position.y, 22, 22);

    ball.setCollider('circle', 0, 0, 6);
    leftPaddle.display();
    rightPaddle.display();
    ball.display();

    if(ball.position.y - 6 < 0) {
        ball.velocity.y *= -1;
    }
    else if(ball.position.y + 6 > cHeight) {
        ball.velocity.y *= -1;
    }

    if(ball.overlap(rightPaddle)) {
        ball.velocity.y = -1 * ball.velocity.y + random(-1.0,1.0);
        ball.velocity.x = -1 * ball.velocity.x;
    }
    else {
        if(ball.position.x > cWidth) {
            noLoop();
            reset();
            increaseScore(0);
        }
    }

    if(ball.overlap(leftPaddle)) {
        ball.velocity.y = -1 * ball.velocity.y + random(-1.0,1.0);
        ball.velocity.x = -1 * ball.velocity.x;
    }
    else {
        if(ball.position.x < 0) {
            noLoop();
            reset();
            increaseScore(1);
        }    
    }

    if (keyIsDown(UP_ARROW) && rightPaddle.position.y > gameMargin + 35 ) {
        rightPaddle.position.y -= rightpaddleYincrement;
    }
    else if (keyIsDown(DOWN_ARROW) && rightPaddle.position.y < cHeight - gameMargin - 35) {
        rightPaddle.position.y += rightpaddleYincrement;
    }

    if (keyIsDown(87) && leftPaddle.position.y > gameMargin + 35 ) {
        leftPaddle.position.y -= leftpaddleYincrement;
    }
    else if (keyIsDown(83) && leftPaddle.position.y < cHeight - gameMargin - 35) {
        leftPaddle.position.y += leftpaddleYincrement;
    }

    drawSprites();

    var gecenZaman = millis() - sonFirlatmaZamani;
    var hizCarpici = 1 + gecenZaman / 100000000;
    ball.velocity.x *= hizCarpici;
    ball.velocity.y *= hizCarpici;
}

function resetGame() {
    p1score = 0;
    p2score = 0;
    reset();
    location.reload();
}

let restartButton = document.createElement('button');
restartButton.innerText = 'TEKRAR OYNA';

restartButton.addEventListener('click', function () {
    resetGame();
    window.location.reload();
});

document.getElementById('game-container').appendChild(restartButton);

function startGame() {
    if (gameStarted == false) {
        gameStarted = true;
        launchBall();
        sr_btn.innerText = 'SIFIRLA';
    } else {
        noLoop();
        p1score = 0;
        p2score = 0;
        reset();
        location.reload();
    }
}