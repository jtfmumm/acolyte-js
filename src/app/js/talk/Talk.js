define(function(require) {

    var Console = require("js/screens/Console");

    var Talk = {
        talkTo: function(agent) {
            if (agent) Console.msg(agent.talk());
        }
    };

    return Talk;
});