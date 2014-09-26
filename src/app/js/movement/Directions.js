define(function(require) {
    var Coords = require("js/utils/Coords");

    function Directions() {
        this.north = new Coords(0, -1);
        this.south = new Coords(0, 1);
        this.east = new Coords(1, 0);
        this.west = new Coords(-1, 0);
        this.northWest = new Coords(-1, -1);
        this.southWest = new Coords(-1, 1);
        this.northEast = new Coords(1, -1);
        this.southEast = new Coords(1, 1);
        this.NORTH = this.north;
        this.SOUTH = this.south;
        this.EAST = this.east;
        this.WEST = this.west;
        this.NORTHWEST = this.northWest;
        this.NORTHEAST = this.northEast;
        this.SOUTHWEST = this.southWest;
        this.SOUTHEAST = this.southEast;
        this.UP = this.north;
        this.DOWN = this.south;
        this.LEFT = this.west;
        this.RIGHT = this.east;
    }

    Directions.prototype = {
        isDirection: function(x) {
            return Boolean(this[x]);
        }
    };

    return new Directions();
});