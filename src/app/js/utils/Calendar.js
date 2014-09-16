define(function(require) {

    var Calendar = {
        ticks: 0,
        getTicks: function() {
            return this.ticks;
        },
        addTick: function() {
            this.ticks++;
        }
    };

    return Calendar;
});