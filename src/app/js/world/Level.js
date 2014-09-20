define(function(require) {

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var LevelMap = require("js/world/LevelMap");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var RegionManager = require("js/world/RegionManager");
    var LevelSubMapper = require("js/world/LevelSubMapper");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");

    function Level(options) {
        options = options || {};
        this.parent = options.parent || null;
        this.registryId = null;
        this.diameter = options.diameter || 1;
        this.visibleDiameter = options.visibleDiameter || 1;
        this.levelMap = options.levelMap || null;
        this.regionManager = options.regionManager || null;
        this.focus = options.focus || new Coords(Math.floor(this.diameter / 2), Math.floor(this.diameter / 2));

        this.visibleMapManager = new VisibleMapManager(this.levelMap, this.visibleDiameter);
        this.activeZone = LevelSubMapper.getActiveZone(this.regionManager, this.focus);
        this.updateActiveRegions();
    }

    Level.prototype = {
        setRegistryId: function(registryId) {
            this.registryId = registryId;
        },
        initializeSelf: function(self, input) {
            self.init(this, this.focus, input);
            this.placeAgent(self, this.focus);
            this.registerAgent(self, this.focus);
        },
        placeAgent: function(agent, coords) {
            this.levelMap.placeAgent(agent, coords);
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
        moveSelf: function(self, position, posChange) {
            var tryPosition = position.plus(posChange);
            if (!this.levelMap.isImpenetrable(tryPosition)) {
                this.levelMap.moveAgent(self, position, tryPosition);
                self.setPosition(tryPosition);
                this.focus = tryPosition;
            }
        },
        moveAgent: function(agent, position, posChange) {
            var tryPosition = position.plus(posChange);
            if (!this.levelMap.isImpenetrable(tryPosition)) {
                this.levelMap.moveAgent(agent, position, tryPosition);
                agent.setPosition(tryPosition);

                if (!this.regionManager.inTheSameRegion(position, tryPosition)) {
                    this.getRegion(position).unregisterAgent(agent);
                    this.getRegion(tryPosition).registerAgent(agent);
                }
            }
        },
        registerAgent: function(agent, coords) {
            this.regionManager.registerAgent(agent, coords);
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
            this.activeZone = LevelSubMapper.getActiveZone(this.regionManager, this.focus);
            this.activeZone.forEach(function(region) {
                region.activate();
            });
        },
        shortestPath: function(startCoords, endCoords) {
            return AstarPathfinder.getShortestPath(startCoords, endCoords, this.levelMap);
        }
    };

    return Level;
});