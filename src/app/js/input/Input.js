define(function(require) {

    var Input = function() {
    };

    Input.prototype = {
        events: [],
        waiting: false,
        pendingCommand: null,
        addEvent: function(event) {
            if (this.events.length < 3) this.events.unshift(event);
        },
        isReady: function() {
            return this.events.length > 0;
        },
        reset: function() {
            this.events = [];
        },
        nextInput: function() {
            return this.events.pop();
        },
        nextInputList: function() {
            return [this.pendingCommand, this.nextInput()];
        },
        toggleWaiting: function(command) {
            this.waiting = !this.waiting;
            if (command) {
                this.pendingCommand = command;
            } else {
                this.pendingCommand = null;
            }
        }
    };

    return Input;
});