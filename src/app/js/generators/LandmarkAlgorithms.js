define(function(require) {

    var LandmarkAlgorithms = {
        world: function(level) {
            level.levelMap.getTile(level.focus).updateLandmark("shrine");
//            level.levelMap.addLandmark();
        },
        shrine: function(level) {

        }
    };

    return LandmarkAlgorithms;
});