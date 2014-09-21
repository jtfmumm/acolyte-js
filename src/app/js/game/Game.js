define(function(require) {
    "use strict";

    var LevelManager = require("js/world/LevelManager");
    var LevelFactory = require("js/world/LevelFactory");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var TestWorldGenerator = require("js/test-worlds/TestWorldGenerator");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");

    var Console = require("js/screens/Console");
    var Calendar = require("js/utils/Calendar");


    function Game() {
        this.display = new HTMLDisplay();
        this.input = null;
        this.levelManager = null;
        this.pauseState = false;
    }

    Game.prototype = {
        init: function(inputDevice) {
            this.input = inputDevice;
            this.input.connect();

            this.initializeLevelManager();
            Self.init(this.input);

            this.displayScreens();
            this.watchInput();
        },
        initializeLevelManager: function() {
            this.levelManager = new LevelManager();
            var world = LevelFactory.createLevelWithParent("world", this.levelManager);
            this.levelManager.initializeLevel(world);
            this.levelManager.placeInitialShrine();
            this.levelManager.enterCurrentLevel();
        },
        displayScreens: function() {
            this.levelManager.display(this.display);
            Console.display(this.display, Self.getStats());
        },
        watchInput: function() {
            var _this = this;
            if (Self.isDead()) this.endGame();
            setTimeout(function() {
                if (_this.input.isReady()) {
                    _this.nextStep();
                }
                _this.watchInput();
            }, 1);
        },
        nextStep: function() {
            Calendar.addTick();
            processNextKey(this.input);
            ActiveAgents.prepareAgents();
            this.displayScreens();
        },
        pause: function() {
            this.pauseState = !this.pauseState;
            if (this.pauseState === true) {
                Console.msg("Game is paused!");
                this.input.disconnect();
            } else {
                Console.msg("Game is unpaused!");
                this.input.connect();
            }
        },
        endGame: function() {
            Console.msg("Game over!");
            this.input.reset();
            this.input.disconnect();
        },
        test: function(inputDevice, testMap) {
            this.input = inputDevice;
            var world = TestWorldGenerator.generateFromMap(testMap);
            this.levelManager = new LevelManager(world);

            this.levelManager.display(this.display);
        }
    };

    function processNextKey(input) {
        var nextInput = input.nextInput();
        if (nextInput) console.log(nextInput);
        if (input.waiting && nextInput) {
            switch (nextInput) {
                case "UP":
                    Console.msg("UP");
                    break;
                default:
                    Console.msg(nextInput);
                    break;
            }
            input.toggleWaiting();
        } else if (!input.waiting) {
            switch (nextInput) {
                case "PAUSE":
                    Game.pause();
                    break;
                case "LOOK":
                    input.toggleWaiting("LOOK");
                    break;
                default:
                    Self.setInputList([nextInput]);
                    break;
            }
        }
    }

    return Game;
});