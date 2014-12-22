define(function(require) {

    var Self = require("js/self/Self");
    var Cursor = require("js/self/Cursor");
    var Console = require("js/screens/Console");
    var Directions = require("js/movement/Directions");


    var InputProcessor = {
        input: null,
        pauseState: false,
        mode: "normal",
        init: function(input) {
            this.input = input;
            this.input.connect();
        },
        isReady: function() {
            return this.input.isReady();
        },
        processNextKey: function() {
            var nextInput = this.input.nextInput();
            if (nextInput) console.log(nextInput);

            this[this.mode](nextInput);

//            if (this.input.waiting && nextInput) {
//                console.log(nextInput);
//                switch (nextInput) {
//                    default:
//                        Self.setInputList([this.input.pendingCommand, nextInput]);
//                        break;
//                }
//                this.input.toggleWaiting();
//            } else if (!this.input.waiting) {
//                switch (nextInput) {
//                    case "PAUSE":
//                        this.pause();
//                        break;
//                    case "LOOK":
//                        this.input.toggleWaiting("LOOK");
//                        break;
//                    default:
//                        Self.setInputList([nextInput]);
//                        break;
//                }
//            }
        },
        normal: function(nextInput) {
            switch (nextInput) {
                case "PAUSE":
                    this.pause();
                    break;
                case "LOOK":
                    this.mode = "look";
                    Console.msg("Move cursor to target and press enter.");
                    break;
                default:
                    Self.setInputList([nextInput]);
                    break;
            }
        },
        look: function(nextInput) {
            if (Directions.isDirection(nextInput)) {
                Cursor.move(Directions[nextInput]);
            } else {
                switch (nextInput) {
                    case "LOOK":
                    case "ESC":
                        this.mode = "normal";
                        Cursor.reset();
                        Console.msg("Stopped looking.");
                        break;
                    case "ENTER":
                        Self.look(Cursor.position);
                }
            }
        },
        pause: function() {
            this.pauseState = !this.pauseState;
            if (this.pauseState === true) {
                Console.msg("Game is paused!");
                this.input.waitForPause();
            } else {
                Console.msg("Game is unpaused!");
                this.input.restart();
            }
        },
        shutdown: function() {
            this.input.reset();
            this.input.disconnect();
        }
    };

    return InputProcessor;
});