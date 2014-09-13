define(function(require) {

    var Coords = require("js/utils/Coords");
    var Directions = require("js/movement/Directions");

    function WorldCoords(regionMatrixCoords, localCoords, diameterPerRegion) {
        this.regionMatrixCoords = regionMatrixCoords;
        this.localCoords = localCoords;
        this.diameterPerRegion = diameterPerRegion;
    }
    
    WorldCoords.prototype = {
        getRegionMatrixCoords: function() {
            return this.regionMatrixCoords;
        },
        getLocalCoords: function() {
            return this.localCoords;
        },
        toString: function() {
            return this.regionMatrixCoords.toString() + ":" + this.localCoords.toString();
        },
        plus: function(posChange) {
            var newAbsCoords = this.getAbsoluteCoords().plus(posChange);
            return this.convertAbsoluteToWorldCoords(newAbsCoords);
        },
        isEqual: function (wCoords) {
            return this.regionMatrixCoords.isEqual(wCoords.getRegionMatrixCoords()) &&
                this.localCoords.isEqual(wCoords.getLocalCoords());
        },
        getAbsoluteCoords: function() {
            var offset = new Coords(
                    this.regionMatrixCoords.x * this.diameterPerRegion,
                    this.regionMatrixCoords.y * this.diameterPerRegion
            );
            return this.localCoords.plus(offset);
        },
        convertAbsoluteToWorldCoords: function(absCoords) {
            var regionCoords = new Coords(
                Math.floor(absCoords.x / this.diameterPerRegion),
                Math.floor(absCoords.y / this.diameterPerRegion)
            );
            var localCoords = absCoords.minus(regionCoords.scaledBy(this.diameterPerRegion));
            return new WorldCoords(regionCoords, localCoords, this.diameterPerRegion);
        },
        getNeighbors: function() {
            var neighbors = [];

            for (var prop in Directions) {
                neighbors.push(this.plus(Directions[prop]));
            }
            return neighbors;
        },
        minDistanceTo: function(otherWCoords) {
            var absCoords = this.getAbsoluteCoords();
            var otherAbsCoords = otherWCoords.getAbsoluteCoords();
            return absCoords.minDistanceTo(otherAbsCoords);
        }
    };

    WorldCoords.worldCoordsFromString = function(str) {
        var worldCoordsRegExp = new RegExp(/^\d+,\d+:\d+,\d+$/);
        if (worldCoordsRegExp.test(str)) {
            var regionAndLocal = str.split(":");
            regionAndLocal[0] = Coords.coordsFromString(regionAndLocal[0]);
            regionAndLocal[1] = Coords.coordsFromString(regionAndLocal[1]);
            return new WorldCoords(regionAndLocal[0], regionAndLocal[1]);
        } else {
            throw new Error("WorldCoords.worldCoordsFromString(): Coordinate string must be of form '##,##:##,##'");
        }
    };

    return WorldCoords;
});