define(function(require) {
    "use strict"

    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");
    var Matrix = require("js/utils/Matrix");
    var walledMap = require("js/maps/walledMap");
    var RegionMatrix = require("js/world/RegionMatrix");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var WorldSubMapper = require("js/world/WorldSubMapper");

    function World(parent, focus) {
        this.parent = parent || null;

        this.visibleRadius = 25;
        this.visibleZone = null;

        this.horizontalRegions = 5;
        this.verticalRegions = 5;
        this.width = this.horizontalRegions * this.getVisibleDiameter();
        this.height = this.verticalRegions * this.getVisibleDiameter();

        this.diameterPerRegion = 65; //Must be a power of 2 + 1 for algorithms

        this.regionMatrix = new RegionMatrix(this.horizontalRegions, this.verticalRegions, this.diameterPerRegion);
        //TODO: Copy regions over to world map

        this.focus = new WorldCoords(new Coords(0, 0), new Coords(10, 10), this.diameterPerRegion);//focus || this.regionMatrix.getRandomPosition();
        this.activeZone = WorldSubMapper.getActiveZone(this.regionMatrix, this.focus);

        //Temporary
        this.updateActiveRegions();

        this.visibleMapManager = new VisibleMapManager(this.regionMatrix);
    }
    
    World.prototype = {
        initializeSelf: function(self) {
            self.init(this, this.focus);
            this.placeAgent(self, this.focus);
        },
        placeAgent: function(agent, wCoords) {
            this.regionMatrix.placeAgent(agent, wCoords);
        },
        getVisibleDiameter: function() {
            return this.visibleRadius * 2 + 1;
        },
        display: function(display) {
            this.visibleMapManager.display(display, this.focus);
        },
        addOccupant: function(wCoords, occupant) {
            this.regionMatrix.addOccupant(wCoords, occupant);
        },
        removeOccupant: function(wCoords) {
            this.regionMatrix.removeOccupant(wCoords);
        },
        moveSelf: function(self, position, posChange) {
            var tryPosition = this.regionMatrix.offsetPosition(position, posChange);
            if (!this.regionMatrix.isImpenetrable(tryPosition)) {
                this.regionMatrix.moveAgent(self, position, tryPosition);
                self.setPosition(tryPosition);
                this.focus = tryPosition;
            }
        },
        moveAgent: function(agent, position, posChange) {
            var tryPosition = this.regionMatrix.offsetPosition(position, posChange);
            if (!this.regionMatrix.isImpenetrable(tryPosition)) {
                this.regionMatrix.moveAgent(agent, position, tryPosition);
                agent.setPosition(tryPosition);
            }
        },
        examineTile: function(wCoords) {
            return this.regionMatrix.getTileDescription(wCoords);
        },
        isImpenetrable: function(wCoords) {
            return this.regionMatrix.isImpenetrable(wCoords);
        },
        updateActiveRegions: function() {
            this.activeZone.forEach(function(region) {
                region.deactivate();
            });
            this.activeZone = WorldSubMapper.getActiveZone(this.regionMatrix, this.focus);
            this.activeZone.forEach(function(region) {
                region.activate();
            });
        },
        updateFocus: function(newPos) {
            this.focus = newPos;
        },
        endGame: function() {
            this.parent.endGame();
        }
    };

    return World;
});