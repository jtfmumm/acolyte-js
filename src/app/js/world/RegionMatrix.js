define(function(require) {
    "use strict";

    _ = require("lodash");
    var Matrix = require("js/utils/Matrix");
    var Region = require("js/world/Region");

    //Takes width and height measured in regions, plus diameter per region
    function RegionMatrix(width, height, diameterPerRegion) {
        this.width = width;
        this.height = height;
        this.diameterPerRegion = diameterPerRegion;
        Matrix.call(this);
        var i;
        for (i = 0; i < height; i++) {
            this.data.push(Array(width));
        }
    }

    RegionMatrix.prototype = _.extend(Object.create(Matrix.prototype), {
        initialize: function () {
            var i, j;
            for (i = 0; i < this.height; i++) {
                for (j = 0; j < this.width; j++) {
                    this.data[i][j] = generateRegion(this.diameterPerRegion);
                }
            }
        }
    });


    function generateRegion(diameter) {
        return new Region({diameter: diameter, type: "average"});
    }


    return RegionMatrix;
});