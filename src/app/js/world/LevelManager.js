define(function(require) {

    var Uid = require("js/utils/Uid");
    var Level = require("js/world/Level");
    var LevelFactory = require("js/world/LevelFactory");

    function LevelManager(level) {
        this.currentLevel = level || null;
        this.registry = {};
        this.nextRegistryId = Uid.makeGenerator(); //Function that returns next id
    }

    LevelManager.prototype = {
        initializeLevel: function(level) {
            var nextUid = this.nextRegistryId();
            level.setRegistryId(nextUid);
            this.registry[nextUid] = level;
            this.currentLevel = level;
            this.currentLevel.enter();
        },
        //Eventually remove this method
        placeInitialLandmark: function(landmark) {
            this.currentLevel.placeInitialLandmark(landmark);
        },
        enterSubLevel: function(levelOrSeed, tile, parentCoords) {
            if (levelOrSeed instanceof Level) {
                this.currentLevel.exit();
                this.currentLevel = levelOrSeed;
                this.currentLevel.enter();
            } else {
                this.currentLevel.exit();
                var newLevel = LevelFactory[levelOrSeed](this.currentLevel, parentCoords);
                tile.updateLevel(newLevel);
                this.initializeLevel(newLevel)
            }
        },
        enterParentLevel: function(parent, returnCoords) {
            this.currentLevel.exit();
            this.currentLevel = parent;
            this.enterCurrentLevel(returnCoords);
        },
        enterCurrentLevel: function(coords) {
            this.currentLevel.enter(coords);
        },
        display: function(screen) {
            screen.display(this.currentLevel);
//            this.currentLevel.display(display);
        },
        getDisplayMap: function() {
            return this.currentLevel.getDisplayMap();
        },
        canDropItemAt: function(coords) {
            return this.currentLevel.canDropItemAt(coords);
        },
        dropItem: function(item, coords) {
            this.currentLevel.dropItem(item, coords);
        }
    };

    return LevelManager;
});