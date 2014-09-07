define(function(require) {
    "use strict";

    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var ActiveAgents = require("js/agents/ActiveAgents");
    
//REMOVE LATER
    var Drunk = require("js/agents/Drunk");
    var Coords = require("js/utils/Coords");
    var WorldCoords = require("js/utils/WorldCoords");

    var Console = require("js/screens/Console");

    var display = new HTMLDisplay();
    var world = new World();
    var pauseState = false;
    var timeCounter = 0;

    var drunk = new Drunk(world, new WorldCoords(new Coords(0, 0), new Coords(1, 1)));


    var Game = {
        input: null,
        init: function(inputDevice) {
            this.input = inputDevice;
            this.world = new World(this);
            this.input.connect();
            this.world.initializeSelf(Self, this.input);
            this.world.display(display);
            Console.display(display);

            world.placeAgent(drunk, new WorldCoords(new Coords(0, 0), new Coords(1, 1)));

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
            Console.display(display);
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
        softPause: function() {
            pauseState = !pauseState;
            if (pauseState === true) {
                this.input.disconnect();
            } else {
                this.input.connect();
            }
        },
        endGame: function() {
            Console.msg("Game over!");
            this.input.reset();
            this.input.disconnect();
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
                    console.log("Defaulted");
                    Self.setInputList([nextInput]);
                    break;
            }
        }
    }

    return Game;
})