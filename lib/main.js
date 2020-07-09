"use strict";

var express = require('express');

var app = express();
app.get('/', function (request, response) {
  response.send('hello world');
});
app.listen(3000, function () {
  console.log('listening port 3000');
});