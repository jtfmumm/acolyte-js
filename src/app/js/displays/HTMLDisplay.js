define(function(require) {
    var $ = require("jquery");
    var mustache = require("mustache");
    var Matrix = require("js/utils/Matrix");
    var HTMLCodeTable = require("js/data/HTMLCodeTable");
    var Self = require("js/self/Self");

    var highlightedColor = "highlight-back";

    function HTMLDisplay() {
        this.cache = {};
        this.displayEl = document.getElementById("display");
        this.consoleEl = document.getElementById("console");
    }

    HTMLDisplay.prototype = {
        renderMap: function(tiles) {
            var _this = this;
            var newDiv = document.createElement('div');
            var newMap = tiles.map(function(tile) {
                return _this.compileMapHTML(tile);
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
        renderConsole: function(consoleData) {
            var text = "";
            for (var i = 0; i < consoleData.length; i++) {
                text += consoleData[i] + "<br>";
            }
            this.consoleEl.innerHTML = text;
            this.consoleEl.className = Self.getStats().combatMode;
        },
        renderInventory: function(inventory) {
            var div, el;
            var newDiv = document.createElement('div');
            var heading = document.createElement('div');
            heading.innerHTML = "INVENTORY";
            newDiv.appendChild(heading);
            for (var i = 0; i < inventory.length; i++) {
                var nextItem = inventory[i];
                div = document.createElement('div');
                el = document.createElement('span');
                el.innerHTML = nextItem.getName();
                if (nextItem.getEquipType()) {
                    el.innerHTML = el.innerHTML + " - " + nextItem.getEquipType();
                }
                if (nextItem.isSelected()) el.classList.add("background-" + highlightedColor);
                div.appendChild(el);
                newDiv.appendChild(div);
            }

            if (this.displayEl.firstChild) {
                this.displayEl.removeChild(this.displayEl.firstChild);
            }
            this.displayEl.appendChild(newDiv);
        },
        compileMapHTML: function(tile) {
            var tileObject = HTMLCodeTable[tile.getDisplayCode()];
            var tileTerrain = HTMLCodeTable[tile.getTerrainCode()];
            var elevation = HTMLCodeTable[tile.getElevation()];
            var color = tileObject.color ? tileObject.color : "black";
            var backColor;
            switch(true) {
                case Boolean(tile.isHighlighted()):
                    backColor = highlightedColor;
                    break;
                case Boolean(tileObject.backgroundColor):
                    backColor = tileObject.backgroundColor;
                    break;
                case Boolean(tileTerrain.backgroundColor):
                    backColor = tileTerrain.backgroundColor;
                    break;
                default:
                    backColor = elevation.color;
                    break;
            }
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