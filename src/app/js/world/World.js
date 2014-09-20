define(function(require) {
    "use strict"

    var _ = require("lodash");
    var Level = require("js/world/Level");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var LevelMap = require("js/world/LevelMap");
    var RegionManager = require("js/world/RegionManager");
    var VisibleMapManager = require("js/world/VisibleMapManager");
    var LevelSubMapper = require("js/world/LevelSubMapper");


    function World(options) {
        options = options || {};
        this.diameterPerRegion = 65;
        Level.call(this, _.extend(options, {
                diameter: 325,
                visibleDiameter: 51,
                levelMap: new LevelMap({
                    diameter: 325,
                    diameterPerRegion: this.diameterPerRegion
                })
            })
        );

        this.regionManager = new RegionManager({
            regionRowCount: this.diameter / this.diameterPerRegion,
            diameterPerRegion: this.diameterPerRegion
        });
        this.activeZone = LevelSubMapper.getActiveZone(this.regionManager, this.focus);

        this.initialize();
    }
    
    World.prototype = _.extend(Object.create(Level.prototype), {
        initialize: function() {
            //Temporary
            this.updateActiveRegions();
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
        //Override
        moveSelf: function(self, position, posChange) {
            var tryPosition = position.plus(posChange);
            if (!this.levelMap.isImpenetrable(tryPosition)) {
                this.levelMap.moveAgent(self, position, tryPosition);
                self.setPosition(tryPosition);
                this.focus = tryPosition;
            }
        },
        //Override
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
        //Override
        registerAgent: function(agent, coords) {
            this.regionManager.registerAgent(agent, coords);
        }
    });

    return World;
});