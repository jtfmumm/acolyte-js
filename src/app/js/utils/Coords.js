define(function(require) {
    
    function Coords(x, y) {
        this.x = x;
        this.y = y;
    } 
    
    Coords.prototype = {
        plus: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = this.x + coords.x;
            var newY = this.y + coords.y;
            return new Coords(newX, newY);
        },
        minus: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = this.x - coords.x;
            var newY = this.y - coords.y;
            return new Coords(newX, newY);
        },
        scaledBy: function(scalar) {
            var newX = this.x * scalar;
            var newY = this.y * scalar;
            return new Coords(newX, newY);
        },
        isEqual: function(coords) {
            var coords = Coords.makeCoords(arguments);
            return (this.x === coords.x && this.y === coords.y);
        },
        positiveOffsetGiven: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = coords.x - this.x;
            if (newX < 0) newX = 0;
            var newY = coords.y - this.y;
            if (newY < 0) newY = 0;
            return new Coords(newX, newY);
        },
        negativeOffsetGiven: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = coords.x - this.x;
            if (newX > 0) newX = 0;
            var newY = coords.y - this.y;
            if (newY > 0) newY = 0;
            return new Coords(newX, newY);
        },
        offsetGiven: function(radius, width, height) {
            var topOffset = this.minus(radius, radius).positiveOffsetGiven(0, 0);
            var bottomOffset = this.plus(radius, radius).negativeOffsetGiven(width, height);
            return this.plus(topOffset).plus(bottomOffset);
        },
        directionTo: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var difference = this.minus(coords);
            if (difference.x > 0 && difference.y === 0) return "west";
            if (difference.x > 0 && difference.y < 0) return "southwest";
            if (difference.x > 0 && difference.y > 0) return "northwest";
            if (difference.x < 0 && difference.y === 0) return "east";
            if (difference.x < 0 && difference.y < 0) return "southeast";
            if (difference.x < 0 && difference.y > 0) return "northeast";
            if (difference.x === 0 && difference.y > 0) return "north";
            if (difference.x === 0 && difference.y < 0) return "south";
            return "none";
        },
        directionFrom: function(coords) {
            var coords = Coords.makeCoords(arguments);
            var difference = this.minus(coords);
            if (difference.x < 0 && difference.y === 0) return "west";
            if (difference.x < 0 && difference.y > 0) return "southwest";
            if (difference.x < 0 && difference.y < 0) return "northwest";
            if (difference.x > 0 && difference.y === 0) return "east";
            if (difference.x > 0 && difference.y > 0) return "southeast";
            if (difference.x > 0 && difference.y < 0) return "northeast";
            if (difference.x === 0 && difference.y < 0) return "north";
            if (difference.x === 0 && difference.y > 0) return "south";
            return "none";
        }
    };

    Coords.makeCoords = function(args) {
        if (args[0] instanceof Coords) 
            return args[0];
        else
            return new Coords(args[0], args[1]);
    };

    return Coords;
});