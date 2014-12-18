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
        toString: function() {
            return this.x + "," + this.y;
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
        },
        getNeighbors: function() {
            var neighbors = [];

            for (var prop in this.directions) {
                neighbors.push(this.plus(this.directions[prop]));
            }
            return neighbors;
        },
        getCardinalNeighbors: function() {
            var neighbors = [];
            var cardinalDirections = [this.directions.north, this.directions.east, this.directions.south, this.directions.west];

            for (var direction in cardinalDirections) {
                neighbors.push(this.plus(direction));
            }
            return neighbors;
        },
        getNeighborsByRadius: function(radius) {
            var neighbors = [];

            for (var d = 1; d <= radius; d++) {
                var nextSquare = this.getSquareList(this.minus(d, d), this.plus(d, d));
                neighbors.concat(nextSquare);
            }

            return neighbors;
        },
        minDistanceTo: function(otherCoords) {
            var coordsDifference = this.minus(otherCoords);
            return Math.max(Math.abs(coordsDifference.x), Math.abs(coordsDifference.y));
        },
        manhattanDistanceTo: function(otherCoords) {
            var coordsDifference = this.minus(otherCoords);
            return Math.abs(coordsDifference.x) + Math.abs(coordsDifference.y);
        },
        getSquareList: function(topLeftCoords, bottomRightCoords) {
            var list = [];
            var minX = topLeftCoords.x,
                minY = topLeftCoords.y,
                maxX = bottomRightCoords.x,
                maxY = bottomRightCoords.y;
            var i;

            //Horizontal top
            for (i = minX; i < maxX; i++) {
                list.push(new Coords(i, minY));
            }
            //Vertical right
            for (i = minY; i < maxY; i++) {
                list.push(new Coords(maxX, i));
            }
            //Horizontal bottom
            for (i = maxX; i > minX; i--) {
                list.push(new Coords(i, maxY));
            }
            //Vertical left
            for (i = maxY; i > minY; i--) {
                list.push(new Coords(minX, i));
            }
        }
    };

    Coords.directions = {
        north: new Coords(0, -1),
        south: new Coords(0, 1),
        east: new Coords(1, 0),
        west: new Coords(-1, 0),
        northWest: new Coords(-1, -1),
        southWest: new Coords(-1, 1),
        northEast: new Coords(1, -1),
        southEast: new Coords(1, 1)
    };

    Coords.coordsFromString = function(str) {
        if (/^\d+,\d+$/.test(str)) {
            var xy = str.split(",");
            return new Coords(xy[0], xy[1]);
        } else {
            throw new Error("Coords.coordsFromString(): Coordinate string must be of form '##,##'");
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