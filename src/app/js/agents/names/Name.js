define(function(require) {

    var WomenNames = require("js/agents/names/WomenNames");
    var MenNames = require("js/agents/names/MenNames");
    var Rand = require("js/utils/Rand");

    var Name = {
        generateNameByGender: function(gender) {
            if (gender === "woman") {
                return Rand.pickItem(WomenNames);
            } else {
                return Rand.pickItem(MenNames);
            }
        }
    };

    return Name;
});