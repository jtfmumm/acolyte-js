define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
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

        this.startingRegion = this.data[Rand.rollFromZero(this.height)][Rand.rollFromZero(this.width)];
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
        getRegion: function(coords) {
            return this.getCell(coords.x, coords.y);
        },
        placeAgent: function(agent) {
            this.startingRegion.initializeAgent(agent);
        },
        getNextRegionCoords: function(wCoords, regionChange) {
            var lastRegionCoords = wCoords.getRegionMatrixCoords();
            var nextRegionCoords = lastRegionCoords.plus(regionChange);
            if (this.isWithinBoundaries(nextRegionCoords)) {
                var nextRegion = this.getRegion(nextRegionCoords);
                var newLocalCoords = nextRegion.calculateEntranceCoords(wCoords, regionChange);
                return new wCoords(nextRegionCoords, newLocalCoords, this);
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
        }
    });

    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "average"});
    }

    return RegionMatrix;
});