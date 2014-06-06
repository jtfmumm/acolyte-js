define(function(require) {
    var Directions = require("js/movement/Directions");
    var Rand = require("js/utils/Rand");
    
    var cardinalDirections = [Directions.up, Directions.down, Directions.left, Directions.right];
    var ordinalDirections = [Directions.upLeft, Directions.downLeft, Directions.upRight, Directions.downRight];
    var allDirections = [Directions.up, Directions.down, Directions.left, Directions.right];

    var MovementAlgs = {
        drunk: function() {
            return Rand.pickItem(cardinalDirections);
        }
    }

    return MovementAlgs;
})