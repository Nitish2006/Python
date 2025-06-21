// Game variables
let canvas, ctx;
let score = 0;
let lives = 3;
let gameActive = false;
let gamePaused = false;
let targets = [];
let bullets = [];
let mouseX = 0;
let mouseY = 0;
let player = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    color: '#ff4757'
};
let gameSpeed = 1;
let lastTargetTime = 0;
let targetInterval = 2000; // milliseconds between target spawns
let lastFrameTime = 0;

// Game initialization
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Event listeners
    canvas.addEventListener('mousemove', trackMouse);
    canvas.addEventListener('click', shoot);
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('restartButton').addEventListener('click', restartGame);
    
    // Start the game
    startGame();
    
    // Start the game loop
    requestAnimationFrame(gameLoop);
};

// Resize canvas to fit container
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Update player position
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 20;
}

// Track mouse position
function trackMouse(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}

// Handle keyboard input
function handleKeyPress(e) {
    if (e.key === 'p' || e.key === 'P') {
        togglePause();
    }
}

// Toggle game pause
function togglePause() {
    gamePaused = !gamePaused;
    if (!gamePaused) {
        lastFrameTime = performance.now();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game
function startGame() {
    score = 0;
    lives = 3;
    targets = [];
    bullets = [];
    gameSpeed = 1;
    lastTargetTime = 0;
    targetInterval = 2000;
    
    updateScore();
    updateLives();
    
    gameActive = true;
    gamePaused = false;
    
    document.getElementById('gameOver').style.display = 'none';
    
    lastFrameTime = performance.now();
}

// Restart the game
function restartGame() {
    startGame();
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('finalScore').textContent = score;
}

// Update lives display
function updateLives() {
    document.getElementById('lives').textContent = lives;
}

// Create a new target
function createTarget() {
    const size = Math.random() * 30 + 20; // Random size between 20 and 50
    const speed = (Math.random() * 2 + 1) * gameSpeed; // Random speed, affected by game speed
    
    const target = {
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: speed,
        color: getRandomColor(),
        points: Math.floor(50 / size * 10) // Smaller targets are worth more points
    };
    
    targets.push(target);
}

// Get a random color for targets
function getRandomColor() {
    const colors = ['#ff6b81', '#70a1ff', '#7bed9f', '#ffa502', '#a4b0be'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Shoot a bullet
function shoot() {
    if (!gameActive || gamePaused) return;
    
    const bullet = {
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 10,
        height: 20,
        speed: 10,
        color: '#ffffff'
    };
    
    bullets.push(bullet);
}

// Update game state
function update(deltaTime) {
    if (!gameActive || gamePaused) return;
    
    // Create new targets at intervals
    if (performance.now() - lastTargetTime > targetInterval) {
        createTarget();
        lastTargetTime = performance.now();
        
        // Decrease interval as game progresses (more targets spawn)
        targetInterval = Math.max(500, 2000 - score * 10);
    }
    
    // Update bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        
        // Remove bullets that go off screen
        if (bullets[i].y + bullets[i].height < 0) {
            bullets.splice(i, 1);
        }
    }
    
    // Update targets
    for (let i = targets.length - 1; i >= 0; i--) {
        targets[i].y += targets[i].speed;
        
        // Check if target reached bottom
        if (targets[i].y > canvas.height) {
            targets.splice(i, 1);
            lives--;
            updateLives();
            
            if (lives <= 0) {
                gameOver();
            }
            
            continue;
        }
        
        // Check for bullet collisions
        for (let j = bullets.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[j], targets[i])) {
                // Add points
                score += targets[i].points;
                updateScore();
                
                // Increase game speed
                gameSpeed = 1 + score / 100;
                
                // Remove bullet and target
                bullets.splice(j, 1);
                targets.splice(i, 1);
                break;
            }
        }
    }
}

// Check collision between two objects
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw gun barrel (follows mouse X position)
    ctx.fillStyle = '#a4b0be';
    const barrelX = Math.min(Math.max(mouseX - 5, player.x), player.x + player.width - 10);
    ctx.fillRect(barrelX, player.y - 15, 10, 15);
    
    // Draw bullets
    ctx.fillStyle = '#ffffff';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw targets
    targets.forEach(target => {
        ctx.fillStyle = target.color;
        ctx.fillRect(target.x, target.y, target.width, target.height);
        
        // Draw target crosshair
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(target.x + target.width / 2, target.y);
        ctx.lineTo(target.x + target.width / 2, target.y + target.height);
        ctx.moveTo(target.x, target.y + target.height / 2);
        ctx.lineTo(target.x + target.width, target.y + target.height / 2);
        ctx.stroke();
    });
    
    // Draw pause indicator if game is paused
    if (gamePaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '16px Arial';
        ctx.fillText('Press P to resume', canvas.width / 2, canvas.height / 2 + 40);
    }
}

// Game over
function gameOver() {
    gameActive = false;
    document.getElementById('gameOver').style.display = 'flex';
}

// Game loop
function gameLoop(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    
    update(deltaTime);
    draw();
    
    if (!gamePaused) {
        requestAnimationFrame(gameLoop);
    }
}
