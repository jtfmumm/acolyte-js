define(function(require) {

    var ScreenMethods = require("js/screens/ScreenMethods");
    var Self = require("js/self/Self");

    function Screen(display, levelManager, inventoryManager) {
        this.currentMethod = ScreenMethods.MAP;
        this._display = display;
        this.levelManager = levelManager;
        this.inventoryManager = inventoryManager;
    }

    Screen.prototype = {
        switchTo: function(screen) {
            this.currentMethod = screen;
        },
        display: function() {
            this[this.currentMethod]();
        },
        renderMap: function() {
            var tileMap = this.levelManager.getDisplayMap();
            this._display.renderMap(tileMap);
        },
        renderInventory: function() {
            this._display.renderInventory(this.inventoryManager.getDisplayData());
        }
    };

    return Screen;
});