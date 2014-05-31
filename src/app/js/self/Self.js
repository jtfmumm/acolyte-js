define(function(require) {
    var config = require("js/data/config");

    var Self = {
        xPosition: 25,
        yPosition: 25,

        init: function(world) {
            world.addOccupant(this.xPosition, this.yPosition, this);
        },
        move: function(xChange, yChange, world) {
            var newX = this.xPosition + xChange;
            var newY = this.yPosition + yChange;
            this.moveTo(newX, newY, world);
        },
        moveTo: function(newX, newY, world) {
            if (!withinBoundaries(newX, newY)) return void 0;
            world.removeOccupant(this.xPosition, this.yPosition);
            world.addOccupant(newX, newY, this);
            this.xPosition = newX;
            this.yPosition = newY;
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