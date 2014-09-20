define(function(require) {

    var Directions = require("js/movement/Directions");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");

    var WorldSubMapper = {
        getSubMap: function(levelMap, focus, radius) {
            var diameter = (radius * 2) + 1;
            var subMap = new Matrix().init(diameter, diameter);

            for (var y = 0; y < diameter; y++) {
                for (var x = 0; x < diameter; x++) {
                    subMap.setCell(x, y, levelMap.getTile(new Coords(x, y)));
                }
            }

            return subMap;
        },
        getActiveZone: function(regionManager, regionFocus) {
            var topLeftRegion = regionFocus.minus(new Coords(1, 1));
            var activeRegions = new Matrix().init(3, 3);
            for (var yOffset = 0; yOffset < 3; yOffset++) {
                for (var xOffset = 0; xOffset < 3; xOffset++) {
                    var nextX = topLeftRegion.x + xOffset;
                    var nextY = topLeftRegion.y + yOffset;
                    activeRegions.setCell(xOffset, yOffset, regionManager.getRegion(new Coords(nextX, nextY)));
                }
            }
            return activeRegions;
        }
    };

    return WorldSubMapper;
});