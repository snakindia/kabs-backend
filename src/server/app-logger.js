/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var { createLogger, format, transports } = require('winston');
var { combine, timestamp, label, prettyPrint } = format;

var today = new Date();
var date = today.getDate() + '_' + (today.getMonth() + 1) + '_' + today.getFullYear();
 
var logger = createLogger({
    format: combine(
      label({ label: 'Kabs Log Messages' }),
      timestamp(),
      prettyPrint()
    ),
   
    transports: [
        new transports.File({ filename: 'logs/info_log_' + date + '_.log', level: 'info', maxsize: 15000000 }),
        new transports.File({ filename: 'logs/error_log_' + date + '_.log', level: 'error', maxsize: 15000000 })
    ]
});

module.exports = logger;