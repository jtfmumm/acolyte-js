define(function(require) {
    "use strict"

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var LevelMap = require("js/world/LevelMap");
    var RegionManager = require("js/world/RegionManager");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var WorldSubMapper = require("js/world/WorldSubMapper");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");

    function World(options) {
        this.parent = options.parent || null;
        this.elevationGenAlg = options.elevationGenAlg || null;
        this.genAlg = options.genAlg || null;
        this.genMap = options.genMap || null;

        this.visibleRadius = options.visibleRadius || 25;
        this.visibleZone = null;

        this.horizontalRegions = options.horizontalRegions || 5;
        this.verticalRegions = options.verticalRegions || 5;
        this.width = this.horizontalRegions * this.getVisibleDiameter();
        this.height = this.verticalRegions * this.getVisibleDiameter();

        this.diameterPerRegion = options.diameterPerRegion || 65; //Must be a power of 2 + 1 for algorithms

        this.regionMatrix = new RegionMatrix({
            horizontalRegions: this.horizontalRegions,
            verticalRegions: this.verticalRegions,
            diameterPerRegion: this.diameterPerRegion,
            elevationGenAlg: this.elevationGenAlg,
            genAlg: this.genAlg,
            genMap: this.genMap
        });

        this.levelMap = new LevelMap();
        this.regionMap = new RegionMap();

        this.focus = options.focus || new Coords(10, 10);
        this.activeZone = WorldSubMapper.getActiveZone(this.regionMatrix, this.focus);

        //Temporary
        this.updateActiveRegions();

        this.visibleMapManager = new VisibleMapManager(this.regionMatrix);
    }
    
    World.prototype = {
        initializeSelf: function(self, input) {
            self.init(this, this.focus, input);
            this.placeAgent(self, this.focus);
        },
        placeAgent: function(agent, coords) {
            this.levelMap.placeAgent(agent, coords);
        },
        getVisibleDiameter: function() {
            return this.visibleRadius * 2 + 1;
        },
        display: function(display) {
            this.visibleMapManager.display(display, this.focus);
        },
        addOccupant: function(coords, occupant) {
            this.levelMap.addOccupant(coords, occupant);
        },
        removeOccupant: function(coords) {
            this.levelMap.removeOccupant(coords);
        },

        //REFACTOR TO BRING UP LOGIC
        moveSelf: function(self, position, posChange) {
            var tryPosition = this.regionMatrix.offsetPosition(position, posChange);
            if (!this.regionMatrix.isImpenetrable(tryPosition)) {
                this.regionMatrix.moveAgent(self, position, tryPosition);
                self.setPosition(tryPosition);
                this.focus = tryPosition;
            }
        },
        //SAME
        moveAgent: function(agent, position, posChange) {
            var tryPosition = this.regionMatrix.offsetPosition(position, posChange);
            if (!this.regionMatrix.isImpenetrable(tryPosition)) {
                this.regionMatrix.moveAgent(agent, position, tryPosition);
                agent.setPosition(tryPosition);
            }
        },
        examineTile: function(coords) {
            return this.levelMap.getTileDescription(coords);
        },
        isImpenetrable: function(coords) {
            return this.levelMap.isImpenetrable(coords);
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
        endGame: function() {
            this.parent.endGame();
        },
        shortestPath: function(startCoords, endCoords) {
            return AstarPathfinder.getShortestPath(startCoords, endCoords, this.regionMatrix);
        }
    };

    return World;
});