define(function(require) {

    var occupations = require("js/agents/occupations/occupations");

    var Occupation = {
        getByGender: function(occupation, gender) {
            return occupations[occupation][gender];
        }
    };

    return Occupation;
});