define(function(require) {

    var ComparatorHeap = function(comparator) {
        this.comparator = comparator || function(a, b) {
            return a < b;
        };
        this.data = [];
    };

    ComparatorHeap.prototype = {
        _getParent: function(idx) {
            if (idx === 0) {
                return 0;
            } else {
                return Math.floor((idx - 1) / 2);
            }
        },
        _getLeftChild: function(idx) {
            return idx * 2 + 1;
        },
        _getRightChild: function(idx) {
            return idx * 2 + 2;
        },
        _bubbleUp: function(idx) {
            var parent = this._getParent(idx);
            while (true) {
                if (this.comparator(this.data[idx], this.data[parent])) {
                    var swap = this.data[parent];
                    this.data[parent] = this.data[idx];
                    this.data[idx] = swap;
                    idx = parent;
                    parent = this._getParent(idx);
                } else break;
            }
        },
        _bubbleDown: function() {
            var swap, smallerChildIdx;
            var rootIdx = 0;
            var leftChildIdx = this._getLeftChild(rootIdx);
            var rightChildIdx = this._getRightChild(rootIdx);
            while (true) {
                smallerChildIdx = this._getSmallerChild(leftChildIdx, rightChildIdx);
                if (this.data[smallerChildIdx] && this.comparator(this.data[smallerChildIdx], this.data[rootIdx])) {
                    swap = this.data[smallerChildIdx];
                    this.data[smallerChildIdx] = this.data[rootIdx];
                    this.data[rootIdx] = swap;
                    rootIdx = smallerChildIdx;
                    leftChildIdx = this._getLeftChild(rootIdx);
                    rightChildIdx = this._getRightChild(rootIdx);
                } else break;
            }
        },
        _getSmallerChild: function(leftIdx, rightIdx) {
            if (this.data[leftIdx] && this.data[rightIdx]) {
                return this.comparator(this.data[leftIdx], this.data[rightIdx]) ? leftIdx : rightIdx;
            } else if (this.data[leftIdx]) {
                return leftIdx;
            } else if (this.data[rightIdx]) {
                return rightIdx;
            } else {
                return false;
            }
        },
        insert: function(val) {
            this.data.push(val);
            var idx = this.data.length - 1;
            this._bubbleUp(idx);
        },
        peek: function() {
            return this.data[0];
        },
        pop: function() {
            var min = this.data[0];
            if (this.data.length > 1) {
                this.data[0] = this.data.pop();
                this._bubbleDown();
            } else this.data.pop();
            return min;
        },
        size: function() {
            return this.data.length;
        }
    };

    return ComparatorHeap;
});
