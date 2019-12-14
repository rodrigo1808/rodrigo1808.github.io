const PIXEL_SIZE = 32;
const game_width = 20 * PIXEL_SIZE;
const game_height = 20 * PIXEL_SIZE;

var config = {
    type: Phaser.AUTO,
    width: game_width,
    height: game_height,
    backgroundColor: '#b3e6ff',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function getRandom(min, max) {
    let random = Math.floor(Math.random() * (max - min) + min)
    return random - (random % PIXEL_SIZE);
}

var game = new Phaser.Game(config);

var framesInterval = 60;
var snake;
var keyboard;
var score;

function preload() {
    this.load.image('apple', 'https://github.com/rodrigo1808/Snake_Game/blob/master/assets/imgs/apple.png?raw=true');
}

function create() {

    var Snake = new Phaser.Class({

        initialize:
        function Snake(scene) {
            this.headPosition = new Phaser.Geom.Point(32, 260);

            this.body = scene.add.group();

            this.head = this.body.create(32, 260, 'apple');
            this.head.setOrigin(0);

            this.speed = 100;

            this.moveTime = 0;

            this.alive = true;

            this.tail = new Phaser.Geom.Point(32, 260);

            this.heading = 'RIGHT';
            this.direction = 'RIGHT';
        },
        changeDirection: function(newDirection) {
            if(newDirection == 'LEFT') {
                this.heading = 'LEFT';
            }
            if(newDirection == 'RIGHT') {
                this.heading = 'RIGHT';
            }
            if(newDirection == 'UP') {
                this.heading = 'UP';
            }
            if(newDirection == 'DOWN') {
                this.heading = 'DOWN';
            }
        },
        move: function(time) {
            switch (this.heading) {
                case 'LEFT':
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                    break;

                case 'RIGHT':
                    this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                    break;

                case 'UP':
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 40);
                    break;

                case 'DOWN':
                    this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 40);
                    break;
            }

            this.direction = this.heading;

            Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);
        }
    });
    
    var Fruit = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:
        function Fruit(scene) {
            Phaser.GameObjects.Image.call(this, scene)

            this.setTexture('apple');
            x = getRandom(64, 568);
            y = getRandom(64, 568);
            this.setPosition(x, y);
            // this.setOrigin(0);

            this.total = 0;

            scene.children.add(this);
        },
        eat: function() {
            this.total++;
        }

    });

    score = this.add.text(10, 10, 0, { 
        fontFamily: 'Arial', 
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    })

    snake = new Snake(this);
    snake.changeDirection('UP');

    fruit = new Fruit(this);

    keyboard = this.input.keyboard.createCursorKeys();

}

var lastTime = 0

function update(time){


    if(time - lastTime > framesInterval) {
        console.log(time);
        lastTime = time;
        snake.move(time);
    }

    
    if(snake.alive) {
        // snake.move(time);
    }

    if (keyboard.left.isDown) {
        console.log('esquerda');
        snake.changeDirection('LEFT');
    }
    else if (keyboard.right.isDown) {
        console.log('direita');
        snake.changeDirection('RIGHT');
    }
    else if (keyboard.up.isDown) {
        console.log('cima');
        snake.changeDirection('UP');
    }
    else if (keyboard.down.isDown) {
        console.log('baixo');
        snake.changeDirection('DOWN');
    }
}