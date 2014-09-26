define(function(require) {

    var Calendar = {
        ticks: 0,
        getTime: function() {
            return this.ticks;
        },
        addTick: function() {
            this.ticks++;
        }
    };

    return Calendar;
});