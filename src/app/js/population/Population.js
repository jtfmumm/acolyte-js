define(function(require) {

    function Population() {
        this.people = [];
    }

    Population.prototype = {
        add: function(person) {
            this.people.push(person);
        },
        remove: function(person) {
            var idx = this.people.indexOf(person);
            if (idx !== -1) this.people.splice(idx, 1);
        },
        playRound: function() {
            var _this = this;
            this.people.forEach(function(person) {
                person.playRound(_this.people);
            });
        }
    };

    return Population;
});