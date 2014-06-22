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

        describe('plus and minus', function () {
            it('can be chained', function() {
                var c = new Coords(10, 11);
                var d = new Coords(5, 6);
                var e = new Coords(1, 1); 
                expect(c.minus(d).plus(e)).toEqual(new Coords(6, 6));
                expect(c.plus(3, 3).minus(2, 2)).toEqual(new Coords(11, 12));
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
        });    

        describe('offsetGiven', function () {
            it('should check if coords are out of box, returning appropriate offset', function() {
                var c = new Coords(3, 4);
                var d = new Coords(16, 30);
                var e = new Coords(3, 6); 
                var f = new Coords(2, 2); 
                expect(c.offsetGiven(10, 20, 20)).toEqual(new Coords(10, 10));
                expect(d.offsetGiven(15, 40, 40)).toEqual(new Coords(16, 25));
                expect(e.offsetGiven(15, 40, 40)).toEqual(new Coords(15, 15));
            });
        });

        describe('directionTo', function () {
            it('returns direction to coord passed in', function() {
                var c = new Coords(4, 4);
                var e = new Coords(5, 4);
                var w = new Coords(3, 4); 
                var n = new Coords(4, 2);
                var nw = new Coords(1, 1); 
                var ne = new Coords(10, 2);
                var s = new Coords(4, 30);
                var sw = new Coords(3, 6); 
                var se = new Coords(8, 10); 
                expect(c.directionTo(e)).toEqual("east");
                expect(c.directionTo(w)).toEqual("west");
                expect(c.directionTo(n)).toEqual("north");
                expect(c.directionTo(s)).toEqual("south");
                expect(c.directionTo(ne)).toEqual("northeast");
                expect(c.directionTo(nw)).toEqual("northwest");
                expect(c.directionTo(se)).toEqual("southeast");
                expect(c.directionTo(sw)).toEqual("southwest");
            });
        });    

        describe('directionFrom', function () {
            it('returns direction from coord passed in', function() {
                var c = new Coords(4, 4);
                var e = new Coords(5, 4);
                var w = new Coords(3, 4); 
                var n = new Coords(4, 2);
                var nw = new Coords(1, 1); 
                var ne = new Coords(10, 2);
                var s = new Coords(4, 30);
                var sw = new Coords(3, 6); 
                var se = new Coords(8, 10); 
                expect(c.directionFrom(e)).toEqual("west");
                expect(c.directionFrom(w)).toEqual("east");
                expect(c.directionFrom(n)).toEqual("south");
                expect(c.directionFrom(s)).toEqual("north");
                expect(c.directionFrom(ne)).toEqual("southwest");
                expect(c.directionFrom(nw)).toEqual("southeast");
                expect(c.directionFrom(se)).toEqual("northwest");
                expect(c.directionFrom(sw)).toEqual("northeast");
            });
        });     });
});