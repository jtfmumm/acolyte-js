define(function(require) {

    var _ = require("lodash");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var PopulationGame = require("js/population/PopulationGame");
    var Rand = require("js/utils/Rand");

    var npc = _.extend(Object.create(Agent.prototype), {
        act: function() {
            var posChange = MovementAlgs.drunk();
            this.move(posChange);
        },
        describe: function() {
            return this.personality ? this.personality.describe() : "someone.";
        },
        talk: function() {
            console.log(this.socialAttitudes);
            return this.conversation ? this.conversation.talk() : "Hello, weird one.";
        },
        //Play round in population game
        playRound: function(population) {
            var target = Rand.pickItem(population);
            if (_.isEqual(target, this)) target = Rand.pickItem(population);
            var subject = Rand.pickItem(population);
            PopulationGame.playAtRandom(this, target, subject);
        },
        getSocialAttitude: function(target) {
            return this.socialAttitudes.getSocialAttitude(target);
        }
    });

    function npcMixin(extension) {
        return _.extend(Object.create(npc), extension);
    }

    return npcMixin;
});