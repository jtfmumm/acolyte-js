define(function(require) {

    var Directions = require("js/movement/Directions");

    var WorldSubMapper = {
        getCorners: function(regionMatrix, focus, radius) {
            return {
                NWCorner: regionMatrix.offsetPosition(focus, Directions.northwest.scaledBy(radius)),
                NECorner: regionMatrix.offsetPosition(focus, Directions.northeast.scaledBy(radius)),
                SWCorner: regionMatrix.offsetPosition(focus, Directions.southwest.scaledBy(radius)),
                SECorner: regionMatrix.offsetPosition(focus, Directions.southeast.scaledBy(radius))
            }
        },
        getSubMap: function(regionMatrix, focus, radius) {
            var topSubMatrix, bottomSubMatrix;

            var corners = this.getCorners(regionMatrix, focus, radius);

            var NWMatrix = this.getRegion(this.NWCorner)
                .getSubMapByDirectionFrom("southeast", this.NWCorner.getLocalCoords());
            var NEMatrix = this.getRegion(this.NECorner)
                .getSubMapByDirectionFrom("southwest", this.NECorner.getLocalCoords());
            var SWMatrix = this.getRegion(this.SWCorner)
                .getSubMapByDirectionFrom("northeast", this.SWCorner.getLocalCoords());
            var SEMatrix = this.getRegion(this.SECorner)
                .getSubMapByDirectionFrom("northwest", this.SECorner.getLocalCoords());

            if (this.regionMatrix.inTheSameRegion(this.NWCorner, this.NECorner)) {
                topSubMatrix = NWMatrix;
            } else {
                topSubMatrix = NWMatrix.concatHorizontal(NEMatrix);
            }

            if (this.regionMatrix.inTheSameRegion(this.SWCorner, this.SECorner)) {
                bottomSubMatrix = SWMatrix;
            } else {
                bottomSubMatrix = SWMatrix.concatHorizontal(SEMatrix);
            }

            if (this.regionMatrix.inTheSameRegion(this.NWCorner, this.NECorner)) {
                this.map = topSubMatrix;
            } else {
                var newMap = topSubMatrix.concatVertical(bottomSubMatrix);
                this.map = newMap;
            }
        }
    };

    return WorldSubMapper;
});