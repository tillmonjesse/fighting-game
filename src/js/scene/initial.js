import Phaser from 'phaser';
import {WIDTH, HEIGHT} from '../constant.js';
import {characterCreate} from '../factory/characterFactory.js';
import {groupCreate, getAllies, getEnemies, ALLY_TEAM_NAME, ENEMY_TEAM_NAME} from '../service/groups.js'
const scene = {
    preload, create, update
};
export default scene;
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
    //create background
    this.add.image(WIDTH/2, HEIGHT/2, 'sky');

    //physics groups
    groupCreate(this);

    //player controls
    var punchDirection = {
        punchRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        punchLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        punchUp: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        punchDown: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)    
    };
    punchDirection.punchRight.sinceFirstPressed = 0;
    punchDirection.punchLeft.sinceFirstPressed = 0;
    punchDirection.punchUp.sinceFirstPressed = 0;
    punchDirection.punchDown.sinceFirstPressed = 0;

    //create character
    characterCreate(
        this, 
        {
            asset: 'logo',
            health: 100,
            team: ALLY_TEAM_NAME,
            keyboardMovement: true
        },
        punchDirection
    );
    characterCreate(
        this, 
        {
            x: WIDTH/2,
            y: HEIGHT/2,
            asset: 'enemy',
            health: 100,
            team: ENEMY_TEAM_NAME
        }
    );
    characterCreate(
        this,
        {
            x: WIDTH/3,
            y: HEIGHT/3,
            asset: 'enemy',
            health: 100,
            team: ENEMY_TEAM_NAME
        }
    );
}
function update ()
{
    var index;
    var alliesArray = getAllies().getChildren();
    for (index = 0; index < alliesArray.length; index++) 
    {
        var ally = alliesArray[index];
        ally.updateMovement();
        ally.characterAttack();
    }
    var enemiesArray = getEnemies().getChildren();
    for (index = 0; index < enemiesArray.lenth; index++)
    {
        var enemy = enemiesArray[index];
        enemy.updateMovement();
        enemy.characterAttack();
    }
    
}
