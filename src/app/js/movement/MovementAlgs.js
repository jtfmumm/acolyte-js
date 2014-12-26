define(function(require) {
    "use strict";
    
    var Directions = require("js/movement/Directions");
    var Rand = require("js/utils/Rand");
    
    var cardinalDirections = [Directions.north, Directions.south, Directions.west, Directions.east];
    var ordinalDirections = [Directions.northWest, Directions.southWest, Directions.northEast, Directions.southEast];
    var allDirections = [Directions.north, Directions.south, Directions.west, Directions.east];

    var MovementAlgs = {
        drunk: function() {
            return Rand.pickItem(cardinalDirections);
        },
        biasedDrunk: function(direction) {
            var biasedCardinal = cardinalDirections.slice(0);
            biasedCardinal.push(direction);
            return Rand.pickItem(biasedCardinal);
        }
    };

    return MovementAlgs;
});