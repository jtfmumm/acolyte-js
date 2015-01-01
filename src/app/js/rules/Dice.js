define(function(require) {

    var Rand = require("js/utils/Rand");

    function Dice(count, value) {
        this.count = count;
        this.value = value;
    }

    Dice.prototype = {
        roll: function() {
            return Rand.rolls(this.count, this.value);
        }
    };


    return Dice;
});