var logger          = require('./../../server/app-logger');
var TaskRequest     = require('./../../pojo/task_request');
var db              = require('./../../server/DbConnect');
var Util            = require('./../../modules/util/util');
const { Validator } = require('node-input-validator');

module.exports = {
    saveTask: function (req, res) {
        logger.log({level: 'info', message: 'task request params : '+ JSON.stringify(req.body)});

        // validate input data
        this.validateData(req)
            .then(result => {
                try {
                    TaskRequest.setTitle(req.body.title);
                    TaskRequest.setDescription(req.body.description);
                    TaskRequest.setCreatedBy(req.body.created_by);
                    TaskRequest.setAssignedTo(req.body.assigned_to);
                    var data  = TaskRequest.getTaskProp();
                    db.query('INSERT INTO tasks SET ?', data, function (error, results, fields) {
                        if (error) {
                            logger.log({level: 'error', message: 'task insert db error : '+ error});
                            throw error;
                        } else {
                            return res.send({status: true});
                        }
                    });
                } catch (error) {
                    return res.send({status: false, error: error});
                }
        }).catch(err => {
            logger.log({level: 'error', message: 'task request params: ' + err});
            return res.send({status: false, error: err});
        });
    },
    
    validateData: function(req) {
        return new Promise((resolve, reject) => {
            const v = new Validator(req.body,
                { title: 'required',
                    description: 'required',
                    created_by: 'required|numeric',
                    assigned_to: 'required|numeric'
                }
            );

            v.check().then(function (matched) {
                if (!matched) {
                    reject(v.errors);
                } else {
                    resolve(true);
                }
            });
        });
    },

    getTaskList: function (req, res) {
        try {
            db.query('SELECT tasks.*, u1.name as created_by, u2.name as assigned_to, \n\
                IF(CHAR_LENGTH(tasks.title) > 25, CONCAT(SUBSTRING(tasks.title, 1, 25), "..."), tasks.title) as title FROM tasks \n\
                LEFT JOIN users as u1 ON created_by = u1.id \n\
                LEFT JOIN users as u2 ON assigned_to = u2.id \n\
                order by create_date desc', function (error, results, fields) {
                if (error) {
                    logger.log({level: 'error', message: 'task select db error : '+ error});
                    throw error;
                } else {
                    return res.send({status: true, data: results});
                }
            });
        } catch (error) {
            return res.send({status: false, error: error});
        }
    },

    getTaskDetails: function (req, res) {
        try {
            const v = new Validator(req.query,
                { id: 'required|numeric' }
            );

            v.check().then(function (matched) {
                if (!matched) {
                    return res.send({status: true, data: v.errors});
                }
            });

            db.query('SELECT tasks.*, u1.name as created_by, u2.name as assigned_to FROM tasks \n\
                LEFT JOIN users as u1 ON created_by = u1.id \n\
                LEFT JOIN users as u2 ON assigned_to = u2.id\n\
                WHERE tasks.id = ' + req.query.id, function (error, results, fields) {
                if (error) {
                    logger.log({level: 'error', message: 'task details select db error : '+ error});
                    throw error;
                } else {
                    return res.send({status: true, data: results});
                }
            });
        } catch (error) {
            return res.send({status: false, error: error});
        }
    },
    
    updateTask: function (req, res) {
        logger.log({level: 'info', message: 'update task request params : '+ JSON.stringify(req.body)});
        try {
            const v = new Validator(req.body,
                { id: 'required|numeric',
                    created_by: 'numeric',
                    assigned_to: 'numeric'
                }
            );

            v.check().then(function (matched) {
                if (!matched) {
                    return res.send({status: true, data: v.errors});
                }
            });

            var updateParams = '';

            TaskRequest.setID(req.body.id);
            if (typeof req.body.title != 'undefined' && req.body.title != '') {
                TaskRequest.setTitle(req.body.title);
                updateParams += 'title = "' + TaskRequest.getTaskProp().title + '",';
            }

            if (typeof req.body.description != 'undefined' && req.body.description != '') {
                TaskRequest.setDescription(req.body.description);
                updateParams += 'description = "' + TaskRequest.getTaskProp().description + '",';
            }

            if (typeof req.body.assigned_to != 'undefined' && req.body.assigned_to != '') {
                TaskRequest.setAssignedTo(req.body.assigned_to);
                updateParams += 'assigned_to = "' + TaskRequest.getTaskProp().assigned_to + '",';
            }

            if (typeof req.body.status != 'undefined' && req.body.status != '') {
                TaskRequest.setStatus(req.body.status);
                updateParams += 'status = "' + TaskRequest.getTaskProp().status + '",';
            }
            updateParams = updateParams.replace(/,\s*$/, "");
            if (updateParams == '') {
                return res.send({status: false});
            }

            db.query('Update tasks SET ' + updateParams + ' WHERE id = ' + TaskRequest.getID(), function (error, results, fields) {
                if (error) {
                    logger.log({level: 'error', message: 'task update db error : '+ error});
                    throw error;
                } else {
                    return res.send({status: true});
                }
            });
        } catch (error) {
            return res.send({status: false, error: error});
        }
    }
}