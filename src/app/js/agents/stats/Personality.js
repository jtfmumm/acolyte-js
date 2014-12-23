define(function(require) {

    var Rand = require("js/utils/Rand");
    var Name = require("js/agents/names/Name");
    var Occupation = require("js/agents/occupations/Occupation");

    function Personality(options) {
        options = options || {};
        this.gender = Rand.rolledByOdds(0.5) ? "woman" : "man";
        this.name = Name.generateNameByGender(this.gender);
        this.occupation = options.occupation ? Occupation.getByGender(options.occupation, this.gender) : "drifter";
        this.friendly = Math.random();
        this.mystical = Math.random();
        this.dogmatic = Math.random();
        this.brave = Math.random();
        this.intelligent = Math.random();
    }

    Personality.prototype = {
        describe: function() {
            return this.name + " the " + this.occupation;
        }
    };

    return Personality;
});