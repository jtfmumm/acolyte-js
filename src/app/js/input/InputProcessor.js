define(function(require) {

    var Self = require("js/self/Self");
    var Cursor = require("js/self/Cursor");
    var Console = require("js/screens/Console");
    var Directions = require("js/movement/Directions");
    var Simulator = require("js/game/Simulator");


    var InputProcessor = {
        input: null,
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
//            if (nextInput) console.log(nextInput);

            this[this.mode](nextInput);
        },
        normal: function(nextInput) {
            switch (nextInput) {
                case "PAUSE":
                    this.mode = "pause";
                    Console.msg("Game is paused!");
                    break;
                case "LOOK":
                    this.mode = "look";
                    Console.msg("Look: Move cursor to target and press enter.");
                    break;
                case "TALK":
                    this.mode = "talk";
                    Console.msg("Talk: Move cursor to target and press enter.");
                    break;
                case "EDIT":
                    this.mode = "edit";
                    Console.msg("Choose where to edit.");
                    break;
                case "HELP":
                    Console.msg("Arrows or numpad - Move (including diagonal)");
                    Console.msg("t - Talk");
                    Console.msg("h - Help");
                    Console.msg("a - Attack Mode");
                    Console.msg("d - Defense Mode");
                    Console.msg("n - Normal Mode");
                    Console.msg("esc - Return to walking");
                    break;
                default:
                    Self.setNextInput(nextInput);
                    Simulator.nextStep();
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
                    case "QUIT":
                        this.mode = "normal";
                        Cursor.reset();
                        Console.msg("Stopped looking.");
                        break;
                    case "TALK":
                        this.mode = "talk";
                        Console.msg("Choose who to talk to.");
                        break;
                    case "EDIT":
                        this.mode = "edit";
                        Console.msg("Choose where to edit.");
                        break;
                    case "ENTER":
                        Self.look(Cursor.position);
                }
            }
        },
        talk: function(nextInput) {
            if (Directions.isDirection(nextInput)) {
                Cursor.move(Directions[nextInput]);
            } else {
                switch (nextInput) {
                    case "TALK":
                    case "ESC":
                    case "QUIT":
                        this.mode = "normal";
                        Cursor.reset();
                        Console.msg("Stopped talking.");
                        break;
                    case "LOOK":
                        this.mode = "look";
                        Console.msg("Choose where to look.");
                        break;
                    case "EDIT":
                        this.mode = "edit";
                        Console.msg("Choose where to edit.");
                        break;
                    case "ENTER":
                        Self.talkTo(Cursor.position);
                }
            }
        },
        edit: function(nextInput) {
            if (Directions.isDirection(nextInput)) {
                Cursor.move(Directions[nextInput]);
            } else {
                switch (nextInput) {
                    case "EDIT":
                    case "ESC":
                    case "QUIT":
                        this.mode = "normal";
                        Cursor.reset();
                        Console.msg("Stopped editing.");
                        break;
                    case "LOOK":
                        this.mode = "look";
                        Console.msg("Choose where to look.");
                        break;
                    case "TALK":
                        this.mode = "talk";
                        Console.msg("Choose who to talk to.");
                        break;
                    case "V":
                        console.log("hi");
                        Self.placeLevel(Cursor.position, "village");
                        break;
                    case "S":
                        Self.placeLevel(Cursor.position, "shrine");
                        break;
                    case "C":
                        Self.placeLevel(Cursor.position, "cave");
                        break;
                }
            }
        },
        pause: function(nextInput) {
            if (nextInput === "PAUSE" || nextInput === "ESC") {
                this.mode = "normal";
                Console.msg("Game is unpaused!");
            }
        },
        shutdown: function() {
            this.input.reset();
            this.input.disconnect();
        }
    };

    return InputProcessor;
});