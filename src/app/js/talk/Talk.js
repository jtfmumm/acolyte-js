define(function(require) {

    var Console = require("js/screens/Console");

    var Talk = {
        talkTo: function(agent) {
            if (agent) {
                Console.msg(agent.talk());
            } else {
                Console.msg("There is no one to talk to there!");
            }
        }
    };

    return Talk;
});