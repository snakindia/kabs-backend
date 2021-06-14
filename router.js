var Tasks = require('./src/modules/tasks/tasks');
var Users = require('./src/modules/users/users');
var Login = require('./src/modules/login/login');

module.exports = function (app) {
    
    app.route('/login').post(Login.login);
    
    app.post('/save_task', function(req, res){
        Tasks.saveTask(req, res);
    });
    
    app.get('/get_task_list', function(req, res){
        Tasks.getTaskList(req, res);
    });
    
    app.get('/get_task_details', function(req, res){
        Tasks.getTaskDetails(req, res);
    });
    
    app.post('/update_task', function(req, res){
        Tasks.updateTask(req, res);
    });
    
    app.get('/get_user_list', function(req, res){
        Users.getUserList(req, res);
    });
};