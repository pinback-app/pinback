var express = require('express');
var app = express();

var parser = require('body-parser');
var morgan = require('morgan');

//express routes
var router = require('./routes.js')

// port
app.set("port", 80);

// logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

//static route
app.use(express.static(__dirname + '/../client'));

// api router
app.use("/api", router);

if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

module.exports = app;
