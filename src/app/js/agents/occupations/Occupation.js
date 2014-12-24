define(function(require) {

    var occupations = require("js/agents/occupations/occupations");
    var Rand = require("js/utils/Rand");

    var Occupation = {
        getByGender: function(occupation, gender) {
            return occupations[occupation][gender];
        },
        generateByLocationType: function(locationType) {
            return Rand.pickItem(occupations[locationType]);
        }
    };

    return Occupation;
});