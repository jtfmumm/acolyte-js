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
        this.regionMatrixMapGenerator = new RegionMatrixMapGenerator({
            diameter: this.width,
            diameterPerRegion: this.diameterPerRegion
        });
        this.voidRegion = new VoidRegion({diameter: this.diameterPerRegion});
        this.regions = new Matrix().init(this.width, this.height);//generateRegionsFrom(new RegionMatrixMapGenerator(this.width, this.diameterPerRegion).diamondSquare());
        this.initialize("diamondSquare");

        this.startingRegionCoords = new Coords(Rand.rollFromZero(this.width), Rand.rollFromZero(this.height));
    }

    RegionMatrix.prototype = {
        initialize: function(algorithm) {
            var elevations = this.regionMatrixMapGenerator.generate(algorithm);

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.regions.setCell(x, y, generateRegion(this.diameterPerRegion));
                    this.regions.getCell(x, y).updateMap(elevations.getCell(x, y));
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
            return this.regions.isWithinMatrix(regionCoords.x, regionCoords.y);
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
                return this.regions.getCell(coords.x, coords.y);
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



    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "blank"});
    }

    return RegionMatrix;
});