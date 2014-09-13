define(function(require) {

    var ComparatorHeap = function(comparator) {
        this.comparator = comparator || function(a, b) {
            return a < b;
        };
        this.data = [];
    };

    ComparatorHeap.prototype = {
        _getParent: function(idx) {
            return Math.floor((idx - 1) / 2);
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
            var swap, smallerChild;
            var root = 1;
            var leftChild = this._getLeftChild(root);
            var rightChild = this._getRightChild(root);
            while (true) {
                smallerChild = (this.comparator(this.data[leftChild], this.data[rightChild])) ? leftChild : rightChild;
                if (this.comparator(this.data[smallerChild], this.data[root])) {
                    swap = this.data[smallerChild];
                    this.data[smallerChild] = this.data[root];
                    this.data[root] = swap;
                    root = smallerChild;
                    leftChild = this._getLeftChild(root);
                    rightChild = this._getRightChild(root);
                } else break;
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
