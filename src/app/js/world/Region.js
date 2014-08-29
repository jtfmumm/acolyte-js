define(function(require) {
    "use strict";

    var regionMapGenerator = require("js/world/regionMapGenerator");
    var RegionAgentsManager = require("js/agents/RegionAgentsManager");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");
    var terrainCodeTable = require("js/data/terrainCodeTable");

    function Region(options) {
        this.activeAgents = new RegionAgentsManager();
        this.diameter = options.diameter;
        this.type = options.type;
        this.startingPosition = new Coords(Rand.rollFromZero(this.diameter), Rand.rollFromZero(this.diameter));
        this.owner = options.owner || null;
        this.map = this.generateMap();
    }

    Region.prototype = {
        getMap: function() {
            return this.map;
        },
        //This should probably be part of a generator
        generateMap: function () {
            return regionMapGenerator[this.type](this.diameter);
        },
        activateAgent: function(agent) {
            this.activeAgents.addAgent(agent);
        },
        getTile: function (coords) {
            return this.map.getCell(coords.x, coords.y);
        },
        removeOccupant: function (coords) {
            this.getTile(coords).occupant = null;
        },
        addOccupant: function (coords, newOccupant) {
            this.getTile(coords).occupant = newOccupant;
        },
        isEqual: function(otherRegion) {
            return this === otherRegion;
        },
        isImpenetrable: function (coords) {
            if (!this.isWithinBoundaries(coords)) return true;
            var tile = this.getTile(coords);

            if (tile.occupant) {
                return tile.occupant.isImpenetrable();
            } else {
                var occupantCode = getTileCode(tile);
                return terrainCodeTable[occupantCode].impenetrable;
            }
        },
        isWithinBoundaries: function (coords) {
            return this.map.isWithinBoundaries(coords.x, coords.y);
        },
        withinBoundaries: function (coords) {
            var x = coords.x, y = coords.y;
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
        regionChange: function(coords) {
            switch(true) {
                case coords.x < 0:
                    return new Coords(-1, 0);
                    break;
                case coords.y < 0:
                    return new Coords(0, 1);
                    break;
                case coords.x >= this.diameter:
                    return new Coords(1, 0);
                    break;
                case coords.y >= this.diameter:
                    return new Coords(0, 1);
                    break;
                default:
                    return new Coords(0, 0);
                    break;
            }
        },
        calculateEntranceCoords: function(wCoords, regionChange) {
            var direction = new Coords(0, 0).directionTo(regionChange);
            switch (true) {
                case direction === "north":
                    return new Coords(wCoords.getLocalCoords().x, this.diameter - 1);
                case direction === "south":
                    return new Coords(wCoords.getLocalCoords().x, 0);
                case direction === "west":
                    return new Coords(this.diameter - 1, wCoords.getLocalCoords().y);
                case direction === "east":
                    return new Coords(0, wCoords.getLocalCoords().y);
            }
        },
        getSubMapByDirectionFrom: function(direction, coords) {
            this.map.getSubMatrixByDirectionFrom(direction, coords.x, coords.y);
        },
        addMapAt: function (coords, newMap) {
            var width = newMap.getWidth();
            var height = newMap.getHeight();
            var subWorld = this.worldMap.getSubMatrix(coords.x, coords.y, width, height);
            Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
        }
    };

    function copyTerrainByCode(oldTile, newTileCode) {
        oldTile.terrain = terrainCodeTable[newTileCode];
    }

    return Region;
});