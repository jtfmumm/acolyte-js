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
            return new WorldCoords(this.startingRegionCoords, startingLocalCoords, this.diameterPerRegion);
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
        getTileDescription: function(wCoords) {
            return this.getRegion(wCoords.getRegionMatrixCoords()).getTileDescription(wCoords.getLocalCoords());
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
        offsetPosition: function(wCoords, offset) {
            return wCoords.plus(offset);
        },
        inTheSameRegion: function(wCoords1, wCoords2) {
            return wCoords1.getRegionMatrixCoords().isEqual(wCoords2.getRegionMatrixCoords());
        }
    };

    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "blank"});
    }

    return RegionMatrix;
});