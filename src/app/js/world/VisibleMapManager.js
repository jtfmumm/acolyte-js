define(function(require) {

    var Matrix = require("js/utils/Matrix");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");

    function VisibleMapManager(regionMatrix) {
        var regionCoords = regionMatrix.getStartingRegionCoords();
        var diameter = regionMatrix.getDiameter();
        this.NWCorner = new WorldCoords(regionCoords, new Coords(0, 0));
        this.NECorner = new WorldCoords(regionCoords, new Coords(diameter, 0));
        this.SWCorner = new WorldCoords(regionCoords, new Coords(0, diameter));
        this.SECorner = new WorldCoords(regionCoords, new Coords(diameter, diameter));
        this.regionMatrix = regionMatrix;
        this.map = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display) {
            this.updateMap();
            var codeMap = this.map.map(getTileCode);
            display.renderMap(codeMap);
        },
        getRegion: function(wCoords) {
            var regionMatrixCoords = wCoords.getRegionMatrixCoords();
            return this.regionMatrix.getRegion(regionMatrixCoords);
        },
        updateMap: function() {
            var topSubMatrix, bottomSubMatrix;
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

    function getTileCode(tile) {
        if (tile.occupant)
            return tile.occupant.getCode();
        else
            return tile.terrain.code;
    }

    return VisibleMapManager;
});