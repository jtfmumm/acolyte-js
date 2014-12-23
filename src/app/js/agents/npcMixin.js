define(function(require) {

    var _ = require("lodash");

    function npcMixin(prot) {
        return _.extend(prot, {
            talk: function() {
                return "Good day to you, weirdo sir!";
            },
        });
    }

    return npcMixin;
});