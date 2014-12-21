define(function(require) {
    return {
        //Terrains
        "self": {
            symbol: " @",
            backgroundColor: "highlight-back"
        },
        "wall": {
            symbol: " #",
            backgroundColor: "dark-light-brown-back"
        },
        "palm": {
            symbol: " ("
        },
        "plains": {
            symbol: " ."
        },
        "forest": {
            symbol: " F",
            color: "dark-light-green-back"
        },
        "water": {
            symbol: "&nbsp;&nbsp;",
            backgroundColor: "blue"
        },
        "grass": {
            symbol: " ,",
            color: "dark-green",
            backgroundColor: "light-green"
        },
        "path": {
            symbol: " .",
            backgroundColor: "tan"
        },
        "door": {
            symbol: " ^",
            color: "white",
            backgroundColor: "black"
        },
        "pillar": {
            symbol: "||",
            backgroundColor: "light-grey"
        },
        "altar": {
            symbol: " .",
            backgroundColor: "dark-white"
        },
        "void": {
            symbol: "&nbsp;&nbsp;",
            backgroundColor: "black"
        },
        //Landmarks
        "shrine": {
            symbol: "II",
            backgroundColor: "highlight-back"
        },
        "village": {
            symbol: "[]",
            backgroundColor: "highlight-back"
        },
        //Agents
        "drunk": {
            symbol: " &"
        },
        "priest": {
            symbol: " P"
        },
        //Elevations
        "-2": {
            color: "black"
        },
        "-1": {
            color: "blue"
        },
        0: {
            color: "light-tan-back"
        },
        1: {
            color: "mid-light-tan-back"
        },
        2: {
            color: "dark-light-tan-back"
        },
        3: {
            color: "light-green-back"
        },
        4: {
            color: "mid-light-green-back"
        },
        5: {
            color: "dark-light-green-back"
        },
        6: {
            color: "light-brown-back"
        },
        7: {
            color: "mid-light-brown-back"
        },
        8: {
            color: "dark-light-brown-back"
        }
    }
});