
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let monkeyImg = new Image();
monkeyImg.src = "assets/monkey.png";

let bananaImg = new Image();
bananaImg.src = "assets/banana.png";

let jungleImg = new Image();
jungleImg.src = "assets/jungle.png";

let monkey = { x: 50, y: 300, width: 50, height: 50, jumping: false, velocityY: 0 };
let banana = { x: 800, y: 300, width: 30, height: 30 };

let score = 0;
let highScore = 0;

function startGame() {
    monkey.y = 300;
    monkey.velocityY = 0;
    banana.x = 800;
    score = 0;
    requestAnimationFrame(updateGame);
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(jungleImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(monkeyImg, monkey.x, monkey.y, monkey.width, monkey.height);
    ctx.drawImage(bananaImg, banana.x, banana.y, banana.width, banana.height);

    if (monkey.jumping) {
        monkey.velocityY -= 1.5;
        monkey.y -= monkey.velocityY;
        if (monkey.y >= 300) {
            monkey.y = 300;
            monkey.jumping = false;
            monkey.velocityY = 0;
        }
    }

    banana.x -= 5;
    if (banana.x + banana.width < 0) {
        banana.x = 800;
        score++;
        if (score > highScore) {
            highScore = score;
            alert("🎉 New High Score! 🎉");
        }
    }

    if (monkey.x < banana.x + banana.width &&
        monkey.x + monkey.width > banana.x &&
        monkey.y < banana.y + banana.height &&
        monkey.y + monkey.height > banana.y) {
        banana.x = 800;
        score++;
    }

    document.getElementById("scoreDisplay").textContent = `Score: ${score} | High Score: ${highScore}`;
    requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !monkey.jumping) {
        monkey.jumping = true;
        monkey.velocityY = 20;
    }
});
