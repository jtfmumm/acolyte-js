define(function(require) {
    var config = require("js/data/config");

    var Self = {
        position: {x: 25, y: 25},

        init: function(world) {
            this.position = world.selfPosition;
            world.addOccupant(this.position.x, this.position.y, this);
        },
        move: function(posChange, world) {
            var newPos = {
                x: this.position.x + posChange.x,
                y: this.position.y + posChange.y
            };
            this.moveTo(newPos, world);
        },
        moveTo: function(newPos, world) {
            if (!withinBoundaries(newPos.x, newPos.y)) return void 0;
            world.removeOccupant(this.position.x, this.position.y);
            world.addOccupant(newPos.x, newPos.y, this);
            this.position.x = newPos.x;
            this.position.y = newPos.y;
        },
        getCode: function() {
            return "self";
        }
    }

    function withinBoundaries(x, y) {
        return (x >= 0 && y >= 0 && x < config.WORLD_WIDTH && y < config.WORLD_HEIGHT);
    }

    return Self;
})