define(function(require) {

    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var PopulationGame = require("js/population/PopulationGame");
    var Rand = require("js/utils/Rand");

    var monster = _.extend(Object.create(Agent.prototype), {
        act: function() {
            var posChange = MovementAlgs.drunk();
            this.move(posChange);
        },
        describe: function() {
            return this.type;
        },
        talk: function() {
            return this.describe() + ": ..."; //this.conversation ? this.conversation.talk() : "Hello, weird one.";
        }
    });

    function monsterMixin(extension) {
        return _.extend(Object.create(monster), extension);
    }

    return monsterMixin;
});