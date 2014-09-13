define(function(require) {

    var ComparatorHeap = require("js/utils/ComparatorHeap");
    var WorldCoords = require("js/utils/WorldCoords");
    var Path = require("js/movement/Path");

    function Astar(startCoords, endCoords, regionMatrix) {
        this.startCoords = startCoords;
        this.endCoords = endCoords;
        this.regionMatrix = regionMatrix;
        this.visited = {};
        this.toVisit = new ComparatorHeap(function(a, b) {
            return a.estimatedCost < b.estimatedCost;
        });
    }

    Astar.prototype = {
        getShortestPath: function() {
            return this._shortestPath(new Node(this.startCoords, [this.startCoords], this.startCoords.minDistanceTo(this.endCoords)));
        },
        _shortestPath: function(node) {
            if (node.wCoords === this.endCoords) return node.path;

            var _this = this;

            var neighbors = node.getNeighbors().filter(function(wCoords) {
                return !this._isImpenetrable(wCoords) && !this._isVisited(wCoords);
            });
            neighbors.forEach(function(wCoords) {
                var path = node.clonePath().add(wCoords);
                var estimatedCost = node.getPathSize() + wCoords.minDistanceTo(_this.endCoords);
                _this.toVisit.insert(new Node(wCoords, path, estimatedCost));
            });

            this._markNodeAsVisited(node);

            if (this.toVisit.size()) {
                this.shortestPath(this.toVisit.pop());
            } else {
                //There's no path possible
                return false;
            }
        },
        _isVisited: function(wCoords) {
            return this.visited[wCoords.toString()];
        },
        _isImpenetrable: function(wCoords) {
            return this.regionMatrix._isImpenetrable(wCoords);
        },
        _markNodeAsVisited: function(node) {
            this.visited[node.toString()] = true;
        }
    };

    function Node(wCoords, path, estimatedCost) {
        this.wCoords = wCoords;
        this.path = path || new Path();
        this.estimatedCost = estimatedCost || Infinity;
    }

    Node.prototype = {
        getNeighbors: function() {
            return this.wCoords.getNeighbors();
        },
        getPathSize: function() {
            return this.path.size();
        },
        toString: function() {
            return this.wCoords.toString();
        },
        clonePath: function() {
            return this.path.clone();
        }
    };

    function getAstarShortestPath(start, end, regionMatrix) {
        var astar = new Astar(start, end, regionMatrix);

        //This returns a Path object
        return astar.getShortestPath();
    }

    return getAstarShortestPath;
});