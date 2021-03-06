define(function(require) {
    "use strict";

    function Matrix(matrix) {
        this.data = matrix || [];
    }
    
    Matrix.prototype = {
        init: function(width, height, cellFn) {
            var newData = [];
            for (var i = 0; i < height; i++) {
                newData.push(Array(width));
            }
            this.data = newData;
            if (cellFn) this._initCellsWithFunction(cellFn);
            return this;
        },
        _initCellsWithFunction: function(cellFn) {
            for (var y = 0; y < this.getHeight(); y++) {
                for (var x = 0; x < this.getWidth(); x++) {
                    this.setCell(x, y, cellFn());
                }
            }
        },
        getWidth: function() {
            return (this.data[0]) ? this.data[0].length : 0;
        },
        getHeight: function() {
            return this.data.length;
        },
        getRow: function(row) {
            return this.data[row];
        },
        getCell: function(column, row) {
            if (this.isWithinMatrix(row, column)) {
                return this.data[row][column];
            } else {
                return undefined;
            }
        },
        setCell: function(column, row, val) {
            if (this.isWithinMatrix(row, column)) {
                this.data[row][column] = val;
            }
        },
        getMatrix: function() {
            return this.data;
        },
        getCenterX: function() {
            return Math.floor(this.getHeight() / 2);
        },
        getCenterY: function() {
            return Math.floor(this.getWidth() / 2);
        },
        flatJoin: function(delimiter, lineDelimiter) {
            var flattenedArr = this.data.map(function(subArr) {
                return subArr.join(delimiter);
            });
            return flattenedArr.join(lineDelimiter);
        },
        map: function(fn) {
            var mapped = this.data.map(function(subArr) {
                return subArr.map(fn);
            });
            return new Matrix(mapped);
        },
        unfold: function() {
            var unfoldedArray = [];
            this.forEach(function(cell) {
                unfoldedArray.push(cell);
            });
            return unfoldedArray;
        },
        every: function(fn) {
            return this.unfold().every(fn);
        },
        isWithinMatrix: function(row, column) {
            return row >= 0 && column >= 0 && row < this.getHeight() && column < this.getWidth();
        },
        isEqualRow: function(row, otherMatrix) {
            //This fails when comparing different objects with same content
            var i;
            if ((this.getRow(row) && !otherMatrix.getRow(row))
                || (!this.getRow(row) && otherMatrix.getRow(row))) return false;
            if (this.getWidth() !== otherMatrix.getWidth()) return false;
            for (i = 0; i < this.getWidth(); i++) {
                if (this.getCell(i, row) !== otherMatrix.getCell(i, row)) return false;
            }
            return true;
        },
        isEqual: function(otherMatrix) {
            var i;
            if (this.getHeight() !== otherMatrix.getHeight()) return false;
            for (i = 0; i < this.getHeight(); i++) {
                if (!this.isEqualRow(i, otherMatrix)) return false;
            }
            return true;
        },
        hasSameDimensions: function(otherMatrix) {
            return this.getWidth() === otherMatrix.getWidth() && this.getHeight() === otherMatrix.getHeight();
        },
        forEach: function(fn) {
            this.data.forEach(function(subArr) {
                subArr.forEach(fn);
            });
        },
        getSubMatrix: function(x, y, width, height) {
            var subMatrix = [];
            var lastY = y + height;
            var lastX = x + width;
            for (var currY = y; currY < lastY; currY++) {
                subMatrix.push([]);
                for (var currX = x; currX < lastX; currX++) {
                    subMatrix[currY - y].push(this.getCell(currX, currY));
                }
            }
            return new Matrix(subMatrix);
        },
        getSubMatrixByCoords: function(topX, topY, bottomX, bottomY) {
            var width = bottomX - topX + 1;
            var height = bottomY - topY + 1;
            return this.getSubMatrix(topX, topY, width, height);
        },
        setEdges: function(value) {
            var i,
                firstRow = this.data[0],
                lastRow = this.data[this.data.length - 1];

            //Set top and bottom edges
            for (i = 0; i < firstRow.length; i++) {
                firstRow[i] = value;
                lastRow[i] = value;
            }
            //Set left and right edges
            for (i = 0; i < this.data.length; i++) {
                this.data[i][0] = value;
                this.data[i][this.data.length - 1] = value;
            }
        },
        setInternalBorder: function(value, diameter) {
            diameter = diameter + 2;
            var radius = Math.floor(diameter / 2);
            var originX = this.getCenterX() - radius;
            var targetX = this.getCenterX() + radius;
            var originY = this.getCenterY() - radius;
            var targetY = this.getCenterY() + radius;

            //Set top and bottom edges
            for (var x = originX; x <= targetX; x++) {
                this.setCell(x, originY, value);
                this.setCell(x, targetY, value);
            }
            //Set left and right edges
            for (var y = originY; y <= targetY; y++) {
                this.setCell(originX, y, value);
                this.setCell(targetX, y, value);
            }
        },
        getSubMatrixByDirectionFrom: function(direction, column, row) {
            switch(direction) {
                case "northwest":
                    return this.getSubMatrixByCoords(0, 0, column, row);
                case "northeast":
                    return this.getSubMatrixByCoords(column, 0, this.getWidth() - 1, row);
                case "southwest":
                    return this.getSubMatrixByCoords(0, row, column, this.getHeight() - 1);
                case "southeast":
                    return this.getSubMatrixByCoords(column, row, this.getWidth() - 1, this.getHeight() - 1);
                default:
                    throw new Error("Matrix: Invalid direction");
            }
        }
    };

    //Static methods
    Matrix.copyObjectsWith = function(oldSubMatrix, newSubMatrix, copyFn) {
        var i, j;
        var width = oldSubMatrix.getWidth();
        var height = oldSubMatrix.getHeight();
        if (width !== newSubMatrix.getWidth() || height !== newSubMatrix.getHeight()) 
            throw new Error("Copy failure: Matrices are incongruent sizes.");
        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                copyFn(oldSubMatrix.getCell(j, i), newSubMatrix.getCell(j, i));
            }
        }
    };
    Matrix.concatHorizontal = function(matrix, otherMatrix) {
        var concated = [];
        for (var i = 0; i < matrix.getHeight(); i++) {
            concated.push(matrix.getRow(i).concat(otherMatrix.getRow(i)));
        }
        return new Matrix(concated);
    };
    Matrix.concatVertical = function(matrix, otherMatrix) {
        var concated = matrix.getMatrix().concat(otherMatrix.getMatrix());
        return new Matrix(concated);
    };

    return Matrix;
});