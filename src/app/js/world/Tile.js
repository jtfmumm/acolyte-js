define(function(require) {

    function Tile(options) {
        this.occupant = options.occupant || null;
        this.landmark = options.landmark || null;
        this.terrain = options.terrain || "plains";
        this.elevation = options.elevation || 0;
    }

    Tile.prototype = {
        isImpenetrable: function() {
            if (tile.occupant) {
                return tile.occupant.isImpenetrable();
            } else if (tile.landmark) {
                return tile.landmark.impenetrable;
            } else if (tile.terrain) {
                return tile.terrain.impenetrable;
            } else return false;
        },
        describe: function() {
            if (tile.occupant) {
                return "You see " + tile.occupant.describe();
            } else if (tile.landmark) {
                return "You see " + tile.landmark.description;
            } else if (tile.terrain) {
                return "You see " + tile.terrain.description;
            } else return "There is nothing here.";
        },
        getDisplayCode: function() {
            if (this.occupant) {
                return this.occupant.getCode();
            } else if (this.landmark) {
                return this.landmark.code;
            } else {
                return this.terrain.code;
            }
        },
        updateFromProperties: function(newProperties) {
            for (var prop in newProperties) {
                this[prop] = newProperties[prop];
            }
        },
        updateOccupant: function(occupant) {
            this.occupant = occupant;
        },
        removeOccupant: function() {
            this.occupant = null;
        },
        updateLandmark: function(landmark) {
            this.landmark = landmark;
        },
        removeLandmark: function() {
            this.landmark = null;
        },
        updateTerrain: function(terrain) {
            this.terrain = terrain;
        },
        updateElevation: function(elevation) {
            this.elevation = elevation;
        }
    };

    return Tile;
});
