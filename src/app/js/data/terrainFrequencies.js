define(function(require) {
    "use strict";

    var terrainFrequencies = {
        average: {
            wall: 1,
            palm: 0,
            plains: 5,
            forest: 2
        },
        blank: {
            plains: 1
        },
        weird: {
            wall: 5,
            palm: 0,
            plains: 2, 
            forest: 6
        },
        void: {
            void: 1
        }
    };

    return terrainFrequencies
});