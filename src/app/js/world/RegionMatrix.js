define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");
    var Region = require("js/world/Region");
    var Rand = require("js/utils/Rand");

    //Takes width and height measured in regions, plus diameter per region
    function RegionMatrix(width, height, diameterPerRegion) {
        this.width = width;
        this.height = height;
        this.diameterPerRegion = diameterPerRegion;
        Matrix.call(this);
        var i;
        for (i = 0; i < height; i++) {
            this.data.push(Array(width));
        }

        this.startingRegionCoords = new Coords(Rand.rollFromZero(this.weight), Rand.rollFromZero(this.height));
    }

    RegionMatrix.prototype = _.extend(Object.create(Matrix.prototype), {
        initialize: function () {
            var i, j;
            for (i = 0; i < this.height; i++) {
                for (j = 0; j < this.width; j++) {
                    this.data[i][j] = generateRegion(this.diameterPerRegion);
                }
            }
        },
        addOccupant: function(wCoords, occupant) {
            var region = this.getRegion(wCoords.getRegionMatrixCoords());
            var coords = wCoords.getLocalCoords();
            region.addOccupant(coords, occupant);
        },
        removeOccupant: function(wCoords) {
            var region = this.getRegion(wCoords.getRegionMatrixCoords());
            var coords = wCoords.getLocalCoords();
            region.removeOccupant(coords);
        },
        isImpenetrable: function(wCoords) {
            var region = this.getRegion(wCoords.getRegionMatrixCoords());
            var coords = wCoords.getLocalCoords();
            return region.isImpenetrable(coords);
        },
        getDiameter: function() {
            return this.diameterPerRegion;
        },
        getStartingRegionCoords: function() {
            return this.startingRegionCoords;
        },
        getRegion: function(coords) {
            return this.getCell(coords.x, coords.y);
        },
        getNextRegionCoords: function(wCoords, regionChange) {
            var lastRegionCoords = wCoords.getRegionMatrixCoords();
            var nextRegionCoords = lastRegionCoords.plus(regionChange);
            if (this.isWithinBoundaries(nextRegionCoords)) {
                var nextRegion = this.getRegion(nextRegionCoords);
                var newLocalCoords = nextRegion.calculateEntranceCoords(wCoords, regionChange);
                return new WorldCoords(nextRegionCoords, newLocalCoords);
            } else {
                return wCoords;
            }
        },
        getUpdatedWorldCoords: function(wCoords, posChange) {
            if (this.isStillInRegionAfter(wCoords, posChange)) {
                return wCoords.plusLocal(posChange);
            } else {
                var currentRegion = this.getRegion(wCoords.getRegionMatrixCoords());
                var currentLocalCoords = wCoords.getLocalCoords();
                var regionChange = currentRegion.regionChange(currentLocalCoords, posChange);
                return this.getNextRegionCoords(wCoords, regionChange);
            }
        },
        isStillInRegionAfter: function(wCoords, posChange) {
            var newLocalCoords = wCoords.getLocalCoords().plus(posChange);
            return this.getRegion(wCoords.getRegionMatrixCoords())
                .isWithinBoundaries(newLocalCoords);
        },
        inTheSameRegion: function(wCoords1, wCoords2) {
            return this.getRegion(wCoords1).isEqual(this.getRegion(wCoords2));
        }
    });

    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "average"});
    }

    return RegionMatrix;
});