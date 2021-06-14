var logger          = require('./../../server/app-logger');
var TaskRequest     = require('./../../pojo/user_request');
var db              = require('./../../server/DbConnect');
var Util            = require('./../../modules/util/util');

module.exports = {
    getUserList: function (req, res) {
        try {
            // get the fields
            let properties  = TaskRequest.getUserProp();
            let fields      = Util.getMappingFields(properties);
            db.query('SELECT ' + fields + ' FROM users order by name asc', function (error, results, fields) {
                if (error) {
                    logger.log({level: 'error', message: 'users select db error : '+ error});
                    throw error;
                } else {
                    return res.send({status: true, data: results});
                }
            });
        } catch (error) {
            return res.send({status: false, error: error});
        }
    }
}