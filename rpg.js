const combatLog = document.querySelector("section#bottomText div");
const actionButtons = document.querySelectorAll(".actions button");
const manaPotion = 50;
const healPotion = 40;
let intelligence = 10;
let strengh = 5;
let vitality = 9;
let playerMaxMana = 150;
let enemyMaxMana = 100;
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
const treasure = document.getElementById("treasure")
const targetEnemy = document.querySelector(".enemy .profilHead")

function newEnemies(e) {
    if (e == 0 && enemyMaxLife != 120 && enemyMaxLife != 200) {
        targetEnemy.innerHTML = `<img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ac6224d-074e-4d19-b1ff-f4fbcf7732b8/d9xbfa3-c003dc03-ef8a-4497-9f0d-6e6035eeeabe.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhYzYyMjRkLTA3NGUtNGQxOS1iMWZmLWY0ZmJjZjc3MzJiOFwvZDl4YmZhMy1jMDAzZGMwMy1lZjhhLTQ0OTctOWYwZC02ZTYwMzVlZWVhYmUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Puk3xcSXHb1f4pceBKjphchmPS7XYo-yuPtL9PJkbBs" width="25%"><p></p>`
        enemyMaxLife = 120
        enemyLife = 120
        updateLife();
        updateMana();
        combatLog.innerHTML += `<p class="red">☠️HERE COMES A NEW CHALLENGER !☠️</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;

        showPlayerDamages = document.querySelector("#player .profilHead p");
        playerShadow = document.querySelector("#player .profilHead img");
        showEnemyDamages = document.querySelector(".enemy .profilHead p");
        enemyShadow = document.querySelector(".enemy .profilHead img");
    }
    else if (e == 0 && enemyMaxLife == 120 && enemyMaxLife != 200) {
        targetEnemy.innerHTML = `<img src="https://images6.fanpop.com/image/photos/36900000/Bi-japanese-monster-movies-36925599-500-476.gif" width="40%"><p></p>`
        enemyMaxLife = 200
        enemyLife = 200
        updateLife();
        updateMana();
        combatLog.innerHTML += `<p class="red">☠️HERE COMES A NEW CHALLENGER !☠️</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;

        showPlayerDamages = document.querySelector("#player .profilHead p");
        playerShadow = document.querySelector("#player .profilHead img");
        showEnemyDamages = document.querySelector(".enemy .profilHead p");
        enemyShadow = document.querySelector(".enemy .profilHead img");
    }
    else if (e == 0 && enemyMaxLife == 200 && enemyMaxLife != !120) {
        firstEnemy.classList.remove("enemy");
        treasure.classList.add("enemy");
        combatLog.innerHTML += `<p class="yellow">CONGRATULATIONS ! You got the boss's treasure ! CLIC to OPEN !</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;
    }
}

let golds = document.querySelector(".inventory ul")

function getTreasure() {
    document.querySelector("#treasure .profilHead").innerHTML = `<video src="vid/goldCoinAnimation.mp4" autoplay muted loop width="70%" height="70%">gold coin</video>`
    combatLog.innerHTML += `<p class="yellow">You find 300 golds !</p>`;
    combatLog.scrollTop = combatLog.scrollHeight;
    // add gold to inventory
    golds.innerHTML += `<li>Golds : 300</li>`;
    setTimeout(() => {
        document.querySelector("#treasure .profilHead").innerHTML += `<button onclick="merchant(0)">Merchant</button>`;
        combatLog.innerHTML += `<p class="yellow">You have now access to the shop !</p>`;
        combatLog.scrollTop = combatLog.scrollHeight;
    }, 3000);
}

function merchant(m) {
    if (m == 0) {
        m = 1;
        const shop = document.querySelector("section.versus")
        shop.innerHTML += `<div class="merchant"><h3>SHOP</h3><img src ="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ee34f51d-eb2c-4fd0-8047-260ae0417996/dccor7t-a950b988-b375-46f8-8c78-458e132dd4cc.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VlMzRmNTFkLWViMmMtNGZkMC04MDQ3LTI2MGFlMDQxNzk5NlwvZGNjb3I3dC1hOTUwYjk4OC1iMzc1LTQ2ZjgtOGM3OC00NThlMTMyZGQ0Y2MuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MDcAf4fh_8Mri_fIZfhMN1qCazRBBrXYz6lmjMmpxcg" alt="merchant" width="auto"><div>`
    }
    else {
        m = 0
    }
}

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

let showPlayerDamages = document.querySelector("#player .profilHead p");
let playerShadow = document.querySelector("#player .profilHead img");
let showEnemyDamages = document.querySelector(".enemy .profilHead p");
let enemyShadow = document.querySelector(".enemy .profilHead img");

function injectPlayerDamages(d) {
    showEnemyDamages.classList.add("damages");
    enemyShadow.classList.add("damages");
    showEnemyDamages.innerHTML = `-${d}`;
    setTimeout(function () {
        showEnemyDamages.classList.remove("damages");
        enemyShadow.classList.remove("damages");
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
    playerShadow.classList.add("damages");
    showPlayerDamages.innerHTML = `-${d}`;
    setTimeout(function () {
        showPlayerDamages.classList.remove("damages");
        playerShadow.classList.remove("damages");
    }, 2000)
}

function enemyAttack() {
    if (enemyLife <= 0) {
        enemyLife = 0;
        combatLog.innerHTML += `<p>☠️Enemy is DEAD.☠️</p>`
        combatLog.scrollTop = combatLog.scrollHeight;
        newEnemies(enemyLife);
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
        let damages = (getRand(10) + 1) + strengh;
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
    let damages = (getRand(5) + 1) + (intelligence);
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

            if (enemyLife >= (enemyMaxLife / 3)) {
                combatLog.innerHTML += `<p>You blast a incredible fireball in the enemy's head ! He takes ${damages} damages !</p>`;
                combatLog.scrollTop = combatLog.scrollHeight;
            }
            else {
                combatLog.innerHTML += `<p>You blast a fireball on the enemy, dealing ${damages} damages. It's less effective !</p>`
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
            setTimeout(disableButtons, 2000);
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
            setTimeout(disableButtons, 2000);
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