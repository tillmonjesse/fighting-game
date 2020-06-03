import {WIDTH, HEIGHT} from '../constant.js';
import {getAllies, getEnemies, groupIdentifier, enemyIdentifier} from '../service/groups.js';
import {movementCreate, aiMovementCreate} from './movementFactory.js';
import {attackCreate, aiAttackCreate} from './punchFactory.js';
export const characterCreate = (scene, config) => {
	let group = groupIdentifier(config) 
	let enemies = enemyIdentifier(config)
	let character = groupIdentifier(config).create(
		config.x || 0, 
		config.y || 0,
		config.asset || 'no-asset'
	);
    character.setDragX(.95);
    character.setDamping(true);
    character.setMaxVelocity(200);
    character.setMass(5);
    character.setBounce(.8);
    character.setCollideWorldBounds(true);
    character.health = config.health || 100;
    character.hitAnimation = hitAnimation;
    character.hit = {
    	lightAttack: 8,
    	heavyAttack: 30,
    	lightDamage: 7.5,
    	heavyDamage: 30,
    	detected: 0,
    	enemies: []
	};
    character.attack = {
    	animation: 0
    };
    character.hitDamage = hitDamage;
    character.characterAttack = characterAttack;
    character.punch = scene.add.ellipse(WIDTH + 300, HEIGHT + 300, 100, 100, 0xff0000, 1);
    scene.physics.add.existing(character.punch);
    character.punch.body.setAllowDrag(false);
    character.punch.body.setAllowGravity(false);
    character.punch.body.setAllowRotation(false);
    character.punch.body.setMaxVelocity(0);
    character.updateMovement = updateMovement;
    character.cursors = movementCreate(scene, config);
    if (config.ai) 
    {
    	character.ai = aiMovementCreate();
    	character.aiAttack = aiAttackCreate();
    }
    character.punchKeys = attackCreate(scene, config);
    scene.physics.add.overlap(character.punch, enemies, function (punch, enemy)
    {
    	++character.hit.detected;  
        if (character.hit.enemies.indexOf(enemy) === -1)
        {
            character.hit.enemies.push(enemy);
        }

    });
    return character;
};
function hitAnimation(punchKey) {
   punchKey.sinceFirstPressed++;
    if (punchKey.sinceFirstPressed > this.hit.lightAttack && punchKey.sinceFirstPressed <= this.hit.heavyAttack)
    {
        this.attack.animation++;
        if (this.attack.animation > this.hit.lightAttack) 
        {
            this.hitDamage(this.hit.lightDamage);
            punchKey.sinceFirstPressed = 0;
            this.attack.animation = 0;
            this.punch.setPosition(WIDTH + 100, HEIGHT + 100);
            console.log('light attack finished');
            return false;
        }
        return true;
    }
    else if (punchKey.sinceFirstPressed > this.hit.heavyAttack)
    {
        this.attack.animation++;
        if (this.attack.animation > this.hit.heavyAttack)
        {
            this.hitDamage(this.hit.heavyDamage);
            punchKey.sinceFirstPressed = 0;
            this.attack.animation = 0;
            this.punch.setPosition(WIDTH + 100, HEIGHT + 100);
            console.log('heavy attack finished');
            return false;
        }
        return true;
    }
    return false;
}
function hitDamage(hitValue) {
    if (this.hit.detected > 0) 
    {
    	for (let index = 0; index < this.hit.enemies.length; index++) {
    		let enemy = this.hit.enemies[index];
        	enemy.health -= hitValue;
        	console.log(enemy.health);
	        if (enemy.health <= 0) 
	        {
	            enemy.setPosition(WIDTH/2, HEIGHT/2);
	            enemy.health = 100;
	        }
	    }
    }
    this.hit.detected = 0;
    this.hit.enemies = [];    
}
function characterAttack() {
	if (this.aiAttack) 
	{
		this.aiAttack.update(this);
	}
	if (this.punchKeys.punchRight.isDown) 
    {
        this.punchKeys.punchRight.sinceFirstPressed++;
    }
	else if (this.punchKeys.punchRight.isUp && this.punchKeys.punchRight.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchKeys.punchRight)) {
            this.punch.setPosition(this.x + 50, this.y);
        }
    }
    else if (this.punchKeys.punchLeft.isDown)
     {
        this.punchKeys.punchLeft.sinceFirstPressed++;
    }
    else if (this.punchKeys.punchLeft.isUp && this.punchKeys.punchLeft.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchKeys.punchLeft)) {
            this.punch.setPosition(this.x + -50, this.y);
        }
    }
    else if (this.punchKeys.punchUp.isDown) 
    {
        this.punchKeys.punchUp.sinceFirstPressed++;
    }
    else if (this.punchKeys.punchUp.isUp && this.punchKeys.punchUp.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchKeys.punchUp)) {
            this.punch.setPosition(this.x, this.y + -50);
        }
    }
    else if (this.punchKeys.punchDown.isDown) 
    {
        this.punchKeys.punchDown.sinceFirstPressed++;
    }
    else if (this.punchKeys.punchDown.isUp && this.punchKeys.punchDown.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchKeys.punchDown)) {
            this.punch.setPosition(this.x, this.y + 50);
        }
    }
}
function updateMovement () {
	if (this.ai) 
	{
		this.ai.update(this);
	}
	if (this.cursors.right.isDown)
    {
        this.setAccelerationX(200);
    }
    else if (this.cursors.left.isDown)
    {
        this.setAccelerationX(-200);
    }
    else
    {
        this.setAccelerationX(0);
    }
    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.setVelocityY(-200);
    }
    else if (this.cursors.down.isDown)
    {
        this.setAccelerationY(200);
    }
    else
    {
        this.setAccelerationY(0);
    }
}
