//import oracledb from "oracledb";

var Formidable = require('formidable');
var bodyParser = require('body-parser');
var DbConnect = require('./DbConnect');

var urlParser = require("url");
var configure = async (
    app,
    config
) => {
    let context = config;
//    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.on("uncaughtException", function (err) {
        console.log(">>>>uncaughtException>>>>>>>>>>>>", err.stack);
    });

    app.use(bodyParser.json({limit: 2000 * 1024})); // 2000Kb
    app.use(bodyParser.urlencoded({extended: true, limit: 2000 * 1024}));

    app.options("*", (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "access-control-allow-origin, content-type, accept"
        });
        res.end();
    });

console.log("server called>>>>with http")
    app.all("/runningStatus", async (req, resp) => {
        let runningStatus = "Server running";
       console.log("called>>>>")
    });
};

module.exports = {
    configure
};
