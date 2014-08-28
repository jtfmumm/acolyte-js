define(function(require) {
    var Matrix = require("js/utils/Matrix");
    var MatrixTest = require("../../testdata/MatrixTest");

    beforeEach(function() {
    });

    describe('Matrix', function() {
        describe('flatJoin', function () {
            it('should return a string delimited according to options for rows and columns', function() {
                var m = new Matrix([["hi", "man", "cool"], ["this", "is", "nice"]]);
                var flat = m.flatJoin(",", ";");

                expect(flat).toEqual("hi,man,cool;this,is,nice");
            });
        });

        describe('isEqual', function () {
            it('should determine that a matrix is equal to another', function() {
                var m1 = new Matrix([[1, 2, 3],[4, 5, 6]]);
                var m2 = new Matrix([[1, 2, 3],[4, 5, 6]]);
                var m3 = new Matrix([[1, 2, 3],[4, 3, 6]]);
                var m4 = new Matrix(["hi"]);
                expect(m1.isEqual(m2)).toBe(true);
                expect(m1.isEqual(m3)).toBe(false);
                expect(m1.isEqual(m4)).toBe(false);
            });
        });

        describe('map', function () {
            it('should return a 2D array with fn applied to all items', function() {
                var m = new Matrix([[1, 2, 3], [6, 7, 8]]);
                var newArr = m.map(function(x) { return x * 2; });
                expect(newArr).toEqual(new Matrix([[2, 4, 6], [12, 14, 16]]));
            });
        });

        describe('forEach', function () {
            it('should apply a function to all members of 2D array', function() {
                var m = new Matrix([[{id: 1}, {id: 2}, {id: 3}], [{id: 6}, {id: 7}, {id: 8}]]);
                m.forEach(function(obj) { obj.id = obj.id * 2; });
                expect(m).toEqual(new Matrix([[{id: 2}, {id: 4}, {id: 6}], [{id: 12}, {id: 14}, {id: 16}]]));
            });
        });

        describe('getSubMatrix', function () {
            it('should get a sub matrix from a matrix', function() {
                var m = new Matrix(MatrixTest.fourByFour);
                var subMatrix = m.getSubMatrix(0, 0, 3, 3);
                expect(subMatrix).toEqual(new Matrix([[1, 2, 3], [5, 6, 7], [9, 10, 11]]));
                var subMatrix = m.getSubMatrix(1, 1, 2, 2);
                expect(subMatrix).toEqual(new Matrix([[6, 7], [10, 11]]));            
                var subMatrix = m.getSubMatrix(2, 0, 2, 3);
                expect(subMatrix).toEqual(new Matrix([[3, 4], [7, 8], [11, 12]]));
            });
        });

        describe('copyObjectsWith', function () {
            it('should copy a sub matrix into another matrix', function() {
                var oldM = new Matrix(MatrixTest.objects1);
                var newM = new Matrix(MatrixTest.objects2);
                Matrix.copyObjectsWith(oldM, newM, replaceId);
                expect(oldM).toEqual(newM);
            });
        });

        function replaceId(oldCell, newCell) { 
            oldCell.id = newCell.id; 
        }
    });
});