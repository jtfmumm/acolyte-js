define(function(require) {

    var _ = require("lodash");
    var Coords = require("js/utils/Coords");
    var Agent = require("js/agents/Agent");
    var MovementAlgs = require("js/movement/MovementAlgs");
    var PopulationGame = require("js/population/PopulationGame");
    var Rand = require("js/utils/Rand");
    var Self = require("js/self/Self");

    var monster = _.extend(Object.create(Agent.prototype), {
        act: function() {
            if (this.canAttack(Self.position)) {
                this.attack(Self.position);
            } else {
                this.approachTarget(Self.position);
            }
        },
        canAttack: function(target) {
            return this.position.isCardinalNeighbor(target);
        },
        attack: function(target) {
            this.level.attackAgent(this, this.position, target.minus(this.position));
        },
        approachTarget: function(target) {
            var xDiff = target.x - this.position.x;
            var yDiff = target.y - this.position.y;
            if (xDiff > 0 && yDiff > 0) {
                var roll = Rand.pickItem([new Coords(1, 0), new Coords(0, 1)]);
                this.move(roll);
            } else if (xDiff > 0 && yDiff < 0) {
                var roll = Rand.pickItem([new Coords(1, 0), new Coords(0, -1)]);
                this.move(roll);
            } else if (xDiff < 0 && yDiff > 0) {
                var roll = Rand.pickItem([new Coords(-1, 0), new Coords(0, 1)]);
                this.move(roll);
            } else if (xDiff < 0 && yDiff < 0) {
                var roll = Rand.pickItem([new Coords(-1, 0), new Coords(0, -1)]);
                this.move(roll);
            } else if (xDiff < 0) {
                this.move(new Coords(-1, 0));
            } else if (xDiff > 0) {
                this.move(new Coords(1, 0));
            } else if (yDiff < 0) {
                this.move(new Coords(0, -1));
            } else if (yDiff > 0) {
                this.move(new Coords(0, 1));
            }
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