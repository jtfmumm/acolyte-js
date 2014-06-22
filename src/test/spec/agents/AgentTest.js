define(function(require) {
    require("jasmine-fixture");
    require("jasmine-jquery");
    var Agent = require("js/agents/Agent");

    beforeEach(function() {
        ActiveAgents.clearAll();
    });

    describe('Agent', function () {
        it('should exist', function() {
            expect(Agent).not.toBeUndefined();
        }); 

        xdescribe('addAgent', function() {
            it('adds to waitList queue', function() {
                var newAgent = {};
  
            });
        });

         
    });


});