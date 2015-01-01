define(function(require) {

    var Item = require("js/inventory/Item");
    var Dice = require("js/rules/Dice");

    function Weapon(stats) {
        Item.call(this, "weapon", stats);

        this.attackDice = new Dice(1, this.stats.dmg);
    }

    Weapon.prototype = {
        getAttackDice: function() {
            return this.attackDice;
        }
    };

    return Weapon;
});