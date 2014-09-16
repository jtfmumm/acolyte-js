define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var RegionMatrixMapGenerator = require("js/world/RegionMatrixMapGenerator");

    //Takes width and height measured in regions, plus diameter per region
    function LevelMap(options) {
        this.diameter = options.diameter;
//        this.diameterPerRegion = options.diameterPerRegion;
        this.elevationGenAlg = options.elevationGenAlg || "diamondSquare";
        this.genAlg = options.genAlg || null;
        this.genMap = options.genMap || null;
        this.regionMatrixMapGenerator = new RegionMatrixMapGenerator({
            diameter: this.width,
            diameterPerRegion: this.diameterPerRegion,
            genMap: this.genMap
        });
//        this.voidRegion = new VoidRegion({diameter: this.diameterPerRegion});
//        this.regions = new Matrix().init(this.width, this.height);

        this.tileMap = null; //GENERATE THESE!

        this.initialize(this.elevationGenAlg);
        if (this.genAlg) {
            this.generateLandmarks(this.genAlg);
        }

        this.startingRegionCoords = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
    }

    LevelMap.prototype = {
        initialize: function(algorithm) {
            var elevations = this.regionMatrixMapGenerator.generate(algorithm);

            for (var y = 0; y < this.diameter; y++) {
                for (var x = 0; x < this.diameter; x++) {
//                    this.tileMap.setCell(x, y, generateTile());
                    this.getTile(x, y).updateElevation(elevations.getCell(x, y));
                }
            }
        },
        generateLandmarks: function(algorithm) {
            var landmarks = this.regionMatrixMapGenerator.generate(algorithm);

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.getTile(x, y).updateLandmark(landmarks.getCell(x, y));
                }
            }
        },
        getStartingPosition: function() {
            var startingLocalCoords = this.getRegion(this.startingRegionCoords).getStartingPosition();
            return startingLocalCoords;
        },
        placeAgent: function(agent, coords) {
            this.addOccupant(coords, agent);
            this.registerAgent(agent, coords);
        },
        registerAgent: function(agent, coords) {
//            this.getRegion(wCoords.getRegionMatrixCoords()).registerAgent(agent);
        },
        //MOVE LOGIC UP TO LEVEL
        moveAgent: function(agent, oldCoords, newCoords) {
//            if (!this.inTheSameRegion(oldWCoords, newWCoords)) {
//                this.getRegion(oldWCoords).unregisterAgent(agent);
//                this.getRegion(newWCoords).registerAgent(agent);
//            }
            this.removeOccupant(oldCoords);
            this.addOccupant(newCoords, agent);
        },
        addOccupant: function(coords, newOccupant) {
            this.getTile(coords).occupant = newOccupant;
        },
        removeOccupant: function(coords) {
            this.getTile(coords).occupant = null;
        },
        isWithinBoundaries: function(coords) {
            return this.tileMap.isWithinMatrix(coords.x, coords.y);
        },
        isImpenetrable: function(coords) {
            if (!this.isWithinBoundaries(coords)) return true;
            return this.getTile(coords).isImpenetrable();
        },
        getTileDescription: function(coords) {
            return this.getTile(coords).describe();
        },
        getDiameter: function() {
            return this.diameterPerRegion;
        },
        getTile: function(coords) {
            return this.getCell(coords.x, coords.y);
        },
        offsetPosition: function(coords, offset) {
            return coords.plus(offset);
        }
    };

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return LevelMap;
});