var connect = require('connect'),
    http = require('http'),
    app;

app = connect()
  .use(connect.static('src/app'))
  .use('/js/lib/', connect.static('node_modules/requirejs/'))
  .use('/node_modules', connect.static('node_modules'));

http.createServer(app).listen(8380, function() {
  console.log('App running on http://localhost:8380');
});

test = connect()
  .use(connect.static('src'))
  .use('/app/js/lib/', connect.static('node_modules/requirejs/'))
  .use('/node_modules', connect.static('node_modules'));

http.createServer(test).listen(8300, function() {
  console.log('Jasmine tests running on http://localhost:8300');
});
