define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var terrainCodeTable = require("js/data/terrainCodeTable");
    var walledMap = require("js/maps/walledMap");

    function World(genAlg) {
        var genAlg = genAlg || generateWorldMap;
        this.worldMap = genAlg(50, 50, terrainCodeTable);
        this.addMapAt(10, 10, new Matrix(walledMap));
    }
    World.prototype.getTile = function(x, y) {
        return this.worldMap.getCell(x, y);
    }
    World.prototype.displayMap = function(display) {
        var codeMap = this.worldMap.map(getTileCode);
        display.renderMap(codeMap);
    }
    World.prototype.removeOccupant = function(x, y) {
        this.getTile(x, y).occupant = null;
    }
    World.prototype.addOccupant = function(x, y, newOccupant) {
        this.getTile(x, y).occupant = newOccupant;
    }
    World.prototype.changeTerrainTo = function(x, y, terrain) {
        this.getTile(x, y).terrain = terrain;
    }
    World.prototype.addMapAt = function(x, y, newMap) {
        var width = newMap.getWidth();
        var height = newMap.getHeight();
        var subWorld = this.worldMap.getSubMatrix(x, y, width, height);
        Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
    }

    function copyTerrain(oldTile, newTile) {
        console.log(oldTile, newTile);
        oldTile.terrain = newTile.terrain;
    }

    function copyTerrainByCode(oldTile, newTileCode) {
        console.log(oldTile, newTileCode);
        oldTile.terrain = terrainCodeTable[newTileCode];
    }

    function generateWorldMap(width, height) {
        //TODO Use matrix methods
        var initialMap = [];
        for (var i = 0; i < height; i++) {
            initialMap.push([]);
            for (var j = 0; j < width; j++) {
                initialMap[i].push(blankSpace());
            }
        }
        return new Matrix(initialMap);
    }

    function blankSpace() {
        return {
            terrain: {
                code: "plains"
            },
            occupant: null
        }
    }

    function getTerrainCode(tile) {
        return tile.terrain.code;
    }

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else 
            return tile.terrain.code;
    }

    return World;
});