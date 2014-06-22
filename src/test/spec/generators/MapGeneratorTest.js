define(function(require) {
    var ArrayUtils = require("js/utils/ArrayUtils");

    beforeEach(function() {
    });

    describe('flatJoin', function () {
        it('should return a string delimited according to options for rows and columns', function() {
            var arr = [["hi", "man", "cool"], ["this", "is", "nice"]];
            var flatArr = ArrayUtils.flatJoin(arr, ",", ";");

            expect(flatArr).toEqual("hi,man,cool;this,is,nice");
        });
    });
});