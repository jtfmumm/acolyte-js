define(function(require) {

    var _ = require("lodash");
    var Dice = require("js/rules/Dice");

    var empty = {
        getAttackDice: function() {
            return fist.attackDice;
        },
        getArmorClassModifier: function() {
            return 0;
        }
    };

    var fist = {
        attackDice: new Dice(1, 4)
    };

    function Holding() {
        this.weapon = empty;
        this.armor = empty;
        this.shield = empty;
        this.helmet = empty;
        this.baseArmorClass = 10;
        this.armorClass = this.baseArmorClass;
        this.attackDice = this.weapon.getAttackDice();
    }

    Holding.prototype = {
        getAttackDice: function() {
            return this.attackDice;
        },
        getArmorClass: function() {
            return this.armorClass;
        },
        equipWeapon: function(weapon) {
            this.weapon = weapon;
            this.attackDice = weapon.getAttackDice();
        },
        equipArmor: function(armor) {
            if (armor.isBodyArmor()) {
                this.equipBodyArmor(armor);
            } else if (armor.isShield()) {
                this.equipShield(armor);
            } else if (armor.isHelmet()) {
                this.equipHelmet(armor);
            }
        },
        equipBodyArmor: function(armor) {
            this.armor = armor;
            this.recalculateArmorClass();
        },
        equipShield: function(shield) {
            this.shield = shield;
            this.recalculateArmorClass();
        },
        equipHelmet: function(helmet) {
            this.helmet = helmet;
            this.recalculateArmorClass();
        },
        unequipAll: function() {
            this.weapon = empty;
            this.armor = empty;
            this.shield = empty;
            this.helmet = empty;
        },
        recalculateArmorClass: function() {
            this.armorClass = this.baseArmorClass +
                this.armor.getArmorClassModifier() +
                this.shield.getArmorClassModifier() +
                this.helmet.getArmorClassModifier();
        },
        isHeld: function(item) {
            return _.isEqual(item, this.weapon) ||
                _.isEqual(item, this.armor) ||
                _.isEqual(item, this.shield) ||
                _.isEqual(item, this.helmet);
        }
    };


    return Holding;
});