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
            this.input.connect();
            world.initializeSelf(Self);
            world.display(display);
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
            world.display(display);
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
        }
    };

    function processNextKey(input) {
        var nextInput = input.nextInput();
        if (nextInput) console.log(nextInput);
        switch (nextInput) {
            case "PAUSE":
                Game.pause();
                break;
            default:
                Self.setInput(nextInput);
                break;
        }
    }

    return Game;
})