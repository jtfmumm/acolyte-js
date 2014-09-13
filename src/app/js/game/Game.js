define(function(require) {
    "use strict";

    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var ActiveAgents = require("js/agents/ActiveAgents");
    var TestWorldGenerator = require("js/test-worlds/TestWorldGenerator");
    var getAstarShortestPath = require("js/algorithms/getAstarShortestPath");


//REMOVE LATER
    var Drunk = require("js/agents/Drunk");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");

    var Console = require("js/screens/Console");

    var display = new HTMLDisplay();
    var pauseState = false;
    var timeCounter = 0;

//    var drunk = new Drunk(world, new WorldCoords(new Coords(0, 0), new Coords(1, 1)));


    var Game = {
        input: null,
        init: function(inputDevice) {
            this.input = inputDevice;
            this.world = new World({parent: this});
            this.input.connect();
            this.world.initializeSelf(Self, this.input);
            this.world.display(display);
            Console.display(display);

            this.watchInput();
        },
        watchInput: function() {
            var that = this;
            setTimeout(function() {
                if (that.input.isReady()) {
                    that.nextStep();
                }
                that.watchInput();
            }, 1);
        },
        nextStep: function() {
            timeCounter++;
            processNextKey(this.input);
            ActiveAgents.prepareAgents();
            this.world.display(display);
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
            this.world = TestWorldGenerator.generateFromMap(testMap);
            this.world.display(display);

            var region = new Coords(0, 0);
            var start = new Coords(0, 0);
            var end = new Coords(10, 10);
            var wall = new Coords(1, 2);
            this.world.isImpenetrable(new WorldCoords(region, wall, this.world.regionMatrix));

            console.log("Shortest Path", getAstarShortestPath(new WorldCoords(region, start, 11), new WorldCoords(region, end, 11), this.world.regionMatrix));
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