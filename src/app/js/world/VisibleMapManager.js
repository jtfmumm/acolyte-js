define(function(require) {

    var WorldCoords = require("js/utils/WorldCoords");
    var Matrix = require("js/utils/Matrix");

    function VisibleMapManager() {
        this.NWCorner = new WorldCoords();
        this.NECorner = new WorldCoords();
        this.SWCorner = new WorldCoords();
        this.SECorner = new WorldCoords();
        this.map = new Matrix();
    }

    VisibleMapManager.prototype = {
        display: function(display) {
            this.updateMap();
            display.renderMap(this.map);
        },
        updateMap: function() {
            var topSubMatrix, bottomSubMatrix;
            var NWMatrix = this.NWCorner.getMap()
                .getSubMatrixByDirectionFrom("southeast", this.NWCorner.getLocalCoords());
            var NEMatrix = this.NECorner.getMap()
                .getSubMatrixByDirectionFrom("southwest", this.NECorner.getLocalCoords());
            var SWMatrix = this.SWCorner.getMap()
                .getSubMatrixByDirectionFrom("northeast", this.SWCorner.getLocalCoords());
            var SEMatrix = this.SECorner.getMap()
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
                var newMap = topSubMatrix.concatVertical(bottomSubMatrix));
                this.map = new Matrix(newMap);
            } else {
                this.map = new Matrix(topSubMatrix);
            }
        }
    };

    return VisibleMapManager;
});