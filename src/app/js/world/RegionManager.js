define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Region = require("js/world/Region");

    //Takes width and height measured in regions, plus diameter per region
    function RegionManager(options) {
        this.regionRowCount = options.regionRowCount;
        this.diameterPerRegion = options.diameterPerRegion;
        this.regions = new Matrix().init(this.regionRowCount, this.regionRowCount);

        for (var y = 0; y < this.regions.getHeight(); y++) {
            for (var x = 0; x < this.regions.getWidth(); x++) {
                this.regions.setCell(x, y, new Region());
            }
        }
    }

    RegionManager.prototype = {
        placeAgent: function(agent, coords) {
            this.addOccupant(coords, agent);
            this.registerAgent(agent, coords);
        },
        registerAgent: function(agent, coords) {
            this.getRegion(wCoords.getRegionMatrixCoords()).registerAgent(agent);
        },
        getRegion: function(coords) {
            var originX = this.originCoordFrom(coords.x);
            var originY = this.originCoordFrom(coords.y);
            return this.regions.getCell(originX, originY);
        },
        originCoordFrom: function(coord) {
            return Math.floor(coord / this.diameterPerRegion) * this.diameterPerRegion;
        },
        inTheSameRegion: function(coords1, coords2) {
            return this.getRegion(coords1) === this.getRegion(coords2);
        }
    };

    return RegionManager;
});