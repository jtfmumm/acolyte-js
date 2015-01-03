define(function(require) {

    var _ = require("lodash");
    var Item = require("js/inventory/Item");

    function LightSource(stats) {
        Item.call(this, stats, "light source");

        this.lightDiameter = stats.lightDiameter || 7;
        this.ticksRemaining = stats.duration || 10;
        this.name = stats.name || "Light Source";
        this.weight = stats.weight || 1;
        this.cost = stats.cost || 1;
        this.useType = "remove";
    }

    LightSource.prototype = _.extend(Object.create(Item.prototype), {
        update: function(holder) {
            if (--this.ticksRemaining > 0) {
                holder.castLight(this.lightDiameter);
            } else {
                holder.extinguishLight();
            }
        }
    });

    return LightSource;
});