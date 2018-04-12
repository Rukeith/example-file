const persuasionEncounter = (heroes, enemies) => {
  let persuasionBarrier = 0;
  let persuasionPower = 0;
  enemies.forEach(enemy => {
    persuasionBarrier += enemy.barriers.persuade;
  });
  heroes.forEach(hero => {
    persuasionPower += hero.persuade();
  });
  return persuasionPower >= persuasionBarrier;
};
const sneakEncounter = (heroes, enemies) => {
  let sneakBarrier = 0;
  let sneakPower = 0;
  enemies.forEach(enemy => {
    sneakBarrier += enemy.barriers.sneak;
  });
  heroes.forEach(hero => {
    sneakPower += hero.sneak();
  });
  return sneakPower >= sneakBarrier;
};
const fightEncounter = (heroes, enemies, heroesFirst) => {
  let fighting = true;
  let totalHeroes = heroes.length;
  let totalEnemies = enemies.length;
  while (fighting) {
    if (heroesFirst) {
      totalEnemies -= teamAttack(heroes, enemies);
      totalHeroes -= teamAttack(enemies, heroes);
    } else {
      totalHeroes -= teamAttack(enemies, heroes);
      totalEnemies -= teamAttack(heroes, enemies);
    }
    if (totalHeroes === 0) {
      console.log(`All heroes are incapacitated.`);
      return false;
    }
    if (totalEnemies === 0) {
      console.log(`All enemies have been defeated.`);
      return true;
    }
  }
};
function teamAttack(attackers, defenders) {
  let totalIncapacitated = 0;
  let totalAvailableDefenders = 0;
  defenders.forEach(defender => {
    if (!defender.isIncapacitated) {
      totalAvailableDefenders++;
    }
  });
  attackers.forEach(attacker => {
    if (attacker.isIncapacitated || totalAvailableDefenders === 0) {
      return;
    }
    let target, randomTargetIndex;
    while (!target) {
      randomTargetIndex = Math.floor(Math.random() * defenders.length);
      if (!defenders[randomTargetIndex].isIncapacitated) {
        target = defenders[randomTargetIndex];
      }
    }
    if (attacker.attack() >= target.barriers.attack) {
      let damage = attacker.dealDamage();
      target.currentHealth -= damage;
      console.log(
        `${attacker.name} (${attacker.currentHealth}) hit ${target.name} (${
          target.currentHealth
        }) dealing ${damage} damage!`
      );
      if (target.currentHealth <= 0) {
        console.log(`${target.name} is incapacitated!`);
        target.isIncapacitated = true;
        totalIncapacitated++;
        totalAvailableDefenders--;
      }
    } else {
      console.log(`${attacker.name} missed!`);
    }
  });
  return totalIncapacitated;
}
const decisionMaker = answer => {
  let lowerAnswer = answer.toLowerCase();

  let result;

  switch (lowerAnswer) {
    case `attack`:
      result = fightEncounter(heroParty, enemies, true);
      break;
    case `sneak`:
      result = sneakEncounter(heroParty, enemies);
      break;
    case `persuade`:
      result = persuasionEncounter(heroParty, enemies);
      break;
    default:
      return decisionMaker(
        prompt(
          `Please make sure you spell the choice correctly. Attack, Sneak, or Persuade?`
        )
      );
      break;
  }
  return result;
};
