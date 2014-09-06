define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");

    function HTMLDisplay() {
        this.cache = {};
        this.displayEl = document.getElementById("display");
    }

    HTMLDisplay.prototype = {
        renderMap: function(tileCodes) {
            var _this = this;
            var newDiv = document.createElement('div');
            var newMap = tileCodes.map(function(tileCode) {
                return _this.compileHTML(tileCode);
            });

            for (var y = 0; y < newMap.getHeight(); y++) {
                for (var x = 0; x < newMap.getWidth(); x++) {
                    newDiv.appendChild(newMap.getCell(x, y));
                }
                var br = document.createElement('br');
                newDiv.appendChild(br);
            }

            if (this.displayEl.firstChild) {
                this.displayEl.removeChild(this.displayEl.firstChild);
            }
            this.displayEl.appendChild(newDiv);
        },
        compileHTML: function(tileCode) {
            var tileObject = HTMLCodeTable[tileCode.object];
            var elevation = HTMLCodeTable[tileCode.elevation];
            var color = tileObject.color ? tileObject.color : "black";
            var backColor = elevation.color;
            var symbol = tileObject.symbol;

            var newEl = "" + color + backColor + symbol;
            if (this.cache[newEl]) {
                return this.cache[newEl].cloneNode(true);
            } else {
                var el = document.createElement('span');
                el.innerHTML = symbol;
                el.classList.add(color);
                el.classList.add("background-" + backColor);
                this.cache[newEl] = el;
                return el.cloneNode(true);
            }
        }
    };

    return HTMLDisplay;
});