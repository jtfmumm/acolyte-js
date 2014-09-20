define(function(require) {

    var Uid = require("js/utils/Uid");

    function LevelManager(level) {
        this.currentLevel = level;
        this.registry = {};
        this.nextRegistryId = Uid.makeGenerator(); //Function that returns next id
        this.initializeLevel(level);
    }

    LevelManager.prototype = {
        initializeLevel: function(level) {
            var nextUid = this.nextRegistryId();
            level.setRegistryId(nextUid);
            this.registry[nextUid] = level;
            this.currentLevel = level;
        },
        updateCurrentLevel: function(level) {
            this.currentLevel = level;
        },
        initializeSelf: function(self, focus) {
            this.currentLevel.initializeSelf(self, focus);
        },
        display: function(display) {
            this.currentLevel.display(display);
        }
    };

    return LevelManager;
});