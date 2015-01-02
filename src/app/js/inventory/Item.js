define(function(require) {

    function Item(stats, type) {
        this.stats = stats;
        this.type = type || "item";
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
        }
    };

    return Item;
});