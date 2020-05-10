import {WIDTH, HEIGHT} from '../constant.js';
export const characterCreate = (scene,config) => {
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
    return character;
};
function hitAnimation(punchKey, punch, enemy) {
   punchKey.sinceFirstPressed++;
    if (punchKey.sinceFirstPressed > this.hit.lightAttack && punchKey.sinceFirstPressed <= this.hit.heavyAttack)
    {
        this.attack.animation++;
        if (this.attack.animation > this.hit.lightAttack) 
        {
            this.hitDamage(this.hit.lightDamage, enemy);
            punchKey.sinceFirstPressed = 0;
            this.attack.animation = 0;
            punch.setPosition(WIDTH + 100, HEIGHT + 100);
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
            punch.setPosition(WIDTH + 100, HEIGHT + 100);
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