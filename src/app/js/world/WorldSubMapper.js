define(function(require) {

    var Directions = require("js/movement/Directions");
    var Matrix = require("js/utils/Matrix");

    var WorldSubMapper = {
        getCorners: function(regionMatrix, focus, radius) {
            return {
                NW: regionMatrix.offsetPosition(focus, Directions.northWest.scaledBy(radius)),
                NE: regionMatrix.offsetPosition(focus, Directions.northEast.scaledBy(radius)),
                SW: regionMatrix.offsetPosition(focus, Directions.southWest.scaledBy(radius)),
                SE: regionMatrix.offsetPosition(focus, Directions.southEast.scaledBy(radius))
            }
        },
        getSubMap: function(regionMatrix, focus, radius) {
            var topSubMatrix, bottomSubMatrix;

            var corners = this.getCorners(regionMatrix, focus, radius);

            console.log(corners);
            var NWMatrix = regionMatrix.getRegion(corners.NW.getRegionMatrixCoords())
                .getSubMapByDirectionFrom("southeast", corners.NW.getLocalCoords());
            var NEMatrix = regionMatrix.getRegion(corners.NE.getRegionMatrixCoords())
                .getSubMapByDirectionFrom("southwest", corners.NE.getLocalCoords());
            var SWMatrix = regionMatrix.getRegion(corners.SW.getRegionMatrixCoords())
                .getSubMapByDirectionFrom("northeast", corners.SW.getLocalCoords());
            var SEMatrix = regionMatrix.getRegion(corners.SE.getRegionMatrixCoords())
                .getSubMapByDirectionFrom("northwest", corners.SE.getLocalCoords());

            if (regionMatrix.inTheSameRegion(corners.NW, corners.NE)) {
                topSubMatrix = NWMatrix;
            } else {
                topSubMatrix = Matrix.concatHorizontal(NWMatrix, NEMatrix);
            }

            if (regionMatrix.inTheSameRegion(corners.SW, corners.SE)) {
                bottomSubMatrix = SWMatrix;
            } else {
                bottomSubMatrix = Matrix.concatHorizontal(SWMatrix, SEMatrix);
            }

            if (regionMatrix.inTheSameRegion(corners.NW, corners.NE)) {
                return topSubMatrix;
            } else {
                var newMap = Matrix.concatVertical(topSubMatrix, bottomSubMatrix);
                return newMap;
            }
        }
    };

    return WorldSubMapper;
});