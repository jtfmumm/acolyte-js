define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");
    var Region = require("js/world/Region");
    var Rand = require("js/utils/Rand");
    var VoidRegion = require("js/world/VoidRegion");

    //Takes width and height measured in regions, plus diameter per region
    function RegionMatrix(width, height, diameterPerRegion) {
        this.width = width;
        this.height = height;
        this.diameterPerRegion = diameterPerRegion;
        this.voidRegion = new VoidRegion({diameter: this.diameterPerRegion});
        Matrix.call(this);
        var i;
        for (i = 0; i < height; i++) {
            this.data.push(Array(width));
        }

        this.startingRegionCoords = new Coords(Rand.rollFromZero(this.width), Rand.rollFromZero(this.height));
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
        getStartingPosition: function() {
            var startingLocalCoords = this.getRegion(this.startingRegionCoords).getStartingPosition();
            return new WorldCoords(this.startingRegionCoords, startingLocalCoords);
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
            console.log("regionCoords", coords);
            if (this.isWithinBoundaries(coords.x, coords.y)) {
                return this.getCell(coords.x, coords.y);
            } else {
                return this.voidRegion;
            }
        },
        getRandomPosition: function() {
            return new WorldCoords(
                new Coords(Rand.rollFromZero(this.width), Rand.rollFromZero(this.height)),
                new Coords(Rand.rollFromZero(this.diameterPerRegion), Rand.rollFromZero(this.diameterPerRegion))
            );
        },
        convertAbsoluteToWorldCoords: function(absCoords) {
            var regionCoords = new Coords(
                Math.floor(absCoords.x / this.diameterPerRegion),
                Math.floor(absCoords.y / this.diameterPerRegion)
            );
            var localCoords = absCoords.minus(regionCoords.scaledBy(this.diameterPerRegion));
            return new WorldCoords(regionCoords, localCoords);
        },
        getAbsoluteCoords: function(wCoords) {
            var offset = new Coords(
                wCoords.getRegionMatrixCoords().x * this.diameterPerRegion,
                wCoords.getRegionMatrixCoords().y * this.diameterPerRegion
            );
            return wCoords.getLocalCoords().plus(offset);
        },
        offsetPosition: function(wCoords, offset) {
            var absCoords = this.getAbsoluteCoords(wCoords);
            var newAbsCoords = absCoords.plus(offset);
            return this.convertAbsoluteToWorldCoords(newAbsCoords);
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
            return this.getRegion(wCoords1.getRegionMatrixCoords()).isEqual(this.getRegion(wCoords2.getRegionMatrixCoords()));
        }
    });

    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "average"});
    }

    return RegionMatrix;
});