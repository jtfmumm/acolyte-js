define(function(require) {

    var Input = function() {
    };

    Input.prototype = {
        events: [],
        addEvent: function(event) {
            if (this.events.length < 11) this.events.unshift(event);
        },
        isReady: function() {
            return this.events.length > 0;
        },
        reset: function() {
            this.events = [];
        },
        nextInput: function() {
            return this.events.pop();
        }
    };

    return Input;
});