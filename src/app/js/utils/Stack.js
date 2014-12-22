define(function(require) {

    var Stack = function() {
        this.top = null;
        this.count = 0;

        this.isEmpty = function() {
            return (this.count === 0);
        };

        this.size = function() {
            return this.count;
        };

        this.push = function(x) {
            this.count++;
            this.top = {
                data: x,
                next: this.top
            };
            return this.top;
        };

        this.pop = function() {
            if (!this.isEmpty()) {
                this.count--;
                var popTop = this.top;
                this.top = this.top.next;
                return popTop.data;
            } else return null;
        };

        this.peek = function() {
            if (!this.isEmpty()) {
                return this.top.data;
            } else return null;
        };
    };

    return Stack;
});