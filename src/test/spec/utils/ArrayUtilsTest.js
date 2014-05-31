define(function(require) {
    var ArrayUtils = require("js/utils/ArrayUtils");
    var MatrixTest = require("../../testdata/MatrixTest");

    beforeEach(function() {
    });

    describe('ArrayUtils', function() {
        describe('flatJoin', function () {
            it('should return a string delimited according to options for rows and columns', function() {
                var arr = [["hi", "man", "cool"], ["this", "is", "nice"]];
                var flatArr = ArrayUtils.flatJoin(arr, ",", ";");

                expect(flatArr).toEqual("hi,man,cool;this,is,nice");
            });
        });

        describe('isEqual', function () {
            it('should determine that equal arrays are equal', function() {
                var arr1 = [1, 2, 3];
                var arr2 = [1, 2, 3];
                var arr3 = [2, 3, 4];
                expect(ArrayUtils.isEqual(arr1, arr2)).toBe(true);
                expect(ArrayUtils.isEqual(arr1, arr3)).toBe(false);
            });

            it('should determine that equal multidimensional arrays are equal', function() {
                var arr1 = [[1, 2, 3],[4, 5, 6]];
                var arr2 = [[1, 2, 3],[4, 5, 6]];
                var arr3 = [[1, 2, 3],[4, 3, 6]];
                var arr4 = ["hi"]
                expect(ArrayUtils.isEqual(arr1, arr2)).toBe(true);
                expect(ArrayUtils.isEqual(arr1, arr3)).toBe(false);
                expect(ArrayUtils.isEqual(arr1, arr4)).toBe(false);
            });
        });

        describe('nestedMap', function () {
            it('should return a 2D array with fn applied to all items', function() {
                var arr = [[1, 2, 3], [6, 7, 8]];
                var newArr = ArrayUtils.nestedMap(arr, function(x) { return x * 2; });
                expect(newArr).toEqual([[2, 4, 6], [12, 14, 16]]);
            });
        });

        describe('nestedForEach', function () {
            it('should apply a function to all members of 2D array', function() {
                var arr = [[{id: 1}, {id: 2}, {id: 3}], [{id: 6}, {id: 7}, {id: 8}]];
                ArrayUtils.nestedForEach(arr, function(obj) { obj.id = obj.id * 2; });
                expect(arr).toEqual([[{id: 2}, {id: 4}, {id: 6}], [{id: 12}, {id: 14}, {id: 16}]]);
            });
        });

        describe('getSubMatrix', function () {
            it('should get a sub matrix from a matrix', function() {
                var matrix = MatrixTest.fourByFour;
                var subMatrix = ArrayUtils.getSubMatrix(matrix, 0, 0, 3, 3);
                expect(subMatrix).toEqual([[1, 2, 3], [5, 6, 7], [9, 10, 11]]);
                var subMatrix = ArrayUtils.getSubMatrix(matrix, 1, 1, 2, 2);
                expect(subMatrix).toEqual([[6, 7], [10, 11]]);            
                var subMatrix = ArrayUtils.getSubMatrix(matrix, 2, 0, 2, 3);
                expect(subMatrix).toEqual([[3, 4], [7, 8], [11, 12]]);
            });
        });

        describe('copySubMatrix', function () {
            it('should copy a sub matrix into another matrix', function() {
                var oldM = MatrixTest.objects1;
                var newM = MatrixTest.objects2;
                ArrayUtils.copySubMatrix(oldM, newM, replaceId);
                expect(oldM).toEqual(newM);
            });
        });

        function replaceId(oldCell, newCell) { 
            oldCell.id = newCell.id; 
        }
    });
});