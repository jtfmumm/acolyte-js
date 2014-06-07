define(function(require) {
    "use strict"
    var Coords = require("js/utils/Coords");

    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var terrainCodeTable = require("js/data/terrainCodeTable");
    var walledMap = require("js/maps/walledMap");


    function World(genAlg, focus, parent) {
        this.parent = parent || null;
        this.focus = focus || new Coords(1, 1);
        this.width = 100;
        this.height = 100;
        this.activeRadius = 35;
        this.activeZone = new Matrix();
        this.visibleRadius = 25;
        this.visibleZone = new Matrix();

        var genAlg = genAlg || generateWorldMap;
        this.worldMap = genAlg(this.width, this.height, terrainCodeTable);
        this.addMapAt(new Coords(20, 20), new Matrix(walledMap));
        this.activeZone = this.getActiveZone();
        this.visibleZone = this.getVisibleZone();
    }
    World.prototype.getTile = function(position) {
        return this.worldMap.getCell(position.x, position.y);
    }
    World.prototype.removeOccupant = function(position) {
        this.getTile(position).occupant = null;
    }
    World.prototype.addOccupant = function(position, newOccupant) {
        this.getTile(position).occupant = newOccupant;
    }
    World.prototype.isImpenetrable = function(position) {
        if (!this.isWithinBoundaries(position)) return true;
        var tile = this.getTile(position);

        if (tile.occupant) {
            return tile.occupant.isImpenetrable();
        } else {
            var occupantCode = getTileCode(tile);
            return terrainCodeTable[occupantCode].impenetrable;
        }
    }
    World.prototype.isWithinBoundaries = function(position) {
        return (position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height);
    }
    World.prototype.withinBoundaries = function(position) {
        var x = position.x, y = position.y;
        var legitPos = new Coords(x, y);
        switch (true) {
            case x < 0:
                legitPos.x = 0;
            case x > this.width - 1:
                legitPos.x = this.width - 1;
            case y < 0:
                legitPos.y = 0;
            case y > this.height - 1:
                legitPos.y = this.height - 1;
        }
        return legitPos;
    }
    World.prototype.displayMap = function(display) {
        var codeMap = this.visibleZone.map(getTileCode);
        display.renderMap(codeMap);
    }
    World.prototype.getSurroundings = function(radius, position) {
        var position = position || this.focus;
        var top = this.withinBoundaries(position.minus(radius, radius))
        var bottom = this.withinBoundaries(position.plus(radius, radius));
        return this.worldMap.getSubMatrixByCoords(top.x, top.y, bottom.x, bottom.y);        
    }
    World.prototype.getVisibleZone = function() {
        var offsetPosition = this.focus.offsetGiven(this.visibleRadius, this.width, this.height);
        return this.getSurroundings(this.visibleRadius, offsetPosition);
    }
    World.prototype.getActiveZone = function() {
        var offsetPosition = this.focus.offsetGiven(this.activeRadius, this.width, this.height);
        return this.getSurroundings(this.activeRadius, offsetPosition);
    }
    World.prototype.updateFocus = function(newPos) {
        var oldPos = this.focus;
        this.focus = newPos;
        this.activeZone = this.getActiveZone();
        this.visibleZone = this.getVisibleZone();
        if (!oldPos.isEqual(newPos)) {
            var newActive = this.activeZone.getBoundaryByDirection(oldPos.directionTo(newPos));
        }
        this.updateActivations(newActive);
    }
    World.prototype.updateActivations = function(newActive, newInactive) {
        newActive.forEach(function(tile) {
            if (tile.occupant) tile.occupant.activate();
        });
    }
    World.prototype.changeTerrainTo = function(position, terrain) {
        this.getTile(position).terrain = terrain;
    }
    World.prototype.addMapAt = function(position, newMap) {
        var width = newMap.getWidth();
        var height = newMap.getHeight();
        var subWorld = this.worldMap.getSubMatrix(position.x, position.y, width, height);
        Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
    }
    World.prototype.initializeAgents = function() {
        this.activeZone.forEach(function(tile) {
            if (tile.occupant) {
                tile.occupant.activate();
            }
        });
    }

    function copyTerrain(oldTile, newTile) {
        oldTile.terrain = newTile.terrain;
    }

    function copyTerrainByCode(oldTile, newTileCode) {
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