define(function(require) {

    var _ = require("lodash");
    var Item = require("js/inventory/Item");
    var Dice = require("js/rules/Dice");

    function Weapon(stats) {
        Item.call(this, stats, "weapon");

        this.attackDice = new Dice(1, this.stats.dmg);
    }

    Weapon.prototype = _.extend(Object.create(Item.prototype), {
        getAttackDice: function() {
            return this.attackDice;
        }
    });

    return Weapon;
});