define(function(require) {

    var ComparatorHeap = require("js/utils/ComparatorHeap");
    var Path = require("js/movement/Path");

    var AstarPathfinder = {
        getShortestPath: getShortestPath,
        getShortestCardinalPath: getShortestCardinalPath
    };

    function Astar(startCoords, endCoords, regionMatrix, neighborsFunction) {
        this.startCoords = startCoords;
        this.endCoords = endCoords;
        this.regionMatrix = regionMatrix;
        this.neighborsFunction = neighborsFunction;
        this.visited = {};
        this.toVisit = new ComparatorHeap(function(a, b) {
            return a.estimatedCost < b.estimatedCost;
        });
        console.log(endCoords);
    }

    Astar.prototype = {
        getShortestPath: function() {
            var initialPath = new Path();
            var initialNode = new Node(this.startCoords, initialPath, this.startCoords.minDistanceTo(this.endCoords));

            return this._shortestPathFrom(initialNode);
        },
        _shortestPathFrom: function(node) {
            if (node.coords.isEqual(this.endCoords)) {
                return node.path;
            }

            var _this = this;

            var neighbors = node[this.neighborsFunction]().filter(function(coords) {
                return !_this._isImpenetrable(coords) && !_this._isVisited(coords);
            });
            neighbors.forEach(function(coords) {
                var path = node.clonePath().add(coords);
                var estimatedCost = node.getPathSize() + coords.minDistanceTo(_this.endCoords);
                _this.toVisit.insert(new Node(coords, path, estimatedCost));
            });

            this._markNodeAsVisited(node);

            if (this.toVisit.size()) {
                return this._shortestPathFrom(this.toVisit.pop());
            } else {
                //There's no path possible
                return false;
            }
        },
        _isVisited: function(coords) {
            return this.visited[coords.toString()];
        },
        _isImpenetrable: function(coords) {
            return this.regionMatrix.isImpenetrable(coords);
        },
        _markNodeAsVisited: function(node) {
            this.visited[node.toString()] = true;
        }
    };

    function Node(coords, path, estimatedCost) {
        this.coords = coords;
        this.path = path || new Path();
        this.estimatedCost = estimatedCost || Infinity;
    }

    Node.prototype = {
        getNeighbors: function() {
            return this.coords.getNeighbors();
        },
        getCardinalNeighbors: function() {
            return this.coords.getCardinalNeighbors();
        },
        getPathSize: function() {
            return this.path.size();
        },
        toString: function() {
            return this.coords.toString();
        },
        clonePath: function() {
            return this.path.clone();
        }
    };

    function getShortestPath(start, end, regionMatrix) {
        var astar = new Astar(start, end, regionMatrix, "getNeighbors");

        //This returns a Path object
        return astar.getShortestPath();
    }

    function getShortestCardinalPath(start, end, regionMatrix) {
        var astar = new Astar(start, end, regionMatrix, "getCardinalNeighbors");

        //This returns a Path object
        return astar.getShortestPath();
    }

    return AstarPathfinder;
});