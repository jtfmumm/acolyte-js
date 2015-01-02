define(function(require) {

    function Inventory() {
        this.items = Array.prototype.slice.call(arguments);
        this.gp = 0;
        this.sp = 0;
        this.cp = 0;
        this.weight = 0;
    }

    Inventory.prototype = {
        addItem: function(item) {
            this.items.push(item);
            this.weight += item.getWeight();
        },
        removeItem: function(item) {
            var idx = this.items.indexOf(item);
            this.items.splice(idx, 1);
        },
        isOverLimitAfterItem: function(limit, item) {
            return (this.weight + item.getWeight()) > limit;
        },
        canSpend: function(amount) {
            return (this.gp + (this.sp / 10) + (this.cp / 100)) > amount;
        },
        spend: function(amount) {
            if (!this.canSpend(amount)) throw new Error("Inventory: Cannot spend more than one has.");

            while (amount > 0 && (this.cp / 100) >= 1) {
                this.cp -= 100;
                amount--;
            }
            while (amount > 0 && (this.sp / 10) >= 1) {
                this.sp -= 10;
                amount--;
            }
            while (amount > 0 && this.gp > 0) {
                this.gp--;
                amount--;
            }
        }
    };

    return Inventory;
});