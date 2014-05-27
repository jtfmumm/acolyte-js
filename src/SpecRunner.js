require.config({
      baseUrl: "app",
      urlArgs: 'cb=' + Math.random(),
      paths: {
        jquery: 'js/lib/jquery-2.1.1',
        underscore: 'js/lib/underscore',
        jasmine: '../test/lib/jasmine',
        'jasmine-html': '../test/lib/jasmine-html',
        'jasmine-jquery': '../test/lib/jasmine-jquery',
        'jasmine-fixture': '../test/lib/jasmine-fixture',
        boot: '../test/lib/boot',
        spec: '../test/spec/index',
        text: "js/lib/text"
      },
      shim: {
        jquery: {
          exports: 'jquery'
        },
        'jasmine': {
          exports: 'window.jasmineRequire'
        },
        'jasmine-html': {
          deps: ['jasmine'],
          exports: 'window.jasmineRequire'
        },
        'boot': {
          deps: ['jasmine', 'jasmine-html'],
          exports: 'window.jasmineRequire'
        },
        'jasmine-jquery': {
          deps: ['jasmine', 'jquery'],
          exports: 'window.jasmineRequire'
        },
        'jasmine-fixture': {
          deps: ['jasmine', 'jquery'],
          exports: 'window.jasmineRequire'
        }
      }
    });

    var specs = [
      // '../test/spec/models/PhotoTest',
    ];

    require(['boot'], function () {

      // Load the specs
      require(specs, function () {

        // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
        window.onload();
      });
});