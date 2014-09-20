define(function(require) {

    var Uid = {
        makeGenerator: function() {
            var initialId = 0;
            return function() {
                return initialId++;
            }
        }
    };

    return Uid;
});