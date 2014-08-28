define(function(require) {
    require("jasmine-fixture");
    require("jasmine-jquery");
    var HTMLDisplay = require("js/displays/HTMLDisplay");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");
    var Matrix = require("js/utils/Matrix");

    var $hangar = null;
    var display = new HTMLDisplay();

    beforeEach(function() {
        $hangar = affix("#display");
    });

    describe('HTMLDisplay', function () {
        it('should exist', function() {
            expect(HTMLDisplay).not.toBeUndefined();
        }); 

        it('should display a map from a 2D array of object codes', function() {
            var map = new Matrix([["self", "wall", "palm"],["self", "wall", "palm"]]);
            display.renderMap(map);
            console.log($hangar[0]);

            expect($hangar).toContainHtml(HTMLCodeTable["self"] + HTMLCodeTable["wall"] + HTMLCodeTable["palm"] + "<br>" + HTMLCodeTable["self"] + HTMLCodeTable["wall"] + HTMLCodeTable["palm"]);
        });
    });


});