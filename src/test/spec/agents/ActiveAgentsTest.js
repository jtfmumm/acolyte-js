define(function(require) {
    require("jasmine-fixture");
    require("jasmine-jquery");
    var ActiveAgents = require("js/agents/ActiveAgents");

    beforeEach(function() {
        ActiveAgents.clearAll();
    });

    describe('ActiveAgents', function () {
        it('should exist', function() {
            expect(ActiveAgents).not.toBeUndefined();
        }); 

        describe('addAgent', function() {
            it('adds to waitList queue', function() {
                var newAgent = {};
                var newAgent2 = {};
                ActiveAgents.addAgent(newAgent);
                ActiveAgents.addAgent(newAgent2);
                expect(ActiveAgents.waitList[0]).toBe(newAgent2);
                expect(ActiveAgents.waitList[1]).toBe(newAgent);
            });
        });

        describe('moveToActive', function() {
            it('moves all active waitList agents to front of activeList queue', function() {
                var agent1 = {name: 1, isActive: function() { return true; } };
                var agent2 = {name: 2, isActive: function() { return true; } };
                var agent3 = {name: 3, isActive: function() { return false; } };
                var agent4 = {name: 4, isActive: function() { return true; } };
                ActiveAgents.addAgent(agent1);
                ActiveAgents.addAgent(agent2);
                ActiveAgents.addAgent(agent3);
                ActiveAgents.addAgent(agent4);
                ActiveAgents.moveToActive();
                expect(ActiveAgents.activeList[0]).toBe(agent4);
                expect(ActiveAgents.activeList[1]).toBe(agent2);
                expect(ActiveAgents.activeList[2]).toBe(agent1);
            });
        });

        describe('processActiveList', function() {
            it('processes all activeList agents, pushes them to waitList, and clears activeList', function() {
                var agent1 = {act: function() {}, name: 1, isActive: function() { return true; } };
                var agent2 = {act: function() {}, name: 2, isActive: function() { return true; } };
                var agent3 = {act: function() {}, name: 3, isActive: function() { return false; } };
                var agent4 = {act: function() {}, name: 4, isActive: function() { return true; } };
                ActiveAgents.addAgent(agent1);
                ActiveAgents.addAgent(agent2);
                ActiveAgents.addAgent(agent3);
                ActiveAgents.addAgent(agent4);
                ActiveAgents.moveToActive();
                ActiveAgents.processActiveList();
                expect(ActiveAgents.waitList[2]).toBe(agent4);
                expect(ActiveAgents.waitList[1]).toBe(agent2);
                expect(ActiveAgents.waitList[0]).toBe(agent1);
                expect(ActiveAgents.activeList[0]).toBeUndefined();
            });
        });
         
    });


});