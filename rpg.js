const combatLog = document.querySelector("section#bottomText div");
const actionButtons = document.querySelectorAll(".actions button");
const playerMaxMana = 150;
const enemyMaxMana = 100;
const manaPotion = 50;
const healPotion = 40;
const intelligence = 10;
const force = 5;
const vitality = 9;
let playerMaxLife = vitality * 10;
let enemyMaxLife = 70;
let playerLife = 90;
let enemyLife = 70;
let playerMana = 150;
let enemyMana = 100;
let healPotionStock = 3;
let manaPotionStock = 3;

combatLog.innerHTML = `<p>Here comes a new challenger ! C4m1ll3 enters the dungeon.</p>`;
combatLog.scrollTop = combatLog.scrollHeight;

const firstEnemy = document.getElementById("enemy1");
const secondEnemy = document.getElementById("enemy2");
const thirdEnemy = document.getElementById("enemy3");

function newEnemies(e) {
    if (e == 70) {
        firstEnemy.classList.add("enemy");
    }
    else if (e == 0 && enemyMaxLife != 120) {
        firstEnemy.classList.remove("enemy");
        secondEnemy.classList.add("enemy")
        enemyMaxLife = 120
        enemyLife = 120
        updateLife();
        updateMana();
    }
    else if (e == 0 && enemyMaxLife == 120) {
        secondEnemy.classList.remove("enemy");
        thirdEnemy.classList.add("enemy")
        enemyMaxLife = 200
        enemyLife = 200
        updateLife();
        updateMana();
    }
}

newEnemies(enemyLife);

function getRand(x) {
    return Math.floor(Math.random() * x);
}

function disableButtons() {
    for (let i = 0; i < actionButtons.length; i++) {
        if (actionButtons[i].disabled) {
            actionButtons[i].disabled = false;
        }
        else {
            actionButtons[i].disabled = true;
        }
    }
}

const showPlayerDamages = document.querySelector("#player .profilHead p")
const showEnemyDamages = document.querySelector(".enemy .profilHead p")

function injectPlayerDamages(d) {
    showEnemyDamages.classList.add("damages");
    showEnemyDamages.innerHTML = `-${d}`;
    setTimeout(function () {
        showEnemyDamages.classList.remove("damages")
    }, 2000)
}

function injectHealPotions(p) {
    showPlayerDamages.classList.add("healPotions");
    showPlayerDamages.innerHTML = `+${p}`;
    setTimeout(function () {
        showPlayerDamages.classList.remove("healPotions")
    }, 2000)
}

function injectManaPotions(p) {
    showPlayerDamages.classList.add("manaPotions");
    showPlayerDamages.innerHTML = `+${p}`;
    setTimeout(function () {
        showPlayerDamages.classList.remove("manaPotions")
    }, 2000)
}

function injectEnemyDamages(d) {
    showPlayerDamages.classList.add("damages");
    showPlayerDamages.innerHTML = `-${d}`;
    setTimeout(function () {
        showPlayerDamages.classList.remove("damages")
    }, 2000)
}

function enemyAttack() {
    if (enemyLife <= 0) {
        enemyLife = 0;
        combatLog.innerHTML += `<p>☠️Enemy is DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
        newEnemies(enemyLife);
        combatLog.innerHTML += `<p class="red">☠️HERE COMES A NEW CHALLENGER !☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        combatLog.innerHTML += `<p>☠️Enemy turn begins !☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
        let damages = getRand(30) + 10;
        playerLife -= damages;
        if (damages <= 20) {
            playerLife += damages;
            combatLog.innerHTML += `<p class="red">Enemy attacked, but misses !</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else if (playerLife > 0) {
            combatLog.innerHTML += `<p class="red">Enemy attacked, dealing ${damages} damages ! C4m1ll3's life is now at ${playerLife} hp !</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
            injectEnemyDamages(damages);
        }
        else if (playerLife <= 0) {
            playerLife = 0;
            combatLog.innerHTML += `<p class="red">Enemy attacked, dealing ${damages} damages ! C4m1ll3's life is now at ${playerLife} hp ! You die... GAME OVER.</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
            injectEnemyDamages(damages);
        }
        combatLog.innerHTML += `<p class="green">Your turn ! What will you do ?</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
        updateLife();
    }
}

function attackWithSword() {
    if (enemyLife <= 0) {
        combatLog.innerHTML += `<p>☠️Enemy is DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else if (playerLife <= 0) {
        combatLog.innerHTML += `<p>☠️You are DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        let damages = getRand(10) + force;
        enemyLife -= damages;
        if (enemyLife <= 0) {
            enemyLife = 0;
            combatLog.innerHTML += `<p>FINISHER SWING ! Enemy's life is now at ${enemyLife} hp ! He dies !</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else {
            combatLog.innerHTML += `<p>Swing ! You hit for ${damages} damages ! Enemy's life is now at ${enemyLife} hp.</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
        }

        injectPlayerDamages(damages);
        disableButtons();
        setTimeout(function () {
            enemyAttack();
            disableButtons();
        }, 2000);
        updateLife();
    }
}

function spark() {
    let damages = getRand(5) + (0.5 * intelligence);
    enemyLife -= damages;
    if (enemyLife < 0) {
        enemyLife = 0;
        combatLog.innerHTML += "<p>You made your enemy disapear in sparkles.</p>";
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else if (enemyLife == 0) {
        combatLog.innerHTML += `<p>FINISHER RAINBOW SPARKLE ! Enemy's life is now at ${enemyLife} hp ! He dies !</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        combatLog.innerHTML += `<p>Hit for ${damages} ! Enemy's life is now at ${enemyLife} hp !</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    updateLife();
    return damages;
}

function magicSparkles(nbHits) {
    let total = 0;
    if (enemyLife <= 0) {
        combatLog.innerHTML += `<p>☠️Enemy is DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else if (playerLife <= 0) {
        combatLog.innerHTML += `<p>☠️You are DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        if (playerMana < 50) {
            combatLog.innerHTML += `<p>You try to cast Magic Sparkles, but you don't have enough mana.\nTips : drink mana potion to recover your MP.</p>`
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else {
            playerMana -= 50;
            combatLog.innerHTML += `<p>You cast Magic Sparkles on your enemy !<br>COMBO ATTACK X${nbHits}</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
            for (let i = 0; i < nbHits; i++) {
                total += spark();
            }
            injectPlayerDamages(total);
            disableButtons();
            setTimeout(function () {
                enemyAttack();
                disableButtons();
            }, 2000);
            updateMana();
            updateLife();
        }
    }
}

function fireball() {
    if (enemyLife <= 0) {
        combatLog.innerHTML += `<p>☠️Enemy is DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else if (playerLife <= 0) {
        combatLog.innerHTML += `<p>☠️You are DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        if (playerMana < 30) {
            combatLog.innerHTML += `<p>You try to blast a fireball, but you don't have enough mana.\nTips : drink mana potion to recover your MP.</p>`;
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else {
            damages = (enemyLife / 2) + intelligence;
            enemyLife -= damages;
            playerMana -= 30;

            if (enemyLife >= (enemyMaxLife / 2)) {
                combatLog.innerHTML += `<p>You blast a incredible fireball in the enemy's head ! He takes ${enemyLife} damages !</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else {
                combatLog.innerHTML += `<p>You blast a fireball on the enemy, but it's less effective !</p>`
                combatLog.scrollTop = combatLog.scrollHeight;
            }
        }
        injectPlayerDamages(damages);
        disableButtons();
        setTimeout(function () {
            enemyAttack();
            disableButtons();
        }, 2000);
        updateMana();
        updateLife();
    }
}

function takeHealPotion(p) {
    injectHealPotions(p);
    if (playerLife <= 0) {
        combatLog.innerHTML += `<p>☠️You are DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        if (healPotionStock >= 0) {
            healPotionStock -= 1;
        }
        if (healPotionStock < 0) {
            healPotionStock = 0;
            combatLog.innerHTML += `<p class="green">You can't use any heal potions, you drink them all !</p>`
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else {
            playerLife += p;
            if (playerLife == playerMaxLife) {
                combatLog.innerHTML += `<p class="green">Glup, taking a heal potion !<br>C4m1ll3 took a potion, her life is now full !</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else if (playerLife > playerMaxLife) {
                playerLife = playerMaxLife;
                combatLog.innerHTML += `<p class="green">Glup, taking a heal potion !<br>C4m1ll3 took a potion, but her life is allready full ! What a waste...</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else if (p == 40) {

                combatLog.innerHTML += `<p class="green">Glup, taking a heal potion !<br>C4m1ll3 took a potion, her life is now at ${playerLife} hp.</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            updatePotions();
            updateLife();
            disableButtons();
            setTimeout(disableButtons,2000);
        }
    }
}

function takeManaPotion(q) {
    injectManaPotions(q);
    if (playerLife <= 0) {
        combatLog.innerHTML += `<p>☠️You are DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
    }
    else {
        if (manaPotionStock >= 0) {
            manaPotionStock -= 1;
        }
        if (manaPotionStock < 0) {
            manaPotionStock = 0;
            combatLog.innerHTML += `<p class="blue">You can't use any mana potions, you drink them all !</p>`
            combatLog.scrollTop = combatLog.scrollHeight;
        }
        else {
            playerMana += q;
            if (playerMana == playerMaxMana) {
                combatLog.innerHTML += `<p class="blue">Glup, taking a mana potion !<br>C4m1ll3 took a potion, her mana is now full !</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else if (playerMana > playerMaxMana) {
                playerMana = playerMaxMana;
                combatLog.innerHTML += `<p class="blue">Glup, taking a mana potion !<br>C4m1ll3 took a potion, but her mana is allready full ! What a waste...</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else if (q == 50) {

                combatLog.innerHTML += `<p class="blue">Glup, taking a mana potion !<br>C4m1ll3 took a potion, her mana is now at ${playerMana} mp.</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            updateMana();
            updatePotions();
            disableButtons();
            setTimeout(disableButtons,2000);
        }
    }
}

const playerLifeBar = document.querySelector("#player .healthbar");
const enemyLifeBar = document.querySelector(".enemy .healthbar");
const playerManaBar = document.querySelector("#player .manabar");
const enemyManaBar = document.querySelector(".enemy .manabar");
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