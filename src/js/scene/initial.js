import Phaser from 'phaser';
import {WIDTH, HEIGHT} from '../constant.js';
import {characterCreate} from '../factory/characterFactory.js';
const scene = {
    preload, create, update
};
export default scene;
let platforms;
let logo;
let enemy;
function preload ()
{

    this.load.image('sky', '/assets/space3.png');
    this.load.image('logo', '/assets/original.png');
    this.load.image('red', '/assets/red.png');
    this.load.image('ground', '/assets/ground.png');
    this.load.image('enemy', '/assets/enemy.png');
    this.load.image('no-asset', '/assets/noasset.jpg');
}

function create ()
{
    var punchDirection = {
        punchRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        punchLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        punchUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        punchDown: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        
    }
    punchDirection.punchRight.sinceFirstPressed = 0;
    punchDirection.punchLeft.sinceFirstPressed = 0;
    punchDirection.punchUp.sinceFirstPressed = 0;
    punchDirection.punchDown.sinceFirstPressed = 0;

    this.add.image(WIDTH/2, HEIGHT/2, 'sky');
    platforms = this.physics.add.staticGroup();

    platforms.create(WIDTH/2, HEIGHT, 'ground');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    logo = characterCreate(
        this, 
        {
            asset: 'logo',
            health: 100
        },
        this.input.keyboard.createCursorKeys(),
        punchDirection
    );

    enemy = characterCreate(this, {
        x: WIDTH/2,
        y: HEIGHT/2,
        asset: 'enemy',
        health: 100
    });

    
    logo.setCollideWorldBounds(true);
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(logo, platforms);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(logo, enemy);
    this.physics.add.overlap(logo.punch, enemy, function (punch, enemy)
    {
    	++logo.hit.detected;
    });

    emitter.startFollow(logo);
}
function update ()
{
    logo.updateMovement();
    logo.characterAttack(enemy);
}
