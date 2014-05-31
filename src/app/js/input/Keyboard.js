define(function(require) {
    var $ = require("jquery");
    var keyCodeTable = require("js/data/keyCodeTable");
    var Input = require("js/input/Input");

    var Keyboard = {
        connect: function() {
            $("body").off("keydown");
            $("body").keydown(Keyboard.addKey.bind(this));
        },
        disconnect: function() {
            $("body").off("keydown");
            $("body").keydown(Keyboard.unpauseOnP.bind(this))
        },
        addKey: function(e) {
            e.preventDefault();
            Input.addEvent(keyCodeTable[e.keyCode]);
        },
        unpauseOnP: function(e) {
            if (keyCodeTable[e.keyCode] == "PAUSE")
                Input.addEvent("PAUSE");
        },
        reset: function() {
            this.keyQueue = [];
        },
        nextKey: function() {
            return this.keyQueue.pop();
        }
    }

    return Keyboard;
});