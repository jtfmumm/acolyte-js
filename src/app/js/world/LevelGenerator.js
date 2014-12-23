define(function(require) {

    var _ = require("lodash");
    var Level = require("js/world/Level");
    var Coords = require("js/utils/Coords");
    var LevelMap = require("js/world/LevelMap");
    var RegionManager = require("js/world/RegionManager");
    var LevelMapAlgorithms = require("js/generators/LevelMapAlgorithms");

    var LevelGenerator = {
        create: function(levelType) {
            return this[levelType](null);
        },
        createLevelWithParent: function(levelType, parent) {
            return this[levelType](parent);
        },
        createCustom: function(options) {
            return this.generate(options);
        },
        generate: function(options) {
            var parent = options.parent;
            var parentCoords = options.parentCoords || null;
            var diameter = options.diameter;
            var diameterPerRegion = options.diameterPerRegion || diameter; //Default is 1 Region for Level
            var visibleDiameter = options.visibleDiameter;
            var voidType = options.voidType;
            var focus = options.focus || null;
            var landmarks = options.landmarks || function() {};
            var levelMap = new LevelMap({
                diameter: diameter,
                diameterPerRegion: diameterPerRegion,
                voidType: voidType,
                levelMapAlgorithms: options.levelMapAlgorithms,
                focus: focus
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

    return LevelGenerator;
});
