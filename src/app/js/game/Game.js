define(function(require) {
    var Input = require("js/input/Input");
    var World = require("js/world/World");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var Self = require("js/self/Self");

    var display = new HTMLDisplay();
    var world = new World();
    var gameSpeed = 150;  //higher is slower: ms per frame
    var pauseState = false;

    var Game = {
        inputDevice: null,
        init: function(inputDevice) {
            this.inputDevice = inputDevice;
            this.inputDevice.connect();
            console.log("init");
            Self.init(world);
            this.nextStep();
        },
        nextStep: function() {
            setTimeout(function() {
                that.nextStep();
            }, gameSpeed);

            var that = this;
            world.displayMap(display);

            processNextKey();
        },
        pause: function() {
            pauseState = !pauseState;
            if (pauseState == true) 
                this.inputDevice.disconnect();
            else
                this.inputDevice.connect();
        }
    };

    function processNextKey() {
        var nextInput = Input.nextInput();
        if (nextInput) console.log(nextInput);
        switch (nextInput) {
            case "UP":
                Self.move(0, -1, world);
                break;
            case "DOWN":
                Self.move(0, 1, world);
                break;
            case "LEFT":
                Self.move(-1, 0, world);
                break;
            case "RIGHT":
                Self.move(1, 0, world);
                break;
            case "PAUSE":
                Game.pause();
                break;
            default:
                break;
        }
    }

    return Game;
})