require.config({
    baseUrl: "",
    paths: {
        jquery: "js/lib/jquery-2.1.1", 
        text: "js/lib/text",
        mustache: "js/lib/mustache",
        lodash: "js/lib/lo-dash-2.4.1"
    },     
    shim: {
        jquery: {
          exports: 'jquery'
        }
    }
});


require(["js/game/Game", "js/input/Keyboard"],
        function (Game, Keyboard) {
            Game.init(Keyboard);

            //For tests.  Normally commented out
//            Game.test(Keyboard, testMap);
        });

var testMap = [
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "wall", "plains", "plains", "plains", "wall", "wall", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "wall", "plains", "plains", "wall", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "wall", "plains", "wall", "wall", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "wall", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "wall", "plains", "wall", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "wall", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "wall", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"],
    ["plains", "plains", "wall", "plains", "plains", "plains", "plains", "wall", "plains", "plains", "plains"]
];

var testMap2 = [
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"],
    ["plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains", "plains"]
];