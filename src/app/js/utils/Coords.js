define(function(require) {
    
    function Coords(x, y) {
        this.x = x;
        this.y = y;
    } 
    Coords.prototype.plus = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var newX = this.x + coords.x;
        var newY = this.y + coords.y;
        return new Coords(newX, newY);
    }    
    Coords.prototype.minus = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var newX = this.x - coords.x;
        var newY = this.y - coords.y;
        return new Coords(newX, newY);
    }
    Coords.prototype.isEqual = function(coords) {
        var coords = Coords.makeCoords(arguments);
        return (this.x === coords.x && this.y === coords.y);
    }
    Coords.prototype.positiveOffsetGiven = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var newX = coords.x - this.x;
        if (newX < 0) newX = 0;
        var newY = coords.y - this.y;
        if (newY < 0) newY = 0;
        return new Coords(newX, newY);
    }
    Coords.prototype.negativeOffsetGiven = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var newX = coords.x - this.x;
        if (newX > 0) newX = 0;
        var newY = coords.y - this.y;
        if (newY > 0) newY = 0;
        return new Coords(newX, newY);
    }
    Coords.prototype.offsetGiven = function(radius, width, height) {
        var topOffset = this.minus(radius, radius).positiveOffsetGiven(0, 0);
        var bottomOffset = this.plus(radius, radius).negativeOffsetGiven(width, height);
        return this.plus(topOffset).plus(bottomOffset);
    }
    Coords.prototype.directionTo = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var difference = this.minus(coords);
        if (difference.x > 0 && difference.y === 0) return "west";
        if (difference.x < 0 && difference.y === 0) return "east";
        if (difference.x === 0 && difference.y > 0) return "north";
        if (difference.x === 0 && difference.y < 0) return "south";
        return "none";
    }
    Coords.prototype.directionFrom = function(coords) {
        var coords = Coords.makeCoords(arguments);
        var difference = this.minus(coords);
        if (difference.x < 0 && difference.y === 0) return "west";
        if (difference.x > 0 && difference.y === 0) return "east";
        if (difference.x === 0 && difference.y < 0) return "north";
        if (difference.x === 0 && difference.y > 0) return "south";
        return "none";
    }

    Coords.makeCoords = function(args) {
        if (args[0] instanceof Coords) 
            return args[0];
        else
            return new Coords(args[0], args[1]);
    }

    return Coords;
});