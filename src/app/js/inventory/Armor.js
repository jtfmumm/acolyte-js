define(function(require) {

    var Item = require("js/inventory/Item");
    var Dice = require("js/rules/Dice");

    function Armor(stats) {
        Item.call(this, stats, "armor");

        this.armorClassModifier = this.stats.ac;
        this.armorType = this.stats.armorType;
    }

    Armor.prototype = {
        getArmorClassModifier: function() {
            return this.armorClassModifier;
        },
        isBodyArmor: function() {
            return this.armorType === "armor";
        },
        isShield: function() {
            return this.armorType === "shield";
        },
        isHelmet: function() {
            return this.armorType === "helmet";
        }
    };

    return Armor;
});