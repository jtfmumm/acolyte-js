define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var screenTemplate = require("text!static/templates/screen.html");

    function Screen() {

    }
    Screen.prototype.render = function() {
        var view = mustache.render(screenTemplate, view);
        $("body").append(view);
        console.log(view);
    }

    return Screen;
});