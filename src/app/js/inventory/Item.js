define(function(require) {

    function Item(stats, type) {
        this.stats = stats;
        this.type = type || "item";
        this.useType = "none";
    }

    Item.prototype = {
        getName: function() {
            return this.stats.name;
        },
        getWeight: function() {
            return this.stats.weight;
        },
        getCost: function() {
            return this.stats.cost;
        },
        getUseType: function() {
            return this.useType;
        },
        isWeapon: function() {
            return this.type === "weapon";
        },
        isArmor: function() {
            return this.type === "armor";
        }
    };

    return Item;
});