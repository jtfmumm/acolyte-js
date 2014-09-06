define(function(require) {
    return {
        //Terrains
        "self": {
            symbol: " @",
            color: "highlight-back"
        },
        "wall": {
            symbol: " #"
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
        "drunk": {
            symbol: " &"
        },
        "void": {
            symbol: "&nbsp;&nbsp;",
            color: "black-back"
        },
        //Elevations
        "-1": {
            color: "black"
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