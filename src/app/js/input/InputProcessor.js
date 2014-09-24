define(function(require) {

    var Self = require("js/self/Self");
    var Console = require("js/screens/Console");

    var InputProcessor = {
        input: null,
        pauseState: false,
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
            if (this.input.waiting && nextInput) {
                console.log(nextInput);
                switch (nextInput) {
                    default:
                        Self.setInputList([this.input.pendingCommand, nextInput]);
                        break;
                }
                this.input.toggleWaiting();
            } else if (!this.input.waiting) {
                switch (nextInput) {
                    case "PAUSE":
                        this.pause();
                        break;
                    case "LOOK":
                        this.input.toggleWaiting("LOOK");
                        break;
                    default:
                        Self.setInputList([nextInput]);
                        break;
                }
            }
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
        shutdown: function() {
            this.input.reset();
            this.input.disconnect();
        }
    };

    return InputProcessor;
});