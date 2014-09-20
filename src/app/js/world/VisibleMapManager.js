define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldSubMapper = require("js/world/WorldSubMapper");

    function VisibleMapManager(levelMap, visibleDiameter) {
        this.visibleDiameter = visibleDiameter;
        this.levelMap = levelMap;
        this.visibleMap = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display, focus) {
            this.updateMap(focus);
            display.renderMap(this.visibleMap);
        },
        updateMap: function(focus) {
            this.visibleMap = WorldSubMapper.getSubMap(this.levelMap, focus, Math.floor(this.visibleDiameter / 2));
        }
    };

    return VisibleMapManager;
});