var http = require('http');
var express = require('express');
var {configure} = require('./Http');
var config = require('./Config');

var winston = require('winston');
var bodyParser = require('body-parser');

var router = require('./../../router');
var {logger} = require('./app-logger');

let app = express();
var publicDir = require('path').join(__dirname,'/../../uploads');
app.use(express.static(publicDir));
app.use(bodyParser.json());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router(app);
let server = http.Server(app);

var PORT = process.env.PORT || 8089;
configure(app, config)
  .then(_ => {
    server.listen(PORT, () => console.log(`>> Server is now running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.log("err in start server>>>>>>>>>>>>", err);
  });





