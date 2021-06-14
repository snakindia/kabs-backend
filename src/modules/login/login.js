var db              = require('./../../server/DbConnect');
var LoginRequest    = require('./../../pojo/login_request');
var Logger          = require('./../../server/app-logger');
const { Validator } = require('node-input-validator');
const jwt           = require('jsonwebtoken');

exports.login = function (req, res, next) {

    // validate input data
    const v = new Validator(req.body, {
        email: 'required|email',
        password: 'required'
    });

    // in case validation fails
    v.check().then((matched) => {
        if (!matched) {
            Logger.log({level: 'error', message: 'Login Invalid Data : '+ JSON.stringify(v.errors)});
            return res.send({status: false, error: true, msg: v.errors});
        }
    });
    
    LoginRequest.setEmail(req.body.email);
    LoginRequest.setPassword(req.body.password);
    try {
        db.query('SELECT * FROM users WHERE email = "' + LoginRequest.getLoginProp().email + '" AND password = "' + LoginRequest.getLoginProp().password + '"', function (error, results, fields) {
            if (error) {
                Logger.log({level: 'error', message: 'task select db error : '+ error});
                throw error;
            } else {
                if (results.length > 0) {
                    return res.send({status: true, data:results});
                } else {
                    return res.send({status: false, data:[]});
                }
            }
        });
    } catch (e) {
        Logger.log({level: 'error', message: e});
        return res.send({status: false, error: true, msg:JSON.stringify(e)});
    }
    
}