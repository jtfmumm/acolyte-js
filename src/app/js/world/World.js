define(function(require) {
    "use strict"

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var walledMap = require("js/maps/walledMap");
    var RegionMatrix = require("js/world/RegionMatrix");
    var VisibleMapManager = require("js/world/VisibleMapManager");

    function World(parent) {
        this.parent = parent || null;

        this.visibleRadius = 25;
        this.visibleZone = new Matrix();

        this.horizontalRegions = 5;
        this.verticalRegions = 5;
        this.width = this.horizontalRegions * this.getVisibleDiameter();
        this.height = this.verticalRegions * this.getVisibleDiameter();

        this.regionMap = new RegionMatrix(this.horizontalRegions, this.verticalRegions, this.getVisibleDiameter);
        this.regionMap.initialize();
        //TODO: Copy regions over to world map

        this.visibleMapManager = new VisibleMapManager(this.regionMap);
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
        }
//        getSurroundings: function (radius, position) {
//            var position = position || this.focus;
//            var top = this.withinBoundaries(position.minus(radius, radius))
//            var bottom = this.withinBoundaries(position.plus(radius, radius));
//            return this.worldMap.getSubMatrixByCoords(top.x, top.y, bottom.x, bottom.y);
//        },
//        getVisibleZone: function () {
//            var offsetPosition = this.focus.offsetGiven(this.visibleRadius, this.width, this.height);
//            return this.getSurroundings(this.visibleRadius, offsetPosition);
//        }
    };

    function copyTerrain(oldTile, newTile) {
        oldTile.terrain = newTile.terrain;
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


    return World;
});