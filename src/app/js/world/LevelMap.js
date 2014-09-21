define(function(require) {
    "use strict";

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var Tile = require("js/world/Tile");
    var Rand = require("js/utils/Rand");
    var LevelMapGenerator = require("js/world/LevelMapGenerator");

    //Takes width and height measured in regions, plus diameter per region
    function LevelMap(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion || null;
        this.parentFocus = options.parentFocus || null;
        this.levelMapAlgorithms = options.levelMapAlgorithms;

        this.voidTerrain = options.voidTerrain || "void";
        var returnPointFlag = this.voidTerrain === "void" ? true : false;
        this.voidTile = new Tile({terrain: this.voidTerrain, returnPoint: returnPointFlag});
        this.tileMap = new Matrix().init(this.diameter, this.diameter, generateTile);

        this.levelMapGenerator = new LevelMapGenerator({
            diameter: this.diameter,
            diameterPerRegion: this.diameterPerRegion,
            levelMapAlgorithms: this.levelMapAlgorithms
        });
        this.initialize();

        this.startingCoords = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
    }

    LevelMap.prototype = {
        initialize: function() {
            var levelMapProperties = this.levelMapGenerator.generate(this.levelMapAlgorithm);

            for (var valueType in levelMapProperties) {
                this.updateFrom(levelMapProperties[valueType]);
            }
        },
        updateFrom: function(values) {
            for (var y = 0; y < this.diameter; y++) {
                for (var x = 0; x < this.diameter; x++) {
                    this.getTile(new Coords(x, y)).updateFromProperties(values.getCell(x, y));
                }
            }
        },
        getStartingPosition: function() {
            return this.startingCoords;
        },
        placeAgent: function(agent, coords) {
            this.addOccupant(coords, agent);
        },
        moveAgent: function(agent, oldCoords, newCoords) {
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
            return this.getTile(coords).isImpenetrable();
        },
        getTileDescription: function(coords) {
            return this.getTile(coords).describe();
        },
        getTile: function(coords) {
            if (this.isWithinBoundaries(coords)) {
                return this.tileMap.getCell(coords.x, coords.y);
            } else {
                return this.voidTile;
            }
        },
        hasSubLevelAt: function(coords) {
            return this.getTile(coords).hasLevel();
        },
        isReturnPoint: function(coords) {
            return this.getTile(coords).isReturnPoint();
        }
    };

    function generateTile() {
        return new Tile();
    }

    return LevelMap;
});