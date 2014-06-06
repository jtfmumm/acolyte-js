define(function(require) {
    var Coords = require("js/utils/Coords");

    beforeEach(function() {
    });

    var c = new Coords(3, 4);
    console.log(c instanceof Coords);

    describe('Coords', function() {
        describe('plus', function () {
            it('should add coords to input coords', function() {
                var c = new Coords(3, 4);
                var d = new Coords(5, 6); 
                expect(c.plus(d)).toEqual(new Coords(8, 10));
                expect(c.plus(2, 2)).toEqual(new Coords(5, 6));
            });
        });

        describe('minus', function () {
            it('should subtract input coords from coords', function() {
                var c = new Coords(10, 11);
                var d = new Coords(5, 6); 
                expect(c.minus(d)).toEqual(new Coords(5, 5));
                expect(c.minus(2, 2)).toEqual(new Coords(8, 9));
            });
        });

        describe('isEqual', function () {
            it('should check for equality with input coords', function() {
                var c = new Coords(3, 4);
                var d = new Coords(3, 4);
                var e = new Coords(5, 6); 
                expect(c.isEqual(d)).toBe(true);
                expect(c.isEqual(e)).toBe(false);
                expect(c.isEqual(3, 4)).toBe(true);
            });
        });

        describe('positiveOffsetGiven', function () {
            it('should check if coords are up or left from input, returning positive offset', function() {
                var c = new Coords(3, 4);
                var d = new Coords(5, 7);
                var e = new Coords(3, 6); 
                var f = new Coords(2, 2); 
                expect(c.positiveOffsetGiven(d)).toEqual(new Coords(2, 3));
                expect(c.positiveOffsetGiven(e)).toEqual(new Coords(0, 2));
                expect(c.positiveOffsetGiven(f)).toEqual(new Coords(0, 0));
                expect(c.positiveOffsetGiven(5, 7)).toEqual(new Coords(2, 3));
            });
        });

        describe('negativeOffsetGiven', function () {
            it('should check if coords are up or left from input, returning positive offset', function() {
                var c = new Coords(3, 4);
                var d = new Coords(5, 3);
                var e = new Coords(3, 6); 
                var f = new Coords(2, 2); 
                expect(c.negativeOffsetGiven(d)).toEqual(new Coords(0, -1));
                expect(c.negativeOffsetGiven(e)).toEqual(new Coords(0, 0));
                expect(c.negativeOffsetGiven(f)).toEqual(new Coords(-1, -2));
                expect(c.negativeOffsetGiven(2, 2)).toEqual(new Coords(-1, -2));
            });
        });    });
});