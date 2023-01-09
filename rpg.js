let playerLife = 100;
let enemyLife = 100;
let playerMana = 100;
let enemyMana = 100;

const miniPotion = 10;
const maxiPotion = 30;

console.log(`Here comes a new challenger ! C4m1ll3 enters the dungeon.`)

function attackWithHands() {
    enemyLife -= 10;
    if (enemyLife < 0) {
        enemyLife = 0;
        console.log("You continue to punch the dead corpse on the ground.");
    }
    else if (enemyLife == 0) {
        console.log(`FINISHER PUNCH ! Enemy's life is now at ${enemyLife} hp ! He dies !`);
    }
    else {
        console.log(`Punch ! Enemy's life is now at ${enemyLife} hp !`);
    }
    updateLife();
}

function attackWithSword() {
    enemyLife -= 30;
    if (enemyLife <= 0) {
        enemyLife = 0;
        console.log(`FINISHER SWING ! Enemy's life is now at ${enemyLife} hp ! He dies !`);
    }
    else {
        console.log(`Swing ! Enemy's life is now at ${enemyLife} hp !`);
    }
    updateLife();
}

function fireball() {
    if (playerMana < 30) {
        console.log(`You try to blast a fireball, but you don't have enough mana.\nTips : drink mana potion to recover your MP.`)
    }
    else {
        enemyLife /= 2;
        playerMana -= 30;

        if (enemyLife >= 50) {
            console.log(`You blast a incredible fireball in the enemmy's head ! He takes ${enemyLife} damages !`)
        }
        else {
            console.log(`You blast a fireball on the enemy, but he seems to resist !`)
        }
    }

    updateLife();
    updateMana();
}

function enemyAttack() {
    playerLife -= 40;
    if (playerLife > 0) {
        console.log(`Enemy attacked ! C4m1ll3's life is now at ${playerLife} hp !`);
    }
    else if (playerLife <= 0) {
        playerLife = 0;
        console.log(`Enemy attacked ! C4m1ll3's life is now at ${playerLife} hp ! You die... GAME OVER.`);
    }
    updateLife();
}

function takePotion(p) {
    playerLife += p;
    if (playerLife == 100) {
        console.log(`Glup, taking a potion !\nC4m1ll3 took a potion, her life is now full !`)
    }
    else if (playerLife > 100) {
        playerLife = 100;
        console.log(`Glup, taking a potion !\nC4m1ll3 took a potion, but her life is allready full ! What a waste...`);
    }
    else if (p == 10) {

        console.log(`Glup, taking mini potion !\nC4m1ll3 took a potion, her life is now at ${playerLife} hp.`);
    }
    else if (p == 30) {
        console.log(`Glup, taking maxi potion !\nC4m1ll3 took a potion, her life is now at ${playerLife} hp.`);
    }
    updateLife();
}

function comboAttack(nbHits) {
    console.log(`COMBO ATTACK X${nbHits}`);
    for (let i = 0; i < nbHits; i++) {
        attackWithHands();
    }
    updateLife();
}

const playerLifeBar = document.querySelector("#player .healthbar");
const enemyLifeBar = document.querySelector("#enemy .healthbar");
const playerManaBar = document.querySelector("#player .manabar");
const enemyManaBar = document.querySelector("#enemy .manabar");

function updateLife() {
    playerLifeBar.style.width = `${playerLife}%`;
    playerLifeBar.innerHTML = `${playerLife}HP`;
    enemyLifeBar.style.width = `${enemyLife}%`;
    enemyLifeBar.innerHTML = `${enemyLife}HP`;
}
updateLife();

function updateMana() {
    playerManaBar.style.width = `${playerMana}%`;
    playerManaBar.innerHTML = `${playerMana}MP`;
    enemyManaBar.style.width = `${enemyMana}%`;
    enemyManaBar.innerHTML = `${enemyMana}MP`;
}
updateMana();

// attackWithSword();
// attackWithHands();
// enemyAttack();
// takePotion(miniPotion);
// comboAttack(3);
// attackWithSword();