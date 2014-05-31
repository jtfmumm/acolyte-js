define(function(require) {

    var Input = {
        events: [],
        addEvent: function(event) {
            if (this.events.length < 11) this.events.unshift(event);
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