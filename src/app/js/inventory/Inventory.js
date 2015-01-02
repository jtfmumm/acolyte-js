define(function(require) {

    function Inventory() {
        this.items = Array.prototype.slice.call(arguments);
        this.coins = {
            gp: 0,
            sp: 0,
            cp: 0
        };
        this.weight = 0;
        this.selected = 0;
    }

    Inventory.prototype = {
        addItem: function(item) {
            this.items.push(item);
            this.weight += item.getWeight();
        },
        takeItem: function(item) {
            var idx = this.items.indexOf(item);
            if (this.selected >= idx) this.selectPrevious();
            return this.items.splice(idx, 1);
        },
        getItems: function() {
            return this.items;
        },
        getSelectedIndex: function() {
            return this.selected;
        },
        getSelectedItem: function() {
            if (!this.items.length) return null;

            return this.items[this.selected];
        },
        getWeight: function() {
            return this.weight;
        },
        getCoins: function() {
            return this.coins;
        },
        setCoins: function(coins) {
            this.coins = coins;
        },
        selectNext: function() {
            if (!this.items.length) {
                this.selected = 0;
                return;
            }
            var next = this.selected + 1;
            this.selected = next % this.items.length;
        },
        selectPrevious: function() {
            if (!this.items.length) {
                this.selected = 0;
                return;
            }
            var prev = this.items.length + (this.selected - 1);
            this.selected = prev % this.items.length;
        }
    };

    return Inventory;
});