define(function(require) {
    var _ = require("lodash");
    var $ = require("jquery");
    var keyCodeTable = require("js/data/keyCodeTable");
    var Input = require("js/input/Input");

    var Keyboard = function() {
        Input.call(this);
    };

    Keyboard.prototype = _.extend(Object.create(Input.prototype), {
        connect: function() {
            $("body").off("keydown");
            $("body").keydown(this.addKey.bind(this));
        },
        addKey: function(e) {
            e.preventDefault();
            this.addEvent(keyCodeTable[e.keyCode]);
        }
    });


    return new Keyboard();
});