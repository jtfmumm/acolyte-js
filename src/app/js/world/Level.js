define(function(require) {

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var LevelMap = require("js/world/LevelMap");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var RegionManager = require("js/world/RegionManager");
    var LevelSubMapper = require("js/world/LevelSubMapper");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");
    var Self = require("js/self/Self");

    function Level(options) {
        options = options || {};
        this.parent = options.parent || null;
        this.parentCoords = options.parentCoords || null;
        this.registryId = null;
        this.diameter = options.diameter || 1;
        this.visibleDiameter = options.visibleDiameter || 1;
        this.levelMap = options.levelMap || null;
        this.regionManager = options.regionManager || null;
        this.startingCoords = options.focus || new Coords(Math.floor(this.diameter / 2), Math.floor(this.diameter / 2));
        this.focus = this.startingCoords;

        options.landmarksAlg(this);

        this.visibleMapManager = new VisibleMapManager(this.levelMap, this.visibleDiameter);
        this.activeZone = LevelSubMapper.getActiveZone(this.regionManager, this.focus);
    }

    Level.prototype = {
        //Eventually remove this method
        placeInitialShrine: function() {
            this.levelMap.getTile(this.focus).updateLandmark("shrine");
        },
        setRegistryId: function(registryId) {
            this.registryId = registryId;
        },
        enter: function(coords) {
            var newFocus = coords ? coords : this.focus;
            this.focus = newFocus;
            this.placeAgent(Self, newFocus);
            Self.enterLevel(this, newFocus);
            this.updateActiveRegions();
            this.registerAgent(Self, newFocus);
        },
        exit: function() {
            this.deactivate();
            this.unregisterAgent(Self, this.focus);
            this.removeOccupant(this.focus);
            this.focus = this.startingCoords;
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
                if (this.levelMap.hasSubLevelAt(tryPosition)) {
                    var tile = this.levelMap.getTile(tryPosition);
                    this.enterSubLevel(tile.getLevel(), tile);
                }
            } else if (this.levelMap.isReturnPoint(tryPosition)) {
                this.enterParentLevel();
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
        unregisterAgent: function(agent, coords) {
            this.regionManager.unregisterAgent(agent, coords);
        },
        findEmptyTileCoords: function() {
            return this.levelMap.findEmptyTileCoords();
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
        deactivate: function() {
            this.activeZone.forEach(function(region) {
                region.deactivate();
            });
        },
        shortestPath: function(startCoords, endCoords) {
            return AstarPathfinder.getShortestPath(startCoords, endCoords, this.levelMap);
        },
        enterSubLevel: function(sublevel, tile) {
            this.parent.enterSubLevel(sublevel, tile, this.focus);
        },
        enterParentLevel: function(parent, parentCoords) {
            var parent = parent || this.parent;
            var parentCoords = parentCoords || this.parentCoords;
            this.parent.enterParentLevel(parent, parentCoords);
        }
    };

    return Level;
});