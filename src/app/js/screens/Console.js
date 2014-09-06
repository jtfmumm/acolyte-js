define(function(require) {



    var Console = {
        stats: {
        },
        messages: [],
        msg: function(text) {
            this.messages.push(text);
            if (this.messages.length > 10) this.messages.shift();
        },
        display: function(display) {
            var content = this.statsToArray().concat(this.messages);
            display.renderConsole(content);
        },
        updateStat: function(k, v) {
            this.stats[k] = v;
        },
        statsToArray: function() {
            var arr = [];
            for (var prop in this.stats) {
                arr.push(prop + ": " + this.stats[prop]);
            }
            return arr;
        }
    };

    return Console;
});