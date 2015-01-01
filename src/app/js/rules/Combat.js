define(function(require) {

    var Console = require("js/screens/Console");

    var Combat = {
        attack: function(attacker, defender) {
            if (attacker.rollToHit(defender.getArmorClass())) {
                var damage = attacker.rollToDamage();
                defender.loseHP(damage);
                Console.msg(attacker.describe() + " hits " + defender.describe() + " for " + damage + " damage!");
            } else {
                Console.msg(attacker.describe() + " misses!");
            }
        }
    };

    return Combat;
});