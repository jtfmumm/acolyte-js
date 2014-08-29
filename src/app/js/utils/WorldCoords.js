define(function(require) {
    
    function WorldCoords(regionMatrixCoords, localCoords) {
        this.regionMatrixCoords = regionMatrixCoords;
        this.localCoords = localCoords;
    }
    
    WorldCoords.prototype = {
        getRegionMatrixCoords: function() {
            return this.regionMatrixCoords;
        },
        getLocalCoords: function() {
            return this.localCoords;
        },
        plus: function(posChange) {
            if (this.isStillInRegionAfter(this, posChange)) {
                return this.plusLocal(posChange);
            } else {
                return this.regionMatrix.getUpdatedWorldCoords(this, posChange);
            }
        },
        plusLocal: function(posChange) {
            return new WorldCoords(this.regionMatrixCoords, this.localCoords.plus(posChange));
        },
        isEqual: function (wCoords) {
            return this.regionMatrixCoords.isEqual(wCoords.getRegionMatrixCoords()) &&
                this.localCoords.isEqual(wCoords.getLocalCoords());
        },
    };

    return WorldCoords;
});