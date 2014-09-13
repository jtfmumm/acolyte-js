define(function(require) {
    "use strict";

    var RegionMapGenerator = require("js/world/RegionMapGenerator");
    var RegionAgentsManager = require("js/agents/RegionAgentsManager");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var terrainCodeTable = require("js/data/terrainCodeTable");
    var TileDescriptions = require("js/data/TileDescriptions");

    function Region(options) {
        this.activeAgents = new RegionAgentsManager();
        this.diameter = options.diameter;
        this.type = options.type || "blank";
        this.startingPosition = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
        this.owner = options.owner || null;
        this.tiles = this.generateMap();
    }

    Region.prototype = {
        getMap: function() {
            return this.tiles;
        },
        //This should probably be part of a generator
        generateMap: function () {
            return RegionMapGenerator.initialize(this.diameter, this.type);
        },
        updateMap: function(matrix) {
            this.tiles = RegionMapGenerator.updateMapWithMatrix(this.tiles, matrix);
        },
        getTile: function(coords) {
            return this.tiles.getCell(coords.x, coords.y);
        },
        getStartingPosition: function() {
            return this.startingPosition;
        },
        removeOccupant: function(coords) {
            this.getTile(coords).occupant = null;
        },
        addOccupant: function(coords, newOccupant) {
            this.getTile(coords).occupant = newOccupant;
        },
        removeLandmark: function(coords) {
            this.getTile(coords).landmark = null;
        },
        addLandmark: function(coords, newLandmark) {
            this.getTile(coords).landmark = newLandmark;
        },
        isEqual: function(otherRegion) {
            return this === otherRegion;
        },
        _isImpenetrable: function(coords) {
            if (!this.isWithinBoundaries(coords)) return true;
            var tile = this.getTile(coords);

            if (tile.occupant) {
                return tile.occupant._isImpenetrable();
            } else {
                var occupantCode = getTileCode(tile);
                return terrainCodeTable[occupantCode].impenetrable;
            }
        },
        isWithinBoundaries: function(coords) {
            return this.tiles.isWithinMatrix(coords.x, coords.y);
        },
        getTileDescription: function(coords) {
            return TileDescriptions.describe(this.getTile(coords).occupant);
        },
        getSubMapByDirectionFrom: function(direction, coords) {
            return this.tiles.getSubMatrixByDirectionFrom(direction, coords.x, coords.y);
        },
        registerAgent: function(agent) {
            this.activeAgents.addAgent(agent);
        },
        unregisterAgent: function(agent) {
            this.activeAgents.removeAgent(agent);
        },
        activate: function() {
            this.activeAgents.activate();
        },
        deactivate: function() {
            this.activeAgents.deactivate();
        },
        addMapAt: function(coords, newMap) {
            var width = newMap.getWidth();
            var height = newMap.getHeight();
            var subWorld = this.worldMap.getSubMatrix(coords.x, coords.y, width, height);
            Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
        }
    };

    function copyTerrainByCode(oldTile, newTileCode) {
        oldTile.terrain = terrainCodeTable[newTileCode];
    }

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return Region;
});