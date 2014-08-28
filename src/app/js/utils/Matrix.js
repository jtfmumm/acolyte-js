define(function(require) {
    "use strict";

    function Matrix(matrix) {
        this.data = matrix || [];
    }
    Matrix.prototype.getWidth = function() {
        return (this.data[0]) ? this.data[0].length : 0;
    };
    Matrix.prototype.getHeight = function() {
        return this.data.length;
    };
    Matrix.prototype.getRow = function(row) {
        return this.data[row];
    };
    Matrix.prototype.getCell = function(column, row) {
        return this.data[row][column];
    };
    Matrix.prototype.flatJoin = function(delimiter, lineDelimiter) {
        var flattenedArr = this.data.map(function(subArr) {
            return subArr.join(delimiter);
        });
        return flattenedArr.join(lineDelimiter);
    };
    Matrix.prototype.map = function(fn) {
        var mapped = this.data.map(function(subArr) {
            return subArr.map(fn);
        });
        return new Matrix(mapped);
    };
    Matrix.prototype.isEqualRow = function(row, otherMatrix) {
        //This fails when comparing different objects with same content
        var i;
        if ((this.getRow(row) && !otherMatrix.getRow(row))
            || (!this.getRow(row) && otherMatrix.getRow(row))) return false;
        if (this.getWidth() !== otherMatrix.getWidth()) return false;
        for (i = 0; i < this.getWidth(); i++) {
            if (this.getCell(i, row) !== otherMatrix.getCell(i, row)) return false;
        }
        return true;
    };
    Matrix.prototype.isEqual = function(otherMatrix) {
        var i;
        if (this.getHeight() !== otherMatrix.getHeight()) return false;
        for (i = 0; i < this.getHeight(); i++) {
            if (!this.isEqualRow(i, otherMatrix)) return false;
        }
        return true;
    };
    Matrix.prototype.forEach = function(fn) {
        this.data.forEach(function(subArr) {
            subArr.forEach(fn);
        });
    };
    Matrix.prototype.getSubMatrix = function(x, y, width, height) {
        var i, j;
        var matrix = this.data;
        var subMatrix = [];
        var lastY = y + height;
        var lastX = x + width;
        for (i = y; i < lastY; i++) {
            subMatrix.push([]);
            for (j = x; j < lastX; j++) {
                subMatrix[i - y].push(matrix[i][j]);
            }
        }
        return new Matrix(subMatrix);
    };
    Matrix.prototype.getSubMatrixByCoords = function(topX, topY, bottomX, bottomY) {
        var width = bottomX - topX + 1;
        var height = bottomY - topY + 1;
        return this.getSubMatrix(topX, topY, width, height);
    };
    Matrix.prototype.getBoundaryByDirection = function(direction) {
        switch (direction) {
            case "north":
                return this.getNorthBoundary();
            case "south":
                return this.getSouthBoundary();
            case "west":
                return this.getWestBoundary();
            case "east":
                return this.getEastBoundary();   
            default:
                throw new Error("getBoundaryByDirection requires a direction!");             
        }
    };
    Matrix.prototype.getNorthBoundary = function() {
        return this.getSubMatrix(0, 0, this.getWidth() - 1, 1);
    };
    Matrix.prototype.getSouthBoundary = function() {
        var last = this.getHeight() - 1;
        return this.getSubMatrix(0, last, this.getWidth() - 1, 1);
    };
    Matrix.prototype.getWestBoundary = function() {
        return this.getSubMatrix(0, 0, 1, this.getHeight() - 1);
    };
    Matrix.prototype.getEastBoundary = function() {
        var last = this.getWidth() - 1;
        return this.getSubMatrix(last, 0, 1, this.getHeight() - 1);
    };

    //Static methods
    Matrix.copyObjectsWith =function(oldSubMatrix, newSubMatrix, copyFn) {
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
    Matrix.copyValues =function(oldSubMatrix, newSubMatrix) {
        var i, j;
        var width = oldSubMatrix.getWidth();
        var height = oldSubMatrix.getHeight();
        if (width !== newSubMatrix.getWidth() || height !== newSubMatrix.getHeight()) 
            throw new Error("Copy failure: Matrices are incongruent sizes.");
        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                oldSubMatrix.getCell(j, i) = newSubMatrix.getCell(j, i);
            }
        }
    };

    return Matrix;
})