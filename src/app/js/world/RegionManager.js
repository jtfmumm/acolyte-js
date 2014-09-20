define(function(require) {
    "use strict";

    _ = require("lodash");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var Region = require("js/world/Region");

    //Takes width and height measured in regions, plus diameter per region
    function RegionManager(options) {
        this.diameterPerRegion = options.diameterPerRegion;
        this.diameterInRegions = options.diameter / this.diameterPerRegion;
        this.regions = new Matrix().init(this.diameterInRegions, this.diameterInRegions);

        for (var y = 0; y < this.regions.getHeight(); y++) {
            for (var x = 0; x < this.regions.getWidth(); x++) {
                this.regions.setCell(x, y, new Region());
            }
        }
    }

    RegionManager.prototype = {
        getDiameterInRegions: function() {
            return this.diameterInRegions;
        },
        placeAgent: function(agent, coords) {
            this.addOccupant(coords, agent);
            this.registerAgent(agent, coords);
        },
        registerAgent: function(agent, coords) {
            this.getRegion(coords).registerAgent(agent);
        },
        unregisterAgent: function(agent, coords) {
            this.getRegion(coords).unregisterAgent(agent);
        },
        getRegion: function(coords) {
            var originX = this.regionCoordFrom(coords.x);
            var originY = this.regionCoordFrom(coords.y);
            return this.regions.getCell(originX, originY);
        },
        getRegionByRegionCoords: function(regionCoords) {
            return this.regions.getCell(regionCoords.x, regionCoords.y);
        },
        regionCoordFrom: function(coord) {
            return Math.floor(coord / this.diameterPerRegion);
        },
        regionCoordsFrom: function(coords) {
            return new Coords(this.regionCoordFrom(coords.x), this.regionCoordFrom(coords.y));
        },
        inTheSameRegion: function(coords1, coords2) {
            return this.getRegion(coords1) === this.getRegion(coords2);
        }
    };

    return RegionManager;
});