const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//"animating"
let yCor = 0;
let yMove = 0;
let bowVisible = false;
let fadeIn = 20;
//images
let bullsEye = new Image();
let SkyBackground = new Image();
let bullseyeImage = new Image();
let forestBackground = new Image();
let bow = new Image();
let bowInAction = new Image();
let arrow = new Image();
let scoreBackground = new Image();
scoreBackground.src = "scoreBackground.jpg";
arrow.src = "arrow.png";
bow.src = "bow.png";
bowInAction.src = "bow2.png";
bullseyeImage.src = "bullseyetitle.png";
SkyBackground.src = "skyy.png";
forestBackground.src = "Forestbackground.jpg";
bullsEye.src = "bullseye.png";
//audio
let backgroundMusic = new Audio("music.mp3");
let arrowRelease = new Audio("arrowRelease.mp3");
let arrowHit = new Audio("arrow-hitting-target.mp3");

canvas.width = 700;
canvas.height = 600;

//variables
let mousePosOnCanvas = { x: 0, y: 0 };
let isInAction;
let arrowExists = false;
let bord1Exists = true;
let bord2Exists = true;
let bord3Exists = true;
let bord4Exists = true;
let bord5Exists = true;
let angleArrow = 0;
let distance = 0;
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let tenArrows = 10;
let score = 0;

let rectRoundOne;
let rectRoundTwo;
let rectRoundThree;

let rectAgainRoundOne;
let rectAgainRoundTwo;
let rectAgainRoundThree;

let bullsEye1;
let bullsEye2;
let bullsEye3;
let bullsEye4;
let bullsEye5;
let arrow1;
let resultTwo = { x: 0, y: 0 };

function reset() {
    arrowExists = false;
    resultTwo.x = 0;
    resultTwo.y = 0;
}

function loadingGame() {
    rectAgainRoundOne = new roundRect({ x: 250, y: 400 }, { x: 170, y: 70 }, "white");
    rectAgainRoundTwo = new roundRect({ x: 260, y: 410 }, { x: 150, y: 50 }, "white");
    rectAgainRoundThree = new roundRect({ x: 270, y: 415 }, { x: 130, y: 35 }, "white");
    rectRoundOne = new roundRect({ x: 280, y: 320 }, { x: 130, y: 52.5 }, "red");
    rectRoundTwo = new roundRect({ x: 260, y: 310 }, { x: 170, y: 70 }, "red");
    rectRoundThree = new roundRect({ x: 250, y: 300 }, { x: 190, y: 90 }, "red");
    bullsEye1 = new bord(20, 80, 50, 50);
    bullsEye2 = new bord(410, 200, 80, 80);
    bullsEye3 = new bord(260, 180, 50, 50);
    bullsEye4 = new bord(510, 100, 50, 50);
    bullsEye5 = new bord(600, 160, 80, 80);
    arrow1 = new arrowPoint(350, 425, 30, 140);
    animate();
}

function rotateTheBow(degrees) {
    ctx.save();
    ctx.translate(350, 480);
    ctx.rotate(degrees * Math.PI / 180);
    if (bowVisible) {
        fadeIn--;
        if (fadeIn < 0) {
            ctx.drawImage(isInAction ? bowInAction : bow, -bow.width / 2, -bow.height / 2);
        }
    }
    ctx.resetTransform();
}

function rotateAndTranslate(x, y, x2, y2, angle, distance) {
    let radians = (angle * Math.PI) / 180;

    let xRotated = (x - x2) * Math.cos(radians) - (y - y2) * Math.sin(radians) + x2;
    let yRotated = (x - x2) * Math.sin(radians) + (y - y2) * Math.cos(radians) + y2;

    let xTranslated = xRotated + distance * Math.sin(radians);
    let yTranslated = yRotated - distance * Math.cos(radians);

    //result is a x and a y value.
    return { x: xTranslated, y: yTranslated };
}

function rotateAndMove(object, angle, distance) {
    //First calculation is rotation and the movement, Second is the dot at the tip.
    let result = rotateAndTranslate(object.x, object.y, object.x, object.y, angle, distance);
    resultTwo = rotateAndTranslate(result.x + object.width / 2, result.y, result.x + object.width / 2, result.y + object.height / 2, angle, 0);

    ctx.translate(result.x + object.width / 2, result.y + object.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-result.x - object.width / 2, -result.y - object.height / 2);

    ctx.drawImage(arrow, result.x, result.y, object.width, object.height);
    ctx.resetTransform();

    //Just print data. 
    //For drawing the arrow you need result.
    //For colision point you need resultTwo.
    //You dont adjust the original object. you just need to save the angle and the distance traveled from start.
    // console.log(`Original point: (${object.x}, ${object.y})`);
    // console.log(`Rotated and translated point: (${result.x}, ${result.y})`);
    // console.log(`Rotated and translated pointEnd: (${resultTwo.x}, ${resultTwo.y})`);
}

function animate() {
    window.requestAnimationFrame(animate);
    //uncomment when needed --> console.log("tick");
    //background 
    ctx.drawImage(forestBackground, 0, 0, 700, 600);
    if (bord1Exists) { bullsEye1.draw(); }
    if (bord2Exists) { bullsEye2.draw(); }
    if (bord3Exists) { bullsEye3.draw(); }
    if (bord4Exists) { bullsEye4.draw(); }
    if (bord5Exists) { bullsEye5.draw(); }
    if (bord1Exists == true && collission(resultTwo, bullsEye1)) {
        bord1Exists = false;
        score += 1000;
        reset();
        arrowHit.play();
    }
    if (bord2Exists == true && collission(resultTwo, bullsEye2)) {
        bord2Exists = false;
        score += 500;
        reset();
        arrowHit.play();
    }
    if (bord3Exists == true && collission(resultTwo, bullsEye3)) {
        bord3Exists = false;
        score += 1000;
        reset();
        arrowHit.play();
    }
    if (bord4Exists == true && collission(resultTwo, bullsEye4)) {
        bord4Exists = false;
        score += 500;
        reset();
        arrowHit.play();
    }
    if (bord5Exists == true && collission(resultTwo, bullsEye5)) {
        bord5Exists = false;
        score += 500;
        reset();
        arrowHit.play();
    }

    console.log(distance)
    if (distance > 700) {
        reset();
    }
    //text
    ctx.font = "20px Tillana"
    ctx.fillStyle = "white"
    ctx.fillText(`Arrows left = ${tenArrows}`, 75, 30);
    //rotate "bow"
    rotateTheBow(angle);
    //startbackground
    ctx.drawImage(SkyBackground, 0, yCor, 700, 600);
    //bullseyeTitel
    ctx.drawImage(bullseyeImage, 530, yCor + 120, 100, 100);
    //titel styling
    ctx.font = "600 90px Tillana";
    ctx.fillStyle = "#7a340c";
    ctx.textAlign = "center";
    ctx.fillText("Archery", 350, yCor + 200);
    ctx.font = "600 90px Tillana";
    ctx.strokeStyle = "#481e06";
    ctx.textAlign = "center";
    ctx.strokeText("Archery", 350, yCor + 200);
    ctx.fillStyle = "white";
    ctx.roundRect(250, yCor + 300, 190, 90);
    ctx.fill();
    //button styling
    ctx.font = "600 40px Tillana";
    ctx.fillStyle = "#7a340c";
    ctx.fillText("Play", 343, yCor + 358);

    rectRoundOne.setYCor(yCor);
    rectRoundTwo.setYCor(yCor);
    rectRoundThree.setYCor(yCor);

    rectRoundOne.draw();
    rectRoundTwo.draw();
    rectRoundThree.draw();

    //animation
    yCor -= yMove;
    if (yCor == -600) {
        yMove = 0;
    }

    if (arrowExists) {
        distance += 10;
        rotateAndMove(arrow1, angleArrow, distance);
    } else {
        distance = 0;
    }

    //score screen styling
    if (tenArrows < 1 || (bord1Exists == false &&
        bord2Exists == false &&
        bord3Exists == false &&
        bord4Exists == false &&
        bord5Exists == false)) {
        if (getCookie() < score) {
            setCookie(score);
        }

        ctx.drawImage(scoreBackground, 0, 0, 700, 600);
        ctx.font = "500 30px Tillana";
        ctx.fillStyle = "red";
        ctx.fillText(`Your Score: ${score}`, 250, 300);
        ctx.font = "500 30px Tillana";
        ctx.fillStyle = "red";
        ctx.fillText(`Highscore: ${getCookie()}`, 240, 350);
        ctx.drawImage(bullseyeImage, 460, 115, 90, 90);
        ctx.font = "600 60px Tillana";
        ctx.fillStyle = "#7a340c";
        ctx.textAlign = "center";
        ctx.fillText("Archery", 340, 180);
        ctx.font = "600 60px Tillana";
        ctx.strokeStyle = "#481e06";
        ctx.textAlign = "center";
        ctx.strokeText("Archery", 340, 180);
        ctx.font = "600 20px Tillana";
        ctx.fillStyle = "white";
        ctx.fillStyle = "red";
        ctx.roundRect(250, 400, 170, 70, 5);
        ctx.fill();
        rectAgainRoundOne.draw();
        rectAgainRoundTwo.draw();
        rectAgainRoundThree.draw();
        ctx.fillStyle = "white";
        ctx.fillText("Play Again?", 335, 440);
        backgroundMusic.pause();

        if (score == 3500) {
            ctx.font = "600 25px Tillana";
            ctx.fillStyle = "#008cff";
            ctx.fillText("Congrats!", 330, 220);
            ctx.font = "500 20px Tillana";
            ctx.fillStyle = "#00bfff";
            ctx.fillText("You got the max score", 340, 250);
        }
    }
}



class bord {

    constructor(x, y, width, height) {
        this.x = x;

        this.y = y;

        this.width = width;

        this.height = height;
    }

    draw() {
        ctx.drawImage(bullsEye, this.x, this.y, this.width, this.height);
    }
}



class arrowPoint {
    constructor(x, y, width, height) {
        this.x = x;

        this.y = y;

        this.width = width;

        this.height = height;
    }
}

function mouseObj(obj) {
    console.log(mousePosOnCanvas.x, mousePosOnCanvas.y, ' ', obj.position.x, obj.position.y)
    if (mousePosOnCanvas.x > obj.position.x &&
        mousePosOnCanvas.x < obj.position.x + obj.size.x &&
        mousePosOnCanvas.y > obj.position.y &&
        mousePosOnCanvas.y < obj.position.y + obj.size.y) {
        return true;
    }
}

function mousePressed() {
    console.log(mouseObj(rectRoundOne));
    if (mouseObj(rectRoundThree)) {
        console.log("clicked!");
        yMove = 10;
        bowVisible = true;
        backgroundMusic.play();
    }
    if (mouseObj(rectAgainRoundThree)) {
        console.log("click");
        yMove = 0;
        yCor = 0;
        bowVisible = false;
        tenArrows = 10;
        bord1Exists = true;
        bord2Exists = true;
        bord3Exists = true;
        bord4Exists = true;
        bord5Exists = true;
        score = 0;
    }
}

canvas.addEventListener("mousedown", mousePressed);
//coor van muis
function onMouseMove(event) {
    mousePosOnCanvas = getTransformPoint(event.offsetX, event.offsetY);
    console.log(mousePosOnCanvas.x + "_" + mousePosOnCanvas.y);
}

function getTransformPoint(x, y) {
    const mPoint = new DOMPoint(x, y);
    return ctx.getTransform().transformPoint(mPoint);
}

canvas.addEventListener("mousemove", onMouseMove);

//button
class roundRect {
    constructor(position, size, borderColor) {
        this.position = position;
        this.size = size;
        this.borderColor = borderColor;
        this._yCor = 0;
    }

    setYCor(yCor) {
        this._yCor = yCor;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.borderColor;
        ctx.roundRect(this.position.x, this.position.y + this._yCor, this.size.x, this.size.y, 5);
        ctx.stroke();
        ctx.roundRect(this.position.x + 0.5, this.position.y + 0.5 + this._yCor, this.size.x + 1, this.size.y + 1, 5);
        ctx.stroke();
        ctx.roundRect(this.position.x + 1, this.position.y + 1 + this._yCor, this.size.x + 2, this.size.y + 2, 5);
        ctx.stroke();
        ctx.roundRect(this.position.x - 1, this.position.y - 1 + this._yCor, this.size.x + 5, this.size.y + 5, 5);
        ctx.stroke();
    }

}
//bow angle
let angle = 0;
//bow control
document.addEventListener("keydown", keyDown);

function keyDown(event) {
    console.log(event.key);
    if (event.key == "ArrowLeft") {
        angle -= 5;
        isInAction = true;
    } else if (event.key == "ArrowRight") {
        angle += 5;
        isInAction = true;
    }
}
//shoot arrow
document.addEventListener("keyup", shoot);

function shoot(event) {

    if (event.key == " " && !arrowExists) {
        console.log("space");
        isInAction = false;
        arrowExists = true;
        angleArrow = angle;
        angle = 0;
        tenArrows -= 1;
        arrowRelease.play();
    }
}

console.log("arrowExists");

function collission(a, b) {
    return (
        ((a.y) > (b.y)) &&
        (a.y < (b.y + b.height)) &&
        ((a.x) > b.x) &&
        (a.x < (b.x + b.width))
    );
}

function setCookie(value) {
    const d = new Date();
    d.setTime(d.getTime() + (10 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = "highscore" + "=" + value + ";" + expires + ";path=/";
}

function getCookie() {
    let name = "highscore" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}