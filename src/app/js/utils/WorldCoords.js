define(function(require) {
    
    function WorldCoords(regionMatrixCoords, localCoords, regionMatrix) {
        this.regionMatrixCoords = regionMatrixCoords;
        this.localCoords = localCoords;
        this.regionMatrix = regionMatrix;
    } 
    
    WorldCoords.prototype = {
        getRegion: function() {
            return this.regionMatrix.getRegion(this.regionMatrixCoords);
        },
        getRegionMap: function() {
            return this.getRegion().getMap();
        },
        getRegionMatrixCoords: function() {
            return this.regionMatrixCoords;
        },
        getLocalCoords: function() {
            return this.localCoords;
        },
        isStillInRegionAfter: function(wCoords, posChange) {
            var newLocalCoords = wCoords.getLocalCoords().plus(posChange);
            return this.regionMatrix
                .getRegion(wCoords.getRegionMatrixCoords())
                .isWithinBoundaries(newLocalCoords);
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
        isSameRegionAs: function(wCoords) {
            return this.getRegion() === wCoords.getRegion();
        },
        isEqual: function (wCoords) {
            return (this.x === coords.x && this.y === coords.y);
        },
        positiveOffsetGiven: function (coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = coords.x - this.x;
            if (newX < 0) newX = 0;
            var newY = coords.y - this.y;
            if (newY < 0) newY = 0;
            return new Coords(newX, newY);
        },
        negativeOffsetGiven: function (coords) {
            var coords = Coords.makeCoords(arguments);
            var newX = coords.x - this.x;
            if (newX > 0) newX = 0;
            var newY = coords.y - this.y;
            if (newY > 0) newY = 0;
            return new Coords(newX, newY);
        },
        offsetGiven: function (radius, width, height) {
            var topOffset = this.minus(radius, radius).positiveOffsetGiven(0, 0);
            var bottomOffset = this.plus(radius, radius).negativeOffsetGiven(width, height);
            return this.plus(topOffset).plus(bottomOffset);
        },
        directionTo: function (coords) {
            var coords = Coords.makeCoords(arguments);
            var difference = this.minus(coords);
            if (difference.x > 0 && difference.y === 0) return "west";
            if (difference.x > 0 && difference.y < 0) return "southwest";
            if (difference.x > 0 && difference.y > 0) return "northwest";
            if (difference.x < 0 && difference.y === 0) return "east";
            if (difference.x < 0 && difference.y < 0) return "southeast";
            if (difference.x < 0 && difference.y > 0) return "northeast";
            if (difference.x === 0 && difference.y > 0) return "north";
            if (difference.x === 0 && difference.y < 0) return "south";
            return "none";
        },
        directionFrom: function (coords) {
            var coords = Coords.makeCoords(arguments);
            var difference = this.minus(coords);
            if (difference.x < 0 && difference.y === 0) return "west";
            if (difference.x < 0 && difference.y > 0) return "southwest";
            if (difference.x < 0 && difference.y < 0) return "northwest";
            if (difference.x > 0 && difference.y === 0) return "east";
            if (difference.x > 0 && difference.y > 0) return "southeast";
            if (difference.x > 0 && difference.y < 0) return "northeast";
            if (difference.x === 0 && difference.y < 0) return "north";
            if (difference.x === 0 && difference.y > 0) return "south";
            return "none";
        }
    };

    return WorldCoords;
});