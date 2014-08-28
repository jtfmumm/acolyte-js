define(function(require) {

    var WorldCoords = require("js/utils/WorldCoords");
    var Matrix = require("js/utils/Matrix");

    function VisibleMapManager() {
        this.NWCorner = new WorldCoords();
        this.NECorner = new WorldCoords();
        this.SWCorner = new WorldCoords();
        this.SECorner = new WorldCoords();
        this.map = new Matrix();
    };

    VisibleMapManager.prototype = {
        display: function(display) {
            this.updateMap();
            display.renderMap(this.map);
        },
        updateMap: function() {

        }
    };

    return VisibleMapManager;
});