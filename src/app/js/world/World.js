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

        this.regionMatrix = new RegionMatrix(this.horizontalRegions, this.verticalRegions, this.getVisibleDiameter);
        this.regionMatrix.initialize();
        //TODO: Copy regions over to world map

        this.visibleMapManager = new VisibleMapManager(this.regionMatrix);
    }
    
    World.prototype = {
        getVisibleDiameter: function () {
            return this.visibleRadius * 2 + 1;
        },
        display: function(display) {
            this.visibleMapManager.display(display);
        },
        addOccupant: function(wCoords, occupant) {
            this.regionMatrix.addOccupant(wCoords, occupant);
        },
        removeOccupant: function(wCoords) {
            this.regionMatrix.removeOccupant(wCoords);
        },
        isImpenetrable: function(wCoords) {
            return this.regionMatrix.isImpenetrable(wCoords);
        }
    };

    return World;
});