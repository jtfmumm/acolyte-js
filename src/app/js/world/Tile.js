define(function(require) {

    var occupantTypes = require("js/data/occupantTypes");
    var landmarkTypes = require("js/data/landmarkTypes");
    var terrainTypes = require("js/data/terrainTypes");
    var elevationTypes = require("js/data/elevationTypes");

    function Tile(options) {
        options = options || {};
        this.occupant = options.occupant || null;
        this.landmark = options.landmark || null;
        this.terrain = options.terrain || "plains";
        this.elevation = options.elevation || 0;
    }

    Tile.prototype = {
        isImpenetrable: function() {
            if (this.occupant) {
                return this.occupant.isImpenetrable();
            } else if (this.landmark) {
                return landmarkTypes[this.landmark].impenetrable;
            } else if (this.terrain) {
                return terrainTypes[this.terrain].impenetrable;
            } else return true;
        },
        describe: function() {
            if (this.occupant) {
                return "You see " + this.occupant.describe();
            } else if (this.landmark) {
                return "You see " + landmarkTypes[this.landmark].description;
            } else if (this.terrain) {
                return "You see " + terrainTypes[this.terrain].description;
            } else return "There is nothing here.";
        },
        getDisplayCode: function() {
            if (this.occupant) {
                return this.occupant.getCode();
            } else if (this.landmark) {
                return this.landmark;
            } else {
                return this.terrain;
            }
        },
        getElevation: function() {
            return this.elevation;
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
