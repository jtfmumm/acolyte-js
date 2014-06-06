define(function(require) {
    var Coords = require("js/utils/Coords");

    var Directions = {
        up: new Coords(0, -1),
        down: new Coords(0, 1),
        right: new Coords(1, 0),
        left: new Coords(-1, 0),
        upLeft: new Coords(-1, -1),
        downLeft: new Coords(-1, 1),
        upRight: new Coords(1, -1),
        downRight: new Coords(1, 1)
    } 

    return Directions;
});