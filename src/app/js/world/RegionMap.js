define(function(require) {
    "use strict";

    var Matrix = require("js/utils/Matrix");
    var Region = require("js/world/Region");

    function RegionMap(width, height, diameter) {
        this.width = width;
        this.height = height;
        this.diameter = diameter;
        Matrix.call(this);
        var i;
        for (i = 0; i < height; i++) {
            this.data.push(Array(width));
        }
    }
    RegionMap.prototype = Object.create(Matrix.prototype);
    RegionMap.prototype.initialize() {
        var i, j;
        for (i = 0; i < this.height; i++) {
            for (j = 0; j < this.width; j++) {
                this.data[i][j] = generateRegion(this.diameter);
            }
        }
    }

    function generateRegion(diameter) {
        return new Region(diameter, "average");
    }


    return RegionMap;
});