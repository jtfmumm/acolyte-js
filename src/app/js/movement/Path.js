define(function(require) {

    function Path(steps) {
        this.steps = steps || [];
    }

    Path.prototype = {
        next: function() {
            return this.steps.shift();
        },
        add: function(step) {
            this.steps.push(step);
            return this;
        },
        clone: function() {
            return new Path(this.steps.slice(0));
        },
        size: function() {
            return this.steps.length;
        },
        forEach: function(fn) {
            for (var i = 0; i < this.steps.length; i++) {
                fn(this.next());
            }
        },
        toArray: function() {
            return this.steps;
        }
    };

    return Path;
});