define(function(require) {
    var trampoline = require("js/utils/trampoline");

    var count = 0;

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
            var _this = this;
            var __shortestPathFrom = function(node) {
                if (node.coords.isEqual(_this.endCoords)) {
                    return node.path;
                }

                var neighbors = node[_this.neighborsFunction]().filter(function (coords) {
                    return _this._withinRange(coords) && !_this.isToBeAvoided(_this.regionMatrix, coords) && !_this._isVisited(coords);
                });
                neighbors.forEach(function (coords) {
                    var path = node.clonePath().add(coords);
                    var estimatedCost = node.getPathSize() + coords.minDistanceTo(_this.endCoords);
                    _this.toVisit.insert(new Node(coords, path, estimatedCost));
                });

                _this._markNodeAsVisited(node);

                if (_this.toVisit.size()) {
                    return __shortestPathFrom.bind(_this, _this.toVisit.pop());
                } else {
                    //There's no path possible
                    return false;
                }
            };

            //tail call optimization with trampoline
            return trampoline(__shortestPathFrom, node);
        },
        _isVisited: function(coords) {
            return this.visited[coords.toString()];
        },
        _markNodeAsVisited: function(node) {
            this.visited[node.toString()] = true;
        },
        _withinRange: function(coords) {
            return coords.x < this.regionMatrix.getWidth() &&
                coords.y < this.regionMatrix.getHeight() &&
                coords.x >= 0 &&
                coords.y >= 0;
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

        //This returns a Path object
        return astar.getShortestPath();
    }

    return AstarPathfinder;
});