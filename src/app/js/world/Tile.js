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
        this.returnPoint = options.returnPoint || false;
        this.level = options.level || null;
        this.highlighted = false;
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
        getTerrainCode: function() {
            if (this.terrain) {
                return this.terrain;
            } else {
                return {};
            }
        },
        isEmpty: function() {
            return (!this.occupant && !this.landmark);
        },
        getElevation: function() {
            return this.elevation;
        },
        updateFromProperties: function(newProperties) {
            for (var prop in newProperties) {
                this[prop] = newProperties[prop];
            }
        },
        updateByProperty: function(property, propertyType) {

        },
        updateOccupant: function(occupant) {
            this.occupant = occupant;
        },
        removeOccupant: function() {
            this.occupant = null;
        },
        updateLandmark: function(landmark) {
            this.landmark = landmark;
            if (landmarkTypes[landmark].seed) this.level = landmarkTypes[landmark].seed;
        },
        removeLandmark: function() {
            this.landmark = null;
        },
        updateTerrain: function(terrain) {
            this.terrain = terrain;
        },
        updateElevation: function(elevation) {
            this.elevation = elevation;
        },
        updateLevel: function(level) {
            this.level = level;
        },
        hasLevel: function() {
            return Boolean(this.level);
        },
        getLevel: function() {
            return this.level;
        },
        isReturnPoint: function() {
            return this.returnPoint;
        },
        toggleHighlighted: function() {
            this.highlighted = !this.highlighted;
        },
        isHighlighted: function() {
            return this.highlighted || (this.occupant && this.occupant.isHighlighted());
        }
    };

    return Tile;
});
