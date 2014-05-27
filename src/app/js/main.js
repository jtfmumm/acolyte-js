require.config({
    baseUrl: "",
    paths: {
        jquery: "js/lib/jquery-2.1.1", 
        text: "js/lib/text",
    },     
    shim: {
        jquery: {
          exports: 'jquery'
        }
    }
});

require([], 
        function () {
});