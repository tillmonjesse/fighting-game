import Phaser from 'phaser';
import {WIDTH, HEIGHT} from '../constant.js';
import {characterCreate} from '../factory/characterFactory.js';
const scene = {
    preload, create, update
};
export default scene;
let punchRight;
let punchLeft;
let punchUp;
let punchDown;
let cursors;
let platforms;
let logo;
let enemy;
let punch;
const hit = {
    lightAttack: 7.5,
    heavyAttack: 30,
    lightDamage: 7.5,
    heavyDamage: 30,
    detected: 0
};
const attack = {
    animation: 0
};
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
    punchRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    punchRight.sinceFirstPressed = 0;
    punchLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    punchLeft.sinceFirstPressed = 0;
    punchUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    punchUp.sinceFirstPressed = 0;
    punchDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    punchDown.sinceFirstPressed = 0;

    this.add.image(WIDTH/2, HEIGHT/2, 'sky');
    cursors = this.input.keyboard.createCursorKeys();
    platforms = this.physics.add.staticGroup();

    platforms.create(WIDTH/2, HEIGHT, 'ground');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    logo = characterCreate(this, {
        asset: 'logo',
        health: 100
    });

    enemy = characterCreate(this, {
        x: WIDTH/2,
        y: HEIGHT/2,
        asset: 'enemy',
        health: 100
    });

    punch = this.add.ellipse(WIDTH + 300, HEIGHT + 300, 100, 100, 0xff0000, 1);

    this.physics.add.existing(punch);

    punch.body.setAllowDrag(false);
    punch.body.setAllowGravity(false);
    punch.body.setAllowRotation(false);
    punch.body.setMaxVelocity(0);
    
    logo.setCollideWorldBounds(true);
    enemy.setCollideWorldBounds(true);
    this.physics.add.collider(logo, platforms);
    this.physics.add.collider(enemy, platforms);
    this.physics.add.collider(logo, enemy);
    this.physics.add.overlap(punch, enemy, function (punch, enemy)
    {
    	++logo.hit.detected;
    });

    emitter.startFollow(logo);
}
function update ()
{
    if (cursors.right.isDown)
    {
        this.physics.velocityFromRotation(0, 200, logo.body.acceleration);
    }
    else if (cursors.left.isDown)
    {
        this.physics.velocityFromRotation(180, 200, logo.body.acceleration);
    }
    else
    {
        logo.setAccelerationX(0);
    }
    if (cursors.up.isDown && logo.body.touching.down)
    {
        logo.setVelocityY(-200);
    }
    else if (cursors.down.isDown)
    {
        logo.setAccelerationY(200);
    }
    else
    {
        logo.setAccelerationY(0);
    }
    if (punchRight.isDown) 
    {
        punchRight.sinceFirstPressed++;
    }
    else if (punchRight.isUp && punchRight.sinceFirstPressed > 0) 
    {
        if (logo.hitAnimation(punchRight, punch, enemy)) {
            punch.setPosition(logo.x + 50, logo.y);
        }
    }
    else if (punchLeft.isDown)
     {
        punchLeft.sinceFirstPressed++;
    }
    else if (punchLeft.isUp && punchLeft.sinceFirstPressed > 0) 
    {
        if (logo.hitAnimation(punchLeft, punch, enemy)) {
            punch.setPosition(logo.x + -50, logo.y);
        }
    }
    else if (punchUp.isDown) 
    {
        punchUp.sinceFirstPressed++;
    }
    else if (punchUp.isUp && punchUp.sinceFirstPressed > 0) 
    {
        if (logo.hitAnimation(punchUp, punch, enemy)) {
            punch.setPosition(logo.x, logo.y + -50);
        }
    }
    else if (punchDown.isDown) 
    {
        punchDown.sinceFirstPressed++;
    }
    else if (punchDown.isUp && punchDown.sinceFirstPressed > 0) 
    {
        if (logo.hitAnimation(punchDown, punch, enemy)) {
            punch.setPosition(logo.x, logo.y + 50);
        }
    }
}
