define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var Tile = require("js/world/Tile");
    var Rand = require("js/utils/Rand");
    var LevelMapGenerator = require("js/world/LevelMapGenerator");

    //Takes width and height measured in regions, plus diameter per region
    function LevelMap(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion || null;
        this.elevationGenAlg = options.elevationGenAlg || "diamondSquare";
        this.genAlg = options.genAlg || null;
        this.genMap = options.genMap || null;
        this.voidTerrain = options.voidTerrain || "void";
        this.levelMapGenerator = new LevelMapGenerator({
            diameter: this.diameter,
            diameterPerRegion: this.diameterPerRegion,
            genMap: this.genMap
        });

        this.voidTile = new Tile({terrain: this.voidTerrain});

        this.tileMap = new Matrix().init(this.diameter, this.diameter, generateTile);

        this.initialize(this.elevationGenAlg);
        if (this.genAlg) {
            this.generateLandmarks(this.genAlg);
        }

        this.startingCoords = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
    }

    LevelMap.prototype = {
        initialize: function(algorithm) {
            var elevations = this.levelMapGenerator.generate(algorithm);

            for (var y = 0; y < this.diameter; y++) {
                for (var x = 0; x < this.diameter; x++) {
                    elevations.getCell(x, y);
                    this.getTile(new Coords(x, y)).updateElevation(elevations.getCell(x, y));
                }
            }
        },
        generateLandmarks: function(algorithm) {
            var landmarks = this.levelMapGenerator.generate(algorithm);

            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.getTile(new Coords(x, y)).updateLandmark(landmarks.getCell(x, y));
                }
            }
        },
        getStartingPosition: function() {
            return this.startingCoords;
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
            if (this.isWithinBoundaries(coords)) {
                return this.tileMap.getCell(coords.x, coords.y);
            } else {
                return this.voidTile;
            }
        },
        offsetPosition: function(coords, offset) {
            return coords.plus(offset);
        }
    };

    function generateTile() {
        return new Tile();
    }

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return LevelMap;
});