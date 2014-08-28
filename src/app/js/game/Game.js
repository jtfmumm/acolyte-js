define(function(require) {
    "use strict";

    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");
    var ActiveAgents = require("js/agents/ActiveAgents");
    
//REMOVE LATER
    var Drunk = require("js/agents/Drunk");
    var Coords = require("js/utils/Coords");



    var display = new HTMLDisplay();
    var world = new World();
    var gameSpeed = 150;  //higher is slower: ms per frame
    var pauseState = false;
    var ready = false;
    var timeCounter = 0;

    var drunk = new Drunk(world, new Coords(10, 10));


    var Game = {
        input: null,
        init: function(inputDevice) {
            //Remove later
            world.addOccupant(new Coords(10, 10), drunk);
            //NEED TO UPDATE ACTIVE LIST OVER TIME
            world.initializeAgents();

            this.input = inputDevice;
            this.input.connect();
            Self.init(world);
            ActiveAgents.addAgent(Self);
            world.displayMap(display);
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
            if (timeCounter % 100 == 0) {
                this.upkeep();
            }
            processNextKey(this.input);
            ActiveAgents.prepareAgents();
            world.displayMap(display);
        },
        pause: function() {
            pauseState = !pauseState;
            if (pauseState == true) 
                this.input.disconnect();
            else
                this.input.connect();
        },
        upkeep: function() {
            ActiveAgents.clearAll();
            world.initializeAgents();
            ActiveAgents.addAgent(Self);
            
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