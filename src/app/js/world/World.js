define(function(require) {
    "use strict"

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var terrainCodeTable = require("js/data/terrainCodeTable");
    var walledMap = require("js/maps/walledMap");
    var RegionMatrix = require("js/world/RegionMatrix");

    function World(genAlg, focus, parent) {
        this.parent = parent || null;
        this.focus = focus || new Coords(1, 1);

        this.activeRadius = 35;
        this.activeZone = new Matrix();
        this.visibleRadius = 25;
        this.visibleZone = new Matrix();

        this.horizontalRegions = 5;
        this.verticalRegions = 5;
        this.width = this.horizontalRegions * this.getVisibleDiameter();
        this.height = this.verticalRegions * this.getVisibleDiameter();

        var genAlg = genAlg || generateWorldMap;
        this.regionMap = new RegionMatrix(this.horizontalRegions, this.verticalRegions, this.getVisibleDiameter);
        this.regionMap.initialize();
        //TODO: Copy regions over to world map

        //Replace world map generation?
        this.worldMap = genAlg(this.width, this.height, terrainCodeTable);
        this.addMapAt(new Coords(20, 20), new Matrix(walledMap));

        this.activeZone = this.getActiveZone();
        this.visibleZone = this.getVisibleZone();
    }
    
    World.prototype = {
        getVisibleDiameter: function () {
            return this.visibleRadius * 2 + 1;
        },
        getTile: function (position) {
            return this.worldMap.getCell(position.x, position.y);
        },
        removeOccupant: function (position) {
            this.getTile(position).occupant = null;
        },
        addOccupant: function (position, newOccupant) {
            this.getTile(position).occupant = newOccupant;
        },
        isImpenetrable: function (position) {
            if (!this.isWithinBoundaries(position)) return true;
            var tile = this.getTile(position);

            if (tile.occupant) {
                return tile.occupant.isImpenetrable();
            } else {
                var occupantCode = getTileCode(tile);
                return terrainCodeTable[occupantCode].impenetrable;
            }
        },
        isWithinBoundaries: function (position) {
            return (position.x >= 0 && position.y >= 0 && position.x < this.width && position.y < this.height);
        },
        withinBoundaries: function (position) {
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
        getActiveZone: function () {
            var offsetPosition = this.focus.offsetGiven(this.activeRadius, this.width, this.height);
            return this.getSurroundings(this.activeRadius, offsetPosition);
        },
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
        addMapAt: function (position, newMap) {
            var width = newMap.getWidth();
            var height = newMap.getHeight();
            var subWorld = this.worldMap.getSubMatrix(position.x, position.y, width, height);
            Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
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