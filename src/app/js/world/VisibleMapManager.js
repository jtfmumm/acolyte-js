define(function(require) {

    var WorldCoords = require("js/utils/WorldCoords");
    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");

    function VisibleMapManager(regionMatrix) {
        var regionCoords = regionMatrix.getStartingRegionCoords();
        var diameter = regionMatrix.getDiameter();
        this.NWCorner = new WorldCoords(regionCoords, new Coords(0, 0), regionMatrix);
        this.NECorner = new WorldCoords(regionCoords, new Coords(diameter, 0), regionMatrix);
        this.SWCorner = new WorldCoords(regionCoords, new Coords(0, diameter), regionMatrix);
        this.SECorner = new WorldCoords(regionCoords, new Coords(diameter, diameter), regionMatrix);
        this.map = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display) {
            this.updateMap();
            var codeMap = this.map.map(getTileCode);
            display.renderMap(codeMap);
        },
        updateMap: function() {
            var topSubMatrix, bottomSubMatrix;
            var NWMatrix = this.NWCorner.getRegionMap()
                .getSubMatrixByDirectionFrom("southeast", this.NWCorner.getLocalCoords());
            var NEMatrix = this.NECorner.getRegionMap()
                .getSubMatrixByDirectionFrom("southwest", this.NECorner.getLocalCoords());
            var SWMatrix = this.SWCorner.getRegionMap()
                .getSubMatrixByDirectionFrom("northeast", this.SWCorner.getLocalCoords());
            var SEMatrix = this.SECorner.getRegionMap()
                .getSubMatrixByDirectionFrom("northwest", this.SECorner.getLocalCoords());

            if (!(this.NWCorner.isSameRegionAs(this.NECorner))) {
                topSubMatrix = NWMatrix.concatHorizontal(NEMatrix);
            } else {
                topSubMatrix = NWMatrix;
            }

            if (!(this.SWCorner.isSameRegionAs(this.SECorner))) {
                bottomSubMatrix = SWMatrix.concatHorizontal(SEMatrix);
            } else {
                bottomSubMatrix = SWMatrix;
            }

            if (!(this.NWCorner.isSameRegionAs(this.NECorner))) {
                var newMap = topSubMatrix.concatVertical(bottomSubMatrix);
                this.map = new Matrix(newMap);
            } else {
                this.map = new Matrix(topSubMatrix);
            }
        }
    };

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return VisibleMapManager;
});