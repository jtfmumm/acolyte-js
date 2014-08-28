define(function(require) {
    "use strict";

    var regionMapGenerator = require("js/world/regionMapGenerator");
    var RegionAgentsManager = require("js/agents/RegionAgentsManager");
    var Coords = require("js/utils/Coords");
    var Rand = require("js/utils/Rand");

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
        generateMap: function () {
            return regionMapGenerator[this.type](this.diameter);
        },
        initializeAgent: function(agent, position) {
            var position = position || this.startingPosition;
            this.addOccupant(position, agent);
            agent.setRegion(this);
        },
        activateAgent: function(agent) {
            this.activeAgents.addAgent(agent);
        },
        getTile: function (position) {
            return this.map.getCell(position.x, position.y);
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
            return this.map.isWithinBoundaries(position.x, position.y);
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
        addMapAt: function (position, newMap) {
            var width = newMap.getWidth();
            var height = newMap.getHeight();
            var subWorld = this.worldMap.getSubMatrix(position.x, position.y, width, height);
            Matrix.copyObjectsWith(subWorld, newMap, copyTerrainByCode);
        },
        hasCrossedEdge: function(position) {
            return (position.x < 0 || position.y < 0 || position.x >= this.diameter || position.y >= this.diameter);
        },
        regionChange: function(position) {
            switch(true) {
                case position.x < 0:
                    return new Coords(-1, 0);
                    break;
                case position.y < 0:
                    return new Coords(0, 1);
                    break;
                case position.x >= this.diameter:
                    return new Coords(1, 0);
                    break;
                case position.y >= this.diameter:
                    return new Coords(0, 1);
                    break;
                default:
                    return new Coords(0, 0);
                    break;
            }
        },
        getType: function () {
            return this.type;
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
        }
    };

    return Region;
});