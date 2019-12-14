var config = {
    type: Phaser.WEBGL,
    width: 500,
    height: 500,
    backgroundColor: '#269086',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

function preload() {
    this.load.image('apple', './assets/imgs/apple.png');
}

function create() {

    let Snake = new Phaser.Class({
        initialize:

        function Snake(scene, x, y) {
            this.position = new Phaser.Geom.Point(x, y);

            this.head = this.body.create( x, y, 'body');
            this.head.setOrigin(0);


            this.speed = 100;

            this.moveTime = 0;

            this.heading = RIGHT;
            this.direction = RIGHT;

        }

        
    });

}

function update(time, delta) {

}
