import {WIDTH, HEIGHT} from '../constant.js';
export const characterCreate = (scene, config, cursors, punchDirection) => {
	let character = scene.physics.add.image(
		config.x || 0, 
		config.y || 0,
		config.asset || 'no-asset'
	);
    character.setDragX(.95);
    character.setDamping(true);
    character.setMaxVelocity(200);
    character.setMass(5);
    character.setBounce(.8);
    character.health = config.health || 100;
    character.hitAnimation = hitAnimation;
    character.hit = {
    	lightAttack: 7.5,
    	heavyAttack: 30,
    	lightDamage: 7.5,
    	heavyDamage: 30,
    	detected: 0
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
    character.cursors = cursors;
    character.punchDirection = punchDirection;
    return character;
};
function hitAnimation(punchKey, enemy) {
   punchKey.sinceFirstPressed++;
    if (punchKey.sinceFirstPressed > this.hit.lightAttack && punchKey.sinceFirstPressed <= this.hit.heavyAttack)
    {
        this.attack.animation++;
        if (this.attack.animation > this.hit.lightAttack) 
        {
            this.hitDamage(this.hit.lightDamage, enemy);
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
            this.hitDamage(this.hit.heavyDamage, enemy);
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
function hitDamage(hitValue, enemy) {
    if (this.hit.detected > 0) 
    {
        enemy.health -= hitValue;
        if (enemy.health <= 0) 
        {
            enemy.setPosition(WIDTH/2, HEIGHT/2);
            enemy.health = 100;
        }
    }
    this.hit.detected = 0;
    console.log(enemy.health);
}
function characterAttack(enemy) {
	if (this.punchDirection.punchRight.isDown) 
    {
        this.punchDirection.punchRight.sinceFirstPressed++;
    }
	else if (this.punchDirection.punchRight.isUp && this.punchDirection.punchRight.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchDirection.punchRight, enemy)) {
            this.punch.setPosition(this.x + 50, this.y);
        }
    }
    else if (this.punchDirection.punchLeft.isDown)
     {
        this.punchDirection.punchLeft.sinceFirstPressed++;
    }
    else if (this.punchDirection.punchLeft.isUp && this.punchDirection.punchLeft.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchDirection.punchLeft, enemy)) {
            this.punch.setPosition(this.x + -50, this.y);
        }
    }
    else if (this.punchDirection.punchUp.isDown) 
    {
        this.punchDirection.punchUp.sinceFirstPressed++;
    }
    else if (this.punchDirection.punchUp.isUp && this.punchDirection.punchUp.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchDirection.punchUp, enemy)) {
            this.punch.setPosition(this.x, this.y + -50);
        }
    }
    else if (this.punchDirection.punchDown.isDown) 
    {
        this.punchDirection.punchDown.sinceFirstPressed++;
    }
    else if (this.punchDirection.punchDown.isUp && this.punchDirection.punchDown.sinceFirstPressed > 0) 
    {
        if (this.hitAnimation(this.punchDirection.punchDown, enemy)) {
            this.punch.setPosition(this.x, this.y + 50);
        }
    }
}
function updateMovement () {
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