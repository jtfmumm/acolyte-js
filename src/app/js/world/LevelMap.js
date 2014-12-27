define(function(require) {
    "use strict";

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var Tile = require("js/world/Tile");
    var VoidTile = require("js/world/VoidTile");
    var Rand = require("js/utils/Rand");
    var LevelMapGenerator = require("js/world/LevelMapGenerator");

    //Takes width and height measured in regions, plus diameter per region
    function LevelMap(options) {
        this.diameter = options.diameter;
        this.diameterPerRegion = options.diameterPerRegion || null;
        this.parentFocus = options.parentFocus || null;
        this.levelMapAlgorithms = options.levelMapAlgorithms;
        this.focus = options.focus;

        this.voidType = options.voidType;
        this.voidTile = new VoidTile(this.voidType);
        this.tileMap = new Matrix().init(this.diameter, this.diameter, generateTile);

        this.levelMapGenerator = new LevelMapGenerator({
            diameter: this.diameter,
            diameterPerRegion: this.diameterPerRegion,
            levelMapAlgorithms: this.levelMapAlgorithms,
            focus: this.focus
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
        placeCursor: function(coords) {
            this.getTile(coords).toggleHighlighted();
        },
        removeCursor: function(coords) {
            this.getTile(coords).toggleHighlighted();
        },
        moveCursor: function(cursor, oldCoords, newCoords) {
            this.getTile(oldCoords).toggleHighlighted();
            this.getTile(newCoords).toggleHighlighted();
        },
        addOccupant: function(coords, newOccupant) {
            this.getTile(coords).occupant = newOccupant;
        },
        removeOccupant: function(coords) {
            this.getTile(coords).occupant = null;
        },
        hasOccupantAt: function(coords) {
            return this.getTile(coords).hasOccupant();
        },
        talkTo: function(coords) {
            return this.getTile(coords).getOccupant();
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
        findEmptyTileCoords: function() {
            var coords = null;
            var tried = {};
            while(!coords) {
                var next = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
                var key = next.toString();
                if (!tried[key]) {
                    tried[next.toString()] = true;
                    if (this.getTile(next.x, next.y).isEmpty()) coords = next;
                }
            }
            return coords;
        },
        hasSubLevelAt: function(coords) {
            return this.getTile(coords).hasLevel();
        },
        isReturnPoint: function(coords) {
            return this.getTile(coords).isReturnPoint();
        },
        ///For dev editing of map
        placeLevel: function(coords, levelSeed) {
            this.getTile(coords).updateLandmark(levelSeed);
        }
    };

    function generateTile() {
        return new Tile();
    }

    return LevelMap;
});