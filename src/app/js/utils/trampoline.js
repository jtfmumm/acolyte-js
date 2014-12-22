define(function(require) {
    var _ = require("lodash");

    var trampoline = function(fun /*, args */) {
        var result = fun.apply(fun, _.rest(arguments));

        while (_.isFunction(result)) {
            result = result();
        }

        return result;
    };

    return trampoline;
});