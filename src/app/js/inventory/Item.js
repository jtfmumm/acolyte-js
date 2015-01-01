define(function(require) {

    function Item(type, stats) {
        this.held = false;
        this.type = type;
        this.stats = stats;
    }

    Item.prototype = {
        isHeld: function() {
            return this.held;
        },
        getName: function() {
            return this.stats.name;
        },
        getWeight: function() {
            return this.stats.weight;
        },
        getCost: function() {
            return this.stats.cost;
        }
    };

    return Item;
});