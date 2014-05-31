define(function(require) {

    var Input = {
        events: [],
        addEvent: function(event) {
            this.events.unshift(event);
        },
        reset: function() {
            this.events = [];
        },
        nextInput: function() {
            return this.events.pop();
        }
    }

    return Input;
});