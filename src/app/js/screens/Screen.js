define(function(require) {

    var ScreenMethods = require("js/screens/ScreenMethods");
    var Self = require("js/self/Self");

    function Screen(display, levelManager) {
        this.currentMethod = ScreenMethods.MAP;
        this._display = display;
        this.levelManager = levelManager;
    }

    Screen.prototype = {
        switchTo: function(screen) {
            this.current = screen;
        },
        display: function() {
            this[this.currentMethod]();
        },
        renderMap: function() {
            var tileMap = this.levelManager.getVisibleMap();
            this._display.renderMap(tileMap);
        }
    };

    return Screen;
});