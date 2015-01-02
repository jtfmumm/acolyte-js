define(function(require) {
    "use strict";

    var LevelManager = require("js/world/LevelManager");
    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var TestWorldGenerator = require("js/test-worlds/TestWorldGenerator");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");
    var InputProcessor = require("js/input/InputProcessor");
    var Cursor = require("js/self/Cursor");
    var Screen = require("js/screens/Screen");

    var Console = require("js/screens/Console");
    var Calendar = require("js/time/Calendar");


    function Game() {
        this.display = new HTMLDisplay();
        this.screen = null;
        this.levelManager = null;
    }

    Game.prototype = {
        init: function(inputDevice) {
            InputProcessor.init(inputDevice);

            this.initializeLevelManager();
            this.initializeScreen();
            Self.init(this.input);
            Cursor.init(Self);

            this.displayScreens();
            this.watchInput();
        },
        initializeLevelManager: function() {
            this.levelManager = new LevelManager();
            var world = new World(this.levelManager);
            this.levelManager.initializeLevel(world);
            //Place landmark where Self begins
            this.levelManager.placeInitialLandmark("village");
            this.levelManager.enterCurrentLevel();
        },
        initializeScreen: function() {
            this.screen = new Screen(this.display, this.levelManager);
        },
        displayScreens: function() {
            this.screen.display();
            Console.display(this.display, Self.getStats());
        },
        displayInventory: function() {
            this.screen.renderInventory();
        },
        watchInput: function() {
            var _this = this;
            if (Self.isDead()) this.endGame();
            setTimeout(function() {
                if (InputProcessor.isReady()) {
                    _this.nextStep();
                }
                _this.watchInput();
            }, 1);
        },
        nextStep: function() {
            InputProcessor.processNextKey();
            this.displayScreens();
        },
        endGame: function() {
            Console.msg("Game over!");
            InputProcessor.shutdown();
        },
//        test: function(inputDevice, testMap) {
//            this.input = inputDevice;
//            var world = TestWorldGenerator.generateFromMap(testMap);
//            this.levelManager = new LevelManager(world);
//
//            this.levelManager.display(this.display);
//        }
    };



    return Game;
});