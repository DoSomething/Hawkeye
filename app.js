var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/dosomething-neue/dist'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
