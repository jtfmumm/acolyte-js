define(function(require) {

    var Self = require("js/self/Self");

    var Cursor = {
        position: null,
        level: null,

        init: function(self) {
            this.level = self.getLevel();
            this.position = self.getPosition();
            this.level.placeCursor(this.position);
        },
        enterLevel: function(level, coords) {
            this.level = level;
            this.position = coords;
        },
        move: function(position, posChange) {
            this.level.moveCursor(position, posChange);
        },
        setPosition: function(position) {
            this.position = position;
        },
        reset: function() {
            this.position = Self.getPosition();
        }

    };

    return Cursor;
});