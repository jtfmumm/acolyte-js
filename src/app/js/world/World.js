define(function(require) {
    "use strict"

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var terrainCodeTable = require("js/data/terrainCodeTable");
    var walledMap = require("js/maps/walledMap");
    var RegionMatrix = require("js/world/RegionMatrix");

    function World(parent) {
        this.parent = parent || null;
        this.focus = focus || new Coords(1, 1);

        this.visibleRadius = 25;
        this.visibleZone = new Matrix();

        this.horizontalRegions = 5;
        this.verticalRegions = 5;
        this.width = this.horizontalRegions * this.getVisibleDiameter();
        this.height = this.verticalRegions * this.getVisibleDiameter();

        this.regionMap = new RegionMatrix(this.horizontalRegions, this.verticalRegions, this.getVisibleDiameter);
        this.regionMap.initialize();
        //TODO: Copy regions over to world map

        this.visibleZone = this.getVisibleZone();
    }
    
    World.prototype = {
        placeAgent: function(agent) {
            this.regionMap.placeAgent(agent);
        },
        getVisibleDiameter: function () {
            return this.visibleRadius * 2 + 1;
        },
        display: function(display) {
            this.visibleMapManager.display(display);
        },
        constructVisibleMap: function() {

        },
        displayMap: function (display) {
            var codeMap = this.visibleZone.map(getTileCode);
            display.renderMap(codeMap);
        },
        getSurroundings: function (radius, position) {
            var position = position || this.focus;
            var top = this.withinBoundaries(position.minus(radius, radius))
            var bottom = this.withinBoundaries(position.plus(radius, radius));
            return this.worldMap.getSubMatrixByCoords(top.x, top.y, bottom.x, bottom.y);
        },
        getVisibleZone: function () {
            var offsetPosition = this.focus.offsetGiven(this.visibleRadius, this.width, this.height);
            return this.getSurroundings(this.visibleRadius, offsetPosition);
        },
//        getActiveZone: function () {
//            var offsetPosition = this.focus.offsetGiven(this.activeRadius, this.width, this.height);
//            return this.getSurroundings(this.activeRadius, offsetPosition);
//        },
        updateFocus: function (newPos) {
            var oldPos = this.focus;
            this.focus = newPos;
            this.activeZone = this.getActiveZone();
            this.visibleZone = this.getVisibleZone();
            if (!oldPos.isEqual(newPos)) {
                var newActive = this.activeZone.getBoundaryByDirection(oldPos.directionTo(newPos));
            }
            this.updateActivations(newActive);
        },
        updateActivations: function (newActive, newInactive) {
            newActive.forEach(function (tile) {
                if (tile.occupant) tile.occupant.activate();
            });
        },
        initializeAgents: function () {
            this.activeZone.forEach(function (tile) {
                if (tile.occupant) {
                    tile.occupant.activate();
                }
            });
        }
    };

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