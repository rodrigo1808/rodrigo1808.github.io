const PIXEL_SIZE = 32;
const game_width = window.innerWidth - (window.innerWidth % 32);
const game_height = window.innerHeight - (window.innerHeight % 32);

var config = {
    type: Phaser.AUTO,
    width: game_width,
    height: game_height,
    backgroundColor: '#B3E6FF',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const elementsSizes = {
    modalHeight: 0,
    modalWidth: 0,
    contentHeight: 0,
    contentWidth: 0
};

function startGame(numberOfPlayers) {
    players = numberOfPlayers;
    elementsSizes.modalHeight = document.getElementById('modal').clientHeight;
    elementsSizes.modalWidth = document.getElementById('modal').clientWidth;
    elementsSizes.contentHeight = document.getElementById('content').clientHeight;
    elementsSizes.contentWidth = document.getElementById('content').clientWidth;
    console.log(elementsSizes);
    document.getElementById('modal').style.height = '0';
    document.getElementById('modal').style.width = '0';
    document.getElementById('content').style.height = '0';
    document.getElementById('content').style.width = '0';
    document.getElementById('content').innerHTML = '';
    let interval = setInterval(()=> {
        snake.alive = true;
        clearInterval(interval);
    }, 300);
    if(numberOfPlayers == 2) {
        snake2.alive = true;
    }
}

function showRestartModal(score) {
    document.getElementById('modal').style.height = elementsSizes.modalHeight;
    document.getElementById('modal').style.width = elementsSizes.modalWidth;
    document.getElementById('content').style.height = elementsSizes.contentHeight;
    document.getElementById('content').style.width = elementsSizes.contentWidth;
    document.getElementById('content').innerHTML = "<p>Sua pontuação</p> <h1 class='number'> " + score + "</h1> <button onclick='restartGame()'>JOGAR DE NOVO</button>";
}

function restartGame() {
    location.reload();
};

function getRandom(min, max) {
    let random = Math.floor(Math.random() * (max - min) + min)
    return random - (random % PIXEL_SIZE);
}

var game = new Phaser.Game(config);

var clickInit = { x: 0, y: 0 };
var framesInterval = 45;
var snake;
var snake2;
var players = 1;
var fruit;
var keyboard;
var keyboard2;
var score;
var lastTime = 0

function preload() {
    this.load.image('apple', './assets/imgs/apple.png');
    this.load.image('snake', './assets/imgs/snake.png');
    this.load.image('snake2', './assets/imgs/snake2.png')
}

function create() {

    console.log(game);
    console.log(this);

    var Snake = new Phaser.Class({

        initialize:
        function Snake(scene, player, x, y) {

            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.player = player;

            if(player == 1) {
                this.head = this.body.create(x, y, 'snake');
                this.head.setOrigin(0);
            } else {
                this.head = this.body.create(x, y, 'snake2');
                this.head.setOrigin(0);
            }
            

            this.alive = false;

            this.snake_body = new Phaser.Geom.Point(-100, -100);

            this.heading = 'RIGHT';
            this.direction = 'RIGHT';
        },
        changeDirection: function(newDirection) {
            if(newDirection == 'LEFT' && this.heading != 'RIGHT') {
                this.heading = 'LEFT';
            }
            if(newDirection == 'RIGHT' && this.heading != 'LEFT') {
                this.heading = 'RIGHT';
            }
            if(newDirection == 'UP' && this.heading != 'DOWN') {
                this.heading = 'UP';
            }
            if(newDirection == 'DOWN' && this.heading != 'UP') {
                this.heading = 'DOWN';
            }
        },
        move: function(time) {
            switch (this.heading) {
                case 'LEFT':
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, game_width/16);
                    break;

                case 'RIGHT':
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, game_width/16);
                    break;

                case 'UP':
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, game_height/16);
                    break;

                case 'DOWN':
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, game_height/16);
                    break;
            }
            this.direction = this.heading;

            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);
        },
        eating: function(fruit) {
            
            if ( comparePixel(this.head.x, this.head.y, fruit.x, fruit.y) ) {
                fruit.eat();
                fruit.create();
                this.increaseSize()
                return true;
            }
            return false;
        },
        increaseSize: function() {
            if(this.player == 1) {
                var newPart = this.body.create(this.snake_body.x, this.snake_body.y, 'snake');
            } else {
                var newPart = this.body.create(this.snake_body.x, this.snake_body.y, 'snake2');
            }
            newPart.setOrigin(0);
        },
        checkDeath: function()  {
            for(let i = 1; i < this.body.children.size; i++) {
                if( (this.head.x == this.body.children.entries[i].x) && (this.head.y == this.body.children.entries[i].y) ) {
                    console.log('perdeu');
                    showRestartModal(fruit.total);
                    this.alive = false;
                }
            }
        }
    });
    
    var Fruit = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
        function Fruit(scene) {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('apple');
            this.create();

            this.total = 0;

            scene.children.add(this);
        },
        eat: function() {
            this.total++;
            score.text = this.total;
            if( this.total % 5 == 0 && framesInterval > 15) {
                framesInterval = framesInterval - (40/this.total);
            }

        },
        create: function() {
            x = getRandom(64, game_width);
            y = getRandom(64, game_height);
            let samePosition = false;
            for(let i = 0; i < snake.body.children.size; i++) {
                if(comparePixel(x, y, snake.body.children.entries[i].x, snake.body.children.entries[i].y)) {
                    samePosition = true;
                }
            }
            if (samePosition) {
                this.create();
            } else {
                this.setPosition(x, y);
            }
        }

    });

    score = this.add.text(game_width/2, 10, 0, { 
        fontFamily: 'Arial', 
        fontSize: 50,
        fontWeight: 'bold',
        color: '#555555'
    })

    snake = new Snake(this, 1, 32, 260);
    snake2 = new Snake(this, 2, 16, 380);

    let interval = setInterval(()=> {
        snake.changeDirection('UP');
        snake2.changeDirection('UP');
        clearInterval(interval);
    }, 500)
    
    fruit = new Fruit(this);

    keyboard = this.input.keyboard.createCursorKeys();
    keyboard2 = this.input.keyboard.addKeys(
                {up:Phaser.Input.Keyboard.KeyCodes.W,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.A,
                right:Phaser.Input.Keyboard.KeyCodes.D});

}

function comparePixel(x1, y1, x2, y2) {
    if( (x1 + 16 === x2 && y1 + 16 === y2) ||
        (x1 === x2 - 16 && y1 === y2) ||
        ( (x1 - x2 == -32 || x1 === x2) && y1 === y2) ||
        ( (y1 - y2 == -32) && x1 === x2) ) {
            return true;
    }

    return false;
}

function update(time){

    if(players != 2) {
        snake2.head.x = -100;
        snake2.head.y = -100;
    }

    if(!snake.alive) {
        return;
    }

    if(players == 2) {
        if(!snake2.alive) {
            return;
        }
    }

    if(time - lastTime > framesInterval) {
        lastTime = time;
        snake.move(time);
        if(players == 2) {
            snake2.move(time);
        }
    }

    snake.checkDeath();
    snake2.checkDeath();

    if(keyboard.left.isDown) {
        //console.log('esquerda');
        snake.changeDirection('LEFT');
    }
    else if(keyboard.right.isDown) {
        //console.log('direita');
        snake.changeDirection('RIGHT');
    }
    else if(keyboard.up.isDown) {
        //console.log('cima');
        snake.changeDirection('UP');
    }
    else if(keyboard.down.isDown) {
        //console.log('baixo');
        snake.changeDirection('DOWN');
    }

    if(players == 2) {
        if(keyboard2.left.isDown) {
            //console.log('esquerda');
            snake2.changeDirection('LEFT');
        }
        else if(keyboard2.right.isDown) {
            //console.log('direita');
            snake2.changeDirection('RIGHT');
        }
        else if(keyboard2.up.isDown) {
            //console.log('cima');
            snake2.changeDirection('UP');
        }
        else if(keyboard2.down.isDown) {
            //console.log('baixo');
            snake2.changeDirection('DOWN');
        }
    }

    if(snake.eating(fruit)) {
        console.log('player 1 comeu');
    }
    if(players == 2) {
        if(snake2.eating(fruit)) {
            console.log('player 2 comeu');
        }
    }

}

document.addEventListener("touchstart", (touch) => { 
    clickInit.x = touch.changedTouches[0].clientX;
    clickInit.y = touch.changedTouches[0].clientY;
});

document.addEventListener("touchend", (touch) => { 
    let difference_x = touch.changedTouches[0].clientX - clickInit.x;
    let difference_y = touch.changedTouches[0].clientY - clickInit.y;

    // horizontal move
    if(Math.abs(difference_x) > Math.abs(difference_y)) {

        if(difference_x < 0) {
            snake.changeDirection('LEFT');
        } else {
            snake.changeDirection('RIGHT');
        }

    } 
    // vertical move
    else {

        if(difference_y < 0) {
            snake.changeDirection('UP');
        } else {
            snake.changeDirection('DOWN');
        }

    }
});
