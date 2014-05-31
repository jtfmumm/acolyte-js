define(function(require) {
    function flatJoin(arr, delimiter, lineDelimiter) {
        var flattenedArr = arr.map(function(subArr) {
            return subArr.join(delimiter);
        });
        return flattenedArr.join(lineDelimiter);
    }

    function nestedMap(arr, fn) {
        return arr.map(function(subArr) {
            return subArr.map(fn);
        });
    }

    function isEqual(arr1, arr2) {
        var i;
        if (arr1.length !== arr2.length) return false;
        for (i = 0; i < arr1.length; i++) { 
            if (Array.isArray(arr1[i])) {
                if (!Array.isArray(arr2[i])) return false;
                if (!isEqual(arr1[i], arr2[i])) return false;
                continue;
            }
            if (arr1[i] !== arr2[i]) return false; 
        }
        return true;
    }

    function nestedForEach(arr, fn) {
        arr.forEach(function(subArr) {
            subArr.forEach(fn);
        });
    }

    function getSubMatrix(matrix, x, y, width, height) {
        var i, j;
        var subMatrix = [];
        var lastY = y + height;
        var lastX = x + width;
        for (i = y; i < lastY; i++) {
            subMatrix.push([]);
            for (j = x; j < lastX; j++) {
                subMatrix[i - y].push(matrix[i][j]);
            }
        }
        console.log(subMatrix[0].length, subMatrix.length);
        return subMatrix;
    }

    function copySubMatrix(oldSubMatrix, newSubMatrix, copyFn) {
        var i, j;
        var width = oldSubMatrix[0].length;
        var height = oldSubMatrix.length;
        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                copyFn(oldSubMatrix[j][i], newSubMatrix[j][i]);
            }
        }
    }

    return {
        flatJoin: flatJoin,
        nestedMap: nestedMap,
        nestedForEach: nestedForEach,
        isEqual: isEqual,
        getSubMatrix: getSubMatrix,
        copySubMatrix: copySubMatrix,
    }
})