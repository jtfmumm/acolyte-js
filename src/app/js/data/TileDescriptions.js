define(function(require) {

    var TileDescriptions = {
        describe: function(describeable) {
            if (describeable && describeable.describe) {
                return "You see " + describeable.describe();
            } else if (describeable) {
                return "You see " + describeable.description;
            } else {
                return "There is nothing there.";
            }
        }
    };

    return TileDescriptions;
});