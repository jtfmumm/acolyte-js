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
        move: function(posChange) {
            this.level.moveCursor(this.position, posChange);
        },
        setPosition: function(position) {
            this.position = position;
        },
        reset: function() {
            this.level.removeCursor(this.position);
            this.level.placeCursor(Self.getPosition());
            this.position = Self.getPosition();
        }

    };

    return Cursor;
});