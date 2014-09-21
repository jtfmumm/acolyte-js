define(function(require) {

    var _ = require("lodash");
    var Level = require("js/world/Level");
    var Coords = require("js/utils/Coords");
    var LevelMap = require("js/world/LevelMap");
    var RegionManager = require("js/world/RegionManager");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

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
                levelMapAlgorithms: LevelMapAlgorithms.world
            });
        },
        shrine: function(parent, parentCoords) {
            return this.level({
                parent: parent,
                parentCoords: parentCoords,
                diameter: 13,
                diameterPerRegion: 13,
                visibleDiameter: 51,
                voidTerrain: "void",
                levelMapAlgorithms: LevelMapAlgorithms.shrine,
                focus: new Coords(Math.floor(13 / 2), 12)
            });
        },
        level: function(options) {
            var parent = options.parent;
            var parentCoords = options.parentCoords || null;
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion || diameter; //Default is 1 Region for Level
            var visibleDiameter = options.visibleDiameter;
            var voidTerrain = options.voidTerrain || "void";
            var focus = options.focus || null;
            var landmarks = options.landmarks || function() {};
            var levelMap = new LevelMap({
                diameter: diameter,
                diameterPerRegion: diameterPerRegion,
                voidTerrain: voidTerrain,
                levelMapAlgorithms: options.levelMapAlgorithms
            });
            var regionManager = new RegionManager({
                diameter: diameter,
                diameterPerRegion: diameterPerRegion
            });

            return new Level({
                parent: parent,
                parentCoords: parentCoords,
                diameter: diameter,
                visibleDiameter: visibleDiameter,
                levelMap: levelMap,
                regionManager: regionManager,
                landmarksAlg: landmarks,
                focus: focus
            });
        }
    };

    return LevelFactory;
});
