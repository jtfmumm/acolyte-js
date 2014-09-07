define(function(require) {

    var TileDescriptions = {
        describe: function(occupant) {
            if (occupant) {
                return "You see a " + occupant.getName() + ".";
            } else {
                return "There is nothing there.";
            }
        }
    };

    return TileDescriptions;
});