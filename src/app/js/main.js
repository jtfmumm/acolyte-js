require.config({
    baseUrl: "",
    paths: {
        jquery: "js/lib/jquery-2.1.1", 
        text: "js/lib/text",
        mustache: "js/lib/mustache"
    },     
    shim: {
        jquery: {
          exports: 'jquery'
        }
    }
});

require(["js/game/Game", "js/world/World", "js/displays/HTMLDisplay", "js/generators/RandomMapGenerator", "js/input/Keyboard"], 
        function (Game, World, HTMLDisplay, RandomMapGenerator, Keyboard) {
            Game.init(Keyboard);
            // var display = new HTMLDisplay();
            // var world = new World();//(RandomMapGenerator.uniform);
            // world.displayMap(display);
});
