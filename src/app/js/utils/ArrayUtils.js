define(function(require) {
    "use strict";

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

    function clone(arr) {
        return arr.slice(0);
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