define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var LevelSubMapper = require("js/world/LevelSubMapper");
    var VoidTile = require("js/world/VoidTile");

    var lightEdgeTile = new VoidTile("light-edge");

    function VisibleMapManager(levelMap, visibleDiameter) {
        this.displayDiameter = 51;
        this.visibleDiameter = visibleDiameter;
        this.levelMap = levelMap;
        this.displayMap = new Matrix();
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
                this.displayMap.setInternalBorder(lightEdgeTile, this.visibleDiameter);
            }
        },
        castLight: function(lightDiameter) {
            if (lightDiameter > this.visibleDiameter) {
                this.visibleDiameter = lightDiameter;
            }
        },
        updateVisibleDiameter: function(newDiameter) {
            this.visibleDiameter = newDiameter;
        }
    };

    return VisibleMapManager;
});