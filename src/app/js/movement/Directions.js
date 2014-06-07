define(function(require) {
    var Coords = require("js/utils/Coords");

    var Directions = {
        north: new Coords(0, -1),
        south: new Coords(0, 1),
        east: new Coords(1, 0),
        west: new Coords(-1, 0),
        northWest: new Coords(-1, -1),
        southWest: new Coords(-1, 1),
        northEast: new Coords(1, -1),
        southEast: new Coords(1, 1)
    } 

    return Directions;
});