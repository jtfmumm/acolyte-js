define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var LevelSubMapper = require("js/world/LevelSubMapper");
    var VoidTile = require("js/world/VoidTile");

    var lightEdgeTile = new VoidTile("light-edge");
    var shadowEdgeTile = new VoidTile("shadow-edge");

    function VisibleMapManager(levelMap, visibleDiameter) {
        this.displayDiameter = 51;
        this.baseVisibleDiameter = visibleDiameter;
        this.visibleDiameter = this.baseVisibleDiameter;
        this.levelMap = levelMap;
        this.displayMap = new Matrix();
        this.visionEdgeTile = shadowEdgeTile;
    }

    VisibleMapManager.prototype = {
        display: function(display, focus) {
            this.updateMap(focus);
            display.renderMap(this.displayMap);
        },
        getDisplayMap: function(focus) {
            this.updateMap(focus);
            return this.displayMap;
        },
        updateMap: function(focus) {
            this.displayMap = LevelSubMapper.getLitSubMap(this.levelMap, focus, this.displayDiameter, this.visibleDiameter);
            if (this.displayDiameter > this.visibleDiameter) {
                this.displayMap.setInternalBorder(this.visionEdgeTile, this.visibleDiameter);
            }
        },
        castLight: function(lightDiameter) {
            if (lightDiameter > this.visibleDiameter) {
                this.visibleDiameter = lightDiameter;
            }
            this.visionEdgeTile = lightEdgeTile;
        },
        extinguishLight: function() {
            this.visibleDiameter = this.baseVisibleDiameter;
            this.visionEdgeTile = shadowEdgeTile;
        },
        updateVisibleDiameter: function(newDiameter) {
            this.visibleDiameter = newDiameter;
        }
    };

    return VisibleMapManager;
});