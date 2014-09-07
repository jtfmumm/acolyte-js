define(function(require) {

    var Coords = require("js/utils/Coords");

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
        }
    };

    return WorldCoords;
});