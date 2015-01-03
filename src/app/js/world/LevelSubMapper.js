define(function(require) {

    var Directions = require("js/movement/Directions");
    var Coords = require("js/utils/Coords");
    var Matrix = require("js/utils/Matrix");
    var VoidTile = require("js/world/VoidTile");

    var voidTile = new VoidTile();
    var lightEdgeTile = new VoidTile("light-edge");

    var LevelSubMapper = {
        getSubMap: function(levelMap, focus, diameter) {
            var radius = Math.floor(diameter / 2);
            var subMap = new Matrix().init(diameter, diameter);

            var originX = focus.x - radius;
            var originY = focus.y - radius;
            for (var y = 0; y < diameter; y++) {
                for (var x = 0; x < diameter; x++) {
                    subMap.setCell(x, y, levelMap.getTile(new Coords(x + originX, y + originY)));
                }
            }

            return subMap;
        },
        getLitSubMap: function(levelMap, focus, displayDiameter, visibleDiameter) {
            var adjustedX, adjustedY, xDiff, yDiff;
            var radius = Math.floor(displayDiameter / 2);
            var visibleRadius = Math.floor(visibleDiameter / 2);
            var subMap = new Matrix().init(displayDiameter, displayDiameter);

            var originX = focus.x - radius;
            var originY = focus.y - radius;
            for (var y = 0; y < displayDiameter; y++) {
                for (var x = 0; x < displayDiameter; x++) {
                    adjustedX = x + originX;
                    adjustedY = y + originY;
                    xDiff = Math.abs(adjustedX - focus.x);
                    yDiff = Math.abs(adjustedY - focus.y);
                    if (xDiff <= visibleRadius && yDiff <= visibleRadius) {
                        subMap.setCell(x, y, levelMap.getTile(new Coords(adjustedX, adjustedY)));
                    } else {
                        subMap.setCell(x, y, voidTile);
                    }
                }
            }

            return subMap;
        },
        getActiveZone: function(regionManager, levelFocus) {
            if (regionManager.getDiameterInRegions() > 1) {
                var regionFocus = regionManager.regionCoordsFrom(levelFocus);
                var topLeftRegion = regionFocus.minus(new Coords(1, 1));
                var activeRegions = new Matrix().init(3, 3);
                for (var yOffset = 0; yOffset < 3; yOffset++) {
                    for (var xOffset = 0; xOffset < 3; xOffset++) {
                        var nextX = topLeftRegion.x + xOffset;
                        var nextY = topLeftRegion.y + yOffset;
                        activeRegions.setCell(xOffset, yOffset, regionManager.getRegionByRegionCoords(new Coords(nextX, nextY)));
                    }
                }
            } else {
                var activeRegions = new Matrix().init(1, 1);
                activeRegions.setCell(0, 0, regionManager.getRegionByRegionCoords(new Coords(0, 0)));
            }

            return activeRegions;
        }
    };

    return LevelSubMapper;
});