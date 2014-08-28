define(function(require) {
    var $ = require("jquery");
    var keyCodeTable = require("js/data/keyCodeTable");
    var Input = require("js/input/Input");

    var Keyboard = function() {
        this.connect = function() {
            $("body").off("keydown");
            $("body").keydown(this.addKey.bind(this));
        },
        this.disconnect = function() {
            $("body").off("keydown");
            $("body").keydown(this.unpauseOnP.bind(this))
        },
        this.addKey = function(e) {
            e.preventDefault();
            this.addEvent(keyCodeTable[e.keyCode]);
        },
        this.unpauseOnP = function(e) {
            if (keyCodeTable[e.keyCode] == "PAUSE")
                this.addEvent("PAUSE");
        }
    };

    Keyboard.prototype = Object.create(Input.prototype);

    return new Keyboard();
});