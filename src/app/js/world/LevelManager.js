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
        enterSubLevel: function(levelOrSeed, tile) {
            if (levelOrSeed instanceof Level) {
                this.currentLevel.exit();
                this.currentLevel = levelOrSeed;
                this.currentLevel.enter();
            } else {
                var newLevel = LevelFactory[levelOrSeed](this.currentLevel);
                tile.updateLevel(newLevel);
                this.currentLevel.exit();
                this.initializeLevel(newLevel)
            }
        },
        enterCurrentLevel: function() {
            this.currentLevel.enter();
        },
        display: function(display) {
            this.currentLevel.display(display);
        }
    };

    return LevelManager;
});