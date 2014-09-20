define(function(require) {

    var _ = require("lodash");
    var Level = require("js/world/Level");
    var Coords = require("js/utils/Coords");
    var LevelMap = require("js/world/LevelMap");
    var RegionManager = require("js/world/RegionManager");
    var LandmarkAlgorithms = require("js/generators/LandmarkAlgorithms");

    var LevelFactory = {
        create: function(levelType) {
            return this[levelType](null);
        },
        createLevelWithParent: function(levelType, parent) {
            return this[levelType](parent);
        },
        createCustom: function(options) {
            return this.level(options);
        },
        world: function(parent) {
            return this.level({
                parent: parent,
                diameter: 325, //Probably not larger than 3250
                diameterPerRegion: 65,
                visibleDiameter: 51,
                voidTerrain: "water",
                landmarks: LandmarkAlgorithms.world
            });
        },
        shrine: function(parent) {
            return this.level({
                parent: parent,
                diameter: 33,
                diameterPerRegion: 33,
                visibleDiameter: 51,
                voidTerrain: "void",
                landmarks: LandmarkAlgorithms.shrine
            });
        },
        level: function(options) {
            var parent = options.parent;
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion || diameter; //Default is 1 Region for Level
            var visibleDiameter = options.visibleDiameter;
            var voidTerrain = options.voidTerrain || "void";
            var landmarks = options.landmarks || function() {};
            var levelMap = new LevelMap({
                diameter: diameter,
                diameterPerRegion: diameterPerRegion,
                voidTerrain: voidTerrain
            });
            var regionManager = new RegionManager({
                diameter: diameter,
                diameterPerRegion: diameterPerRegion
            });

            return new Level({
                parent: parent,
                diameter: diameter,
                visibleDiameter: visibleDiameter,
                levelMap: levelMap,
                regionManager: regionManager,
                landmarksAlg: landmarks
            });
        }
    };

    return LevelFactory;
});
