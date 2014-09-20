define(function(require) {
    "use strict";

    var LevelManager = require("js/world/LevelManager");
    var LevelFactory = require("js/world/LevelFactory");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var TestWorldGenerator = require("js/test-worlds/TestWorldGenerator");
    var AstarPathfinder = require("js/algorithms/AstarPathfinder");


//REMOVE LATER
    var Coords = require("js/utils/Coords");

    var Console = require("js/screens/Console");
    var Calendar = require("js/utils/Calendar");

    var display = new HTMLDisplay();
    var pauseState = false;


    var Game = {
        input: null,
        init: function(inputDevice) {
            this.input = inputDevice;

            var world = LevelFactory.create("world");
            this.levelManager = new LevelManager(world);

            this.input.connect();
            this.levelManager.initializeSelf(Self, this.input);
            this.levelManager.display(display);
            Console.display(display);

            this.watchInput();
        },
        watchInput: function() {
            if (Self.isDead()) this.endGame();
            var _this = this;
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
            this.levelManager.display(display);
            Console.display(display, Self.getStats());
        },
        pause: function() {
            pauseState = !pauseState;
            if (pauseState === true) {
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

            this.levelManager.display(display);
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
})