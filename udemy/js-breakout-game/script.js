const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let ballCenterX = canvas.width / 2; // middle line
let ballCenterY = canvas.height - 30; // height for the bottom line
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {
			x: 0,
			y: 0,
			status: 1
		};
	}
}

function keyUpHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = false;
	} else if (e.keyCode === 37) {
		leftPressed = false;
	}
}

function keyDownHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = true;
	} else if (e.keyCode === 37) {
		leftPressed = true;
	}
}

function mouseMoveHandler(e) {
	const relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);

function drawBricks() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status === 1) {
				const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ballCenterX, ballCenterY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			const b = bricks[c][r];
			if (b.status === 1) {
				if (ballCenterX > b.x && ballCenterX < b.x + brickWidth && ballCenterY > b.y && ballCenterY < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score === brickRowCount * brickColumnCount) {
						alert("YOU WIN, CONGRADULATIONS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);	// 每次都刷新 frame
	drawBricks()
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if (ballCenterY + dy < ballRadius) {
		dy = -dy;
	} else if (ballCenterY + dy > canvas.height - ballRadius - paddleHeight) {
		if (ballCenterX > paddleX && ballCenterX < paddleX + paddleWidth) {	// 球彈到 paddle
			dy = -dy;
		} else {
			lives--;
			if (!lives) {
				alert("GAME OVER!");
				document.location.reload();
			} else {
				// 重新開新局
				ballCenterX = canvas.width / 2;
				ballCenterY = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}
		}
	}

	// 左右牆壁
	if (ballCenterX + dx > canvas.width - ballRadius || ballCenterX + dx < ballRadius) {
		dx = -dx;
	}

	// 左右移動，增減 paddle 的 x
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	ballCenterX += dx;
	ballCenterY += dy;
	requestAnimationFrame(draw);	// https://msdn.microsoft.com/zh-tw/library/hh920765(v=vs.85).aspx
}

draw();