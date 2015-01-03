define(function(require) {

    var Self = require("js/self/Self");
    var LevelManager = require("js/world/LevelManager");
    var Console = require("js/screens/Console");
    var Inventory = require("js/inventory/Inventory");
    var ItemDisplayData = require("js/inventory/ItemDisplayData");
    var Dice = require("js/rules/Dice");
    var Item = require("js/inventory/Item");
    var Weapon = require("js/inventory/Weapon");
    var Armor = require("js/inventory/Armor");
    var equipment = require("js/data/equipment");

    var empty = {
        attackDice: new Dice(1, 4),
        getAttackDice: function() {
            return this.attackDice;
        },
        getArmorClassModifier: function() {
            return 0;
        }
    };


    function InventoryManager() {
        this.inventory = new Inventory(new Item(equipment.items.book), new Weapon(equipment.weapons.shortsword), new Weapon(equipment.weapons.longsword), new Armor(equipment.armor.plateMail));
        this.weapon = empty;
        this.armor = empty;
        this.shield = empty;
        this.helmet = empty;
        this.baseArmorClass = 10;
    }

    InventoryManager.prototype = {
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
            if (this.isHeld(item)) {
                Console.msg("You're holding that!");
                return;
            }

            var coords = Self.getPosition();
            if (LevelManager.canDropItemAt(coords)) {
                var dropped = this.inventory.takeItem(item);
                LevelManager.dropItem(dropped, coords);
            } else {
                Console.msg("Nowhere to drop it here!");
            }
        },
        toggleEquipSelected: function() {
            var selectedItem = this.inventory.getSelectedItem();
            if (selectedItem) this.toggleEquipItem(selectedItem);
        },
        toggleEquipItem: function(item) {
            if (item.isWeapon()) {
                this.toggleEquipWeapon(item);
            } else if (item.isArmor()) {
                this.toggleEquipArmor(item);
            } else {
                Console.msg("You can only equip weapons and armor!");
            }
        },
        toggleEquipWeapon: function(weapon) {
            if (this.weapon === weapon) {
                this.weapon = empty;
                Self.setAttackDice(empty.getAttackDice());
            } else {
                this.weapon = weapon;
                Self.setAttackDice(weapon.getAttackDice());
            }
        },
        toggleEquipArmor: function(armor) {
            if (armor.isBodyArmor()) {
                this.toggleEquipBodyArmor(armor);
            } else if (armor.isShield()) {
                this.toggleEquipShield(armor);
            } else if (armor.isHelmet()) {
                this.toggleEquipHelmet(armor);
            }
        },
        toggleEquipBodyArmor: function(armor) {
            if (this.armor === armor) {
                this.armor = empty;
            } else {
                this.armor = armor;
            }
            this.recalculateArmorClass();
        },
        toggleEquipShield: function(shield) {
            if (this.shield === shield) {
                this.shield = empty;
            } else {
                this.shield = shield;
            }
            this.recalculateArmorClass();
        },
        toggleEquipHelmet: function(helmet) {
            if (this.helmet === helmet) {
                this.helmet = empty;
            } else {
                this.helmet = helmet;
            }
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
        },
        getDisplayData: function() {
            var items = this.inventory.getItems();
            var displayData = items.map(function(item) {
               return new ItemDisplayData(item.getName());
            });
            var weaponIdx = items.indexOf(this.weapon);
            var armorIndices = [items.indexOf(this.armor), items.indexOf(this.shield), items.indexOf(this.helmet)];
            if (weaponIdx !== -1) displayData[weaponIdx].setEquipType("W");
            armorIndices.forEach(function(idx) {
                if (idx !== -1) displayData[idx].setEquipType("A");
            });
            if (displayData.length) displayData[this.inventory.getSelectedIndex()].toggleSelect();
            return displayData;
        }
    };

    return InventoryManager;
});