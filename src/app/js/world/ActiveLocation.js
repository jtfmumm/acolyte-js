define(function(require) {

    var ActiveLocation = {
        location: null,
        add: function(location) {
            this.location = location;
        },
        remove: function(location) {
            this.location = null;
        },
        playPopulationGame: function() {
            if (this.location) this.location.playPopulationGame();
        }
    };

    return ActiveLocation;
});

