define(function(require) {

    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var LevelMap = require("js/world/LevelMap");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");


    function Level(options) {
        options = options || {};
        this.parent = options.parent || null;
        this.registryId = null;

        this.diameter = options.diameter || null;
        this.visibleDiameter = options.visibleDiameter || null;
        this.levelMap = options.levelMap || new LevelMap({
            diameter: this.diameter
        });

        this.focus = options.focus || new Coords(10, 10);

        this.activeAgents = null;
        this.visibleMapManager = new VisibleMapManager(this.levelMap, this.visibleDiameter);
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
            }
        },
        registerAgent: function(agent, coords) {
            //coords is for region-based levels
            this.activeAgents.addAgent(agent);
        },
        examineTile: function(coords) {
            return this.levelMap.getTileDescription(coords);
        },
        isImpenetrable: function(coords) {
            return this.levelMap.isImpenetrable(coords);
        },
        shortestPath: function(startCoords, endCoords) {
            return AstarPathfinder.getShortestPath(startCoords, endCoords, this.levelMap);
        }
    };

    return Level;
});