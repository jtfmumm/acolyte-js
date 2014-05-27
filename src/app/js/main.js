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

require(["js/screens/Screen"], 
        function (Screen) {
            var screen = new Screen();
            screen.render();
});