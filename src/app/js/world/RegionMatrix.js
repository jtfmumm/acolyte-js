define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");
    var Region = require("js/world/Region");
    var Rand = require("js/utils/Rand");
    var VoidRegion = require("js/world/VoidRegion");
    var RegionMatrixMapGenerator = require("js/world/RegionMatrixMapGenerator");

    //Takes width and height measured in regions, plus diameter per region
    function RegionMatrix(width, height, diameterPerRegion) {
        this.width = width;
        this.height = height;
        this.diameterPerRegion = diameterPerRegion;
        this.voidRegion = new VoidRegion({diameter: this.diameterPerRegion});
        this.map = generateRegionsFrom(new RegionMatrixMapGenerator(this.width, this.diameterPerRegion).diamondSquare());

        this.startingRegionCoords = new Coords(Rand.rollFromZero(this.width), Rand.rollFromZero(this.height));
    }

    RegionMatrix.prototype = {
        initialize: function () {
            var i, j;
            var terrainHeights = [];
            var heightStats = generateHeightStats(this.width);
            for (i = 0; i < this.height; i++) {
                for (j = 0; j < this.width; j++) {
                    this.map.data[i][j] = generateRegion(this.diameterPerRegion);
                }
            }
        },
        getStartingPosition: function() {
            var startingLocalCoords = this.getRegion(this.startingRegionCoords).getStartingPosition();
            return new WorldCoords(this.startingRegionCoords, startingLocalCoords);
        },
        placeAgent: function(agent, wCoords) {
            this.addOccupant(wCoords, agent);
            this.registerAgent(agent, wCoords);
        },
        registerAgent: function(agent, wCoords) {
            this.getRegion(wCoords.getRegionMatrixCoords()).registerAgent(agent);
        },
        moveAgent: function(agent, oldWCoords, newWCoords) {
            if (!this.inTheSameRegion(oldWCoords, newWCoords)) {
                this.getRegion(oldWCoords).unregisterAgent(agent);
                this.getRegion(newWCoords).registerAgent(agent);
            }
            this.removeOccupant(oldWCoords);
            this.addOccupant(newWCoords, agent);
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
        isWithinBoundaries: function(regionCoords) {
            return this.map.isWithinMatrix(regionCoords.x, regionCoords.y);
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
            if (this.isWithinBoundaries(coords)) {
                return this.map.getCell(coords.x, coords.y);
            } else {
                window.v = this.voidRegion;
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
            return wCoords1.getRegionMatrixCoords().isEqual(wCoords2.getRegionMatrixCoords());
        }
    };

    function generateRegionsFrom(matrix) {
        console.log(matrix);
        for (var i = 0; i < matrix.getWidth(); i++) {
            for (var j = 0; j < matrix.getWidth(); j++) {
                var nextRegion = new Region({diameter: matrix.getWidth(), matrix: matrix.getCell(i, j)});
                matrix.setCell(i, j, nextRegion);
            }
        }
        console.log(matrix.getCell(0, 0));
        return matrix;
    }

    function generateHeightStats(diameter) {
        //width/height need to be power of 2 + 1 (5, 9, 17, etc.)
        var heightStats = new Matrix();
        var nw, ne, sw, se;
        for (var i = 0; i < diameter; i++) {
            heightStats.data.push(Array(diameter));
        }

        //Initialize corners, center, and midpoints
        var midPoint = findMidPoint(diameter);
        nw = heightStats.setCell(0, 0, Rand.rollFromZero(8));
        ne = heightStats.setCell(0, diameter - 1, Rand.rollFromZero(8));
        sw = heightStats.setCell(diameter - 1, 0, Rand.rollFromZero(8));
        se = heightStats.setCell(diameter - 1, diameter - 1, Rand.rollFromZero(8));
        heightStats.setCell(midPoint, midPoint, ((nw + ne + sw + se) / 4));
        heightStats.setCell(0, midPoint, ((nw + sw) / 2));
        heightStats.setCell(diameter - 1, midPoint, ((ne + se) / 2));
        heightStats.setCell(midPoint, 0, ((nw + ne) / 2));
        heightStats.setCell(midPoint, diameter - 1, ((sw + se) / 2));

        specifyHeightPoints(heightStats, new Coords(0, 0), midPoint + 1);
        specifyHeightPoints(heightStats, new Coords(0, midPoint), midPoint + 1);
        specifyHeightPoints(heightStats, new Coords(midPoint, 0), midPoint + 1);
        specifyHeightPoints(heightStats, new Coords(midPoint, midPoint), midPoint + 1);

        console.log(heightStats);
        return heightStats;
    }

    function specifyHeightPoints(arr, nwCoords, diameter) {
        var midPoint = findMidPoint(diameter);
        var x = nwCoords.x;
        var y = nwCoords.y;
        var nw = arr.getCell(x, y);
        var ne = arr.getCell(x + diameter - 1, y);
        var sw = arr.getCell(x, y + diameter - 1);
        var se = arr.getCell(x + diameter - 1, y + diameter - 1);
        arr.setCell(x + midPoint, y + midPoint, ((nw + ne + sw + se) / 4));
        arr.setCell(x, y + midPoint, ((nw + sw) / 2));
        arr.setCell(x + diameter - 1, y + midPoint, ((ne + se) / 2));
        arr.setCell(x + midPoint, y, ((nw + ne) / 2));
        arr.setCell(x + midPoint, y + diameter - 1, ((sw + se) / 2));

        if (midPoint === 1) return;
        specifyHeightPoints(arr, new Coords(x, y), midPoint + 1);
        specifyHeightPoints(arr, new Coords(x, y + midPoint), midPoint + 1);
        specifyHeightPoints(arr, new Coords(x + midPoint, y), midPoint + 1);
        specifyHeightPoints(arr, new Coords(x + midPoint, y + midPoint), midPoint + 1);
    }

    function findMidPoint(diameter) {
        return Math.floor(diameter / 2);
    }

    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "average"});
    }

    return RegionMatrix;
});