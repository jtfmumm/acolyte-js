define(function(require) {

    var ComparatorHeap = require("js/utils/ComparatorHeap");
    var Path = require("js/movement/Path");

    var AstarPathfinder = {
        getShortestPath: getShortestPath,
        getShortestCardinalPath: getShortestCardinalPath
    };

    function Astar(startCoords, endCoords, regionMatrix, neighborsFunction, isToBeAvoided) {
        this.startCoords = startCoords;
        this.endCoords = endCoords;
        this.regionMatrix = regionMatrix;
        this.neighborsFunction = neighborsFunction;
        this.isToBeAvoided = isToBeAvoided || function(matrix, coords) { return false; };
        this.visited = {};
        this.toVisit = new ComparatorHeap(function(a, b) {
            return a.estimatedCost < b.estimatedCost;
        });
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
                return !_this.isToBeAvoided(_this.regionMatrix, coords) && !_this._isVisited(coords);
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

    function getShortestPath(matrix, start, end, isToBeAvoided) {
        isToBeAvoided = isToBeAvoided || function(matrix, coords) { return false; };
        var astar = new Astar(start, end, matrix, "getNeighbors", isToBeAvoided);

        //This returns a Path object
        return astar.getShortestPath();
    }

    function getShortestCardinalPath(matrix, start, end, isToBeAvoided) {
        isToBeAvoided = isToBeAvoided || function(marix, coords) { return false; };
        var astar = new Astar(start, end, matrix, "getCardinalNeighbors", isToBeAvoided);

        console.log("READY!");
        //This returns a Path object
        return astar.getShortestPath();
    }

    return AstarPathfinder;
});