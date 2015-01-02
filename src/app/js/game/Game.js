define(function(require) {
    "use strict";

    var LevelManager = require("js/world/LevelManager");
    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var InventoryManager = require("js/inventory/InventoryManager");
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
        this.inputProcessor = null;
        this.inventoryManager = new InventoryManager();
    }

    Game.prototype = {
        init: function(inputDevice) {
            this.initializeLevelManager();
            this.initializeScreen();
            this.inputProcessor = new InputProcessor(inputDevice, this.inventoryManager, this.screen);
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
            this.screen = new Screen(this.display, this.levelManager, this.inventoryManager);
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
                if (_this.inputProcessor.isReady()) {
                    _this.nextStep();
                }
                _this.watchInput();
            }, 1);
        },
        nextStep: function() {
            this.inputProcessor.processNextKey();
            this.displayScreens();
        },
        endGame: function() {
            Console.msg("Game over!");
            this.inputProcessor.shutdown();
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