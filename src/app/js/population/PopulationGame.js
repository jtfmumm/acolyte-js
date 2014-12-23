define(function(require) {

    var Rand = require("js/utils/Rand");

    //This is the game played by the population of a village/town/etc.
    //by which they build reputations and interact with each other.
    var PopulationGame = {
        moves: ["socialize", "gossip", "praise", "manipulate"],
        playAtRandom: function(actor, target, subject) {
            this[Rand.pickItem(this.moves)](actor, target, subject);
        },
        socialize: function(actor, target) {
            actor.getSocialAttitude(target).updateLikeBy(1);
            target.getSocialAttitude(actor).updateLikeBy(1);
        },
        gossip: function(actor, target, subject) {
            target.getSocialAttitude(subject).updateLikeBy(-2);
            target.getSocialAttitude(actor).updateLikeBy(-1);
        },
        praise: function(actor, target, subject) {
            target.getSocialAttitude(subject).updateLikeBy(2);
            target.getSocialAttitude(actor).updateLikeBy(1);
        },
        manipulate: function(actor, target) {
            actor.getSocialAttitude(target).updateLikeBy(-1);
            target.getSocialAttitude(actor).updateLikeBy(1);
        }
    };

    return PopulationGame;
});