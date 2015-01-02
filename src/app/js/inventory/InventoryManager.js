define(function(require) {

    var Self = require("js/self/Self");
    var LevelManager = require("js/world/LevelManager");
    var Console = require("js/screens/Console");
    var Inventory = require("js/inventory/Inventory");
    var Dice = require("js/rules/Dice");

    var empty = {
        attackDice: new Dice(1, 4),
        getAttackDice: function() {
            return this.attackDice;
        },
        getArmorClassModifier: function() {
            return 0;
        }
    };


    var InventoryManager = {
        inventory: new Inventory(),
        weapon: empty,
        armor: empty,
        shield: empty,
        helmet: empty,

        selectNext: function() {
            this.inventory.selectNext();
        },
        selectPrevious: function() {
            this.inventory.selectPrevious();
        },

        addItem: function(item) {
            this.inventory.addItem(item);
        },
        dropItem: function(item) {
            var coords = Self.getPosition();
            if (LevelManager.canDropItemAt(coords)) {
                var dropped = this.inventory.takeItem(item);
                LevelManager.dropItem(dropped, coords);
            } else {
                Console.msg("Nowhere to drop it here!");
            }
        },
        equipSelected: function() {
            var selected = this.inventory.getSelected();
            if (selected) this.equipItem(selected);
        },
        equipItem: function(item) {
            if (item.isWeapon()) {
                this.equipWeapon(item);
            } else if (item.isArmor()) {
                this.equipArmor(item);
            } else {
                Console.msg("You can only equip weapons and armor!");
            }
        },
        equipWeapon: function(weapon) {
            this.weapon = weapon;
            Self.setAttackDice(weapon.getAttackDice());
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
            var armorClass = this.baseArmorClass +
                this.armor.getArmorClassModifier() +
                this.shield.getArmorClassModifier() +
                this.helmet.getArmorClassModifier();
            Self.setArmorClass(armorClass);
        },
        isHeld: function(item) {
            return _.isEqual(item, this.weapon) ||
                _.isEqual(item, this.armor) ||
                _.isEqual(item, this.shield) ||
                _.isEqual(item, this.helmet);
        },
        isOverLimitAfterItem: function(limit, item) {
            return (this.inventory.getWeight() + item.getWeight()) > limit;
        },
        addCoins: function(coins) {
            var invCoins = this.inventory.getCoins();

            for (var type in coins) {
                invCoins[type] = invCoins[type] + coins[type];
            }
        },
        canSpend: function(amount) {
            var coins = this.inventory.getCoins();
            return (coins.gp + (coins.sp / 10) + (coins.cp / 100)) > amount;
        },
        spend: function(amount) {
            if (!this.canSpend(amount)) throw new Error("InventoryManager: Cannot spend more than one has.");

            var invCoins = this.inventory.getCoins();
            while (amount > 0 && (invCoins.cp / 100) >= 1) {
                invCoins.cp -= 100;
                amount--;
            }
            while (amount > 0 && (invCoins.sp / 10) >= 1) {
                invCoins.sp -= 10;
                amount--;
            }
            while (amount > 0 && invCoins.gp > 0) {
                invCoins.gp--;
                amount--;
            }
        }
    };

    return InventoryManager;
});