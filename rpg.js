const combatLog = document.querySelector("section#bottomText p");
const playerMaxLife = 90;
const enemyMaxLife = 70;
const playerMaxMana = 150;
const enemyMaxMana = 100;
const manaPotion = 50;
const healPotion = 40;
let playerLife = 90;
let enemyLife = 70;
let playerMana = 150;
let enemyMana = 100;
let healPotionStock = 3;
let manaPotionStock = 3;

combatLog.innerHTML = `Here comes a new challenger ! C4m1ll3 enters the dungeon.<br>`;

function getRand(x) {
    return Math.floor(Math.random() * x);
}

function enemyAttack() {
    combatLog.innerHTML += `<br>☠️Enemy turn begins !☠️`
    let damages = getRand(10) + 10;
    playerLife -= damages;
    if (damages <= 10) {
        combatLog.innerHTML += `<br>Enemy attacked, but misses !`;
    }
    else if (playerLife > 0) {
        combatLog.innerHTML += `<br>Enemy attacked, dealing ${damages} damages ! C4m1ll3's life is now at ${playerLife} hp !`;
    }
    else if (playerLife <= 0) {
        playerLife = 0;
        combatLog.innerHTML += `<br>Enemy attacked, dealing ${damages} damages ! C4m1ll3's life is now at ${playerLife} hp ! You die... GAME OVER.`;
    }
    combatLog.innerHTML += `<br>🪄Your turn ! What will you do ?🪄`
    updateLife();
}

function spark() {
    let damages = getRand(5) + 5;
    enemyLife -= damages;
    if (enemyLife < 0) {
        enemyLife = 0;
        combatLog.innerHTML += "<br>You made your enemy disapear in sparkles.";
    }
    else if (enemyLife == 0) {
        combatLog.innerHTML += `<br>FINISHER RAINBOW SPARKLE ! Enemy's life is now at ${enemyLife} hp ! He dies !`;
    }
    else {
        combatLog.innerHTML += `<br>Hit for ${damages} ! Enemy's life is now at ${enemyLife} hp !`;
    }
    updateLife();
}

function attackWithSword() {
    let damages = getRand(15) + 5
    enemyLife -= damages;
    if (enemyLife <= 0) {
        enemyLife = 0;
        combatLog.innerHTML += `<br>FINISHER SWING ! Enemy's life is now at ${enemyLife} hp ! He dies !`;
    }
    else {
        combatLog.innerHTML += `<br>Swing ! You hit for ${damages} damages ! Enemy's life is now at ${enemyLife} hp.`;
    }
    enemyAttack();
    updateLife();
}

function fireball() {
    if (playerMana < 30) {
        combatLog.innerHTML += `<br>You try to blast a fireball, but you don't have enough mana.\nTips : drink mana potion to recover your MP.`;
    }
    else {
        enemyLife /= 2;
        playerMana -= 30;

        if (enemyLife >= (enemyMaxLife / 2)) {
            combatLog.innerHTML += `<br>You blast a incredible fireball in the enemy's head ! He takes ${enemyLife} damages !`;
        }
        else {
            combatLog.innerHTML += `<br>You blast a fireball on the enemy, but he seems to resist !`
        }
    }
    enemyAttack();
    updateLife();
    updateMana();
}

function takeHealPotion(p) {
    if (healPotionStock >= 0) {
        healPotionStock -= 1;
    }
    if (healPotionStock < 0) {
        healPotionStock = 0;
        combatLog.innerHTML += `<br>You can't use any heal potions, you drink them all !`
    }
    else {
        playerLife += p;
        if (playerLife == playerMaxLife) {
            combatLog.innerHTML += `<br>Glup, taking a heal potion !<br>C4m1ll3 took a potion, her life is now full !`;
        }
        else if (playerLife > playerMaxLife) {
            playerLife = playerMaxLife;
            combatLog.innerHTML += `<br>Glup, taking a heal potion !<br>C4m1ll3 took a potion, but her life is allready full ! What a waste...`;
        }
        else if (p == 40) {

            combatLog.innerHTML += `<br>Glup, taking a heal potion !<br>C4m1ll3 took a potion, her life is now at ${playerLife} hp.`;
        }
        updateLife();
        updatePotions();
    }
}

function takeManaPotion(q) {
    if (manaPotionStock >= 0) {
        manaPotionStock -= 1;
    }
    if (manaPotionStock < 0) {
        manaPotionStock = 0;
        combatLog.innerHTML += `<br>You can't use any mana potions, you drink them all !`
    }
    else {
        playerMana += q;
        if (playerMana == playerMaxMana) {
            combatLog.innerHTML += `<br>Glup, taking a mana potion !<br>C4m1ll3 took a potion, her mana is now full !`;
        }
        else if (playerMana > playerMaxMana) {
            playerMana = playerMaxMana;
            combatLog.innerHTML += `<br>Glup, taking a mana potion !<br>C4m1ll3 took a potion, but her mana is allready full ! What a waste...`;
        }
        else if (q == 50) {

            combatLog.innerHTML += `<br>Glup, taking a mana potion !<br>C4m1ll3 took a potion, her mana is now at ${playerMana} mp.`;
        }
        updateMana();
        updatePotions();
    }
}

function magicSparkles(nbHits) {
    if (playerMana < 50) {
        combatLog.innerHTML += `<br>You try to cast Magic Sparkles, but you don't have enough mana.\nTips : drink mana potion to recover your MP.`
    }
    else {
        playerMana -= 50;
        combatLog.innerHTML += `<br>You cast Magic Sparkles on your enemy !<br>COMBO ATTACK X${nbHits}`;
        for (let i = 0; i < nbHits; i++) {
            spark();
        }
        enemyAttack();
        updateLife();
        updateMana();
    }
}

const playerLifeBar = document.querySelector("#player .healthbar");
const enemyLifeBar = document.querySelector("#enemy .healthbar");
const playerManaBar = document.querySelector("#player .manabar");
const enemyManaBar = document.querySelector("#enemy .manabar");
const nbLifePotions = document.querySelector(".inventory ul li span#heal")
const nbManaPotions = document.querySelector(".inventory ul li span#mana")


function playerLifePourcent() {
    return playerLife / playerMaxLife * 100;
}

function playerManaPourcent() {
    return playerMana / playerMaxMana * 100;
}

function enemyLifePourcent() {
    return enemyLife / enemyMaxLife * 100;
}

function enemyManaPourcent() {
    return enemyMana / enemyMaxMana * 100;
}

function updateLife() {
    playerLifeBar.style.width = `${playerLifePourcent()}%`;
    playerLifeBar.innerHTML = `${playerLife}/${playerMaxLife}HP`;
    enemyLifeBar.style.width = `${enemyLifePourcent()}%`;
    enemyLifeBar.innerHTML = `${enemyLife}/${enemyMaxLife}HP`;
}

updateLife();

function updateMana() {
    playerManaBar.style.width = `${playerManaPourcent()}%`;
    playerManaBar.innerHTML = `${playerMana}/${playerMaxMana}MP`;
    enemyManaBar.style.width = `${enemyManaPourcent()}%`;
    enemyManaBar.innerHTML = `${enemyMana}/${enemyMaxMana}MP`;
}
updateMana();

function updatePotions() {
    nbLifePotions.innerHTML = `${healPotionStock}`
    nbManaPotions.innerHTML = `${manaPotionStock}`
}
updatePotions();

// attackWithSword();
// attackWithHands();
// enemyAttack();
// takePotion(miniPotion);
// comboAttack(3);
// attackWithSword();