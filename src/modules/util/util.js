var Request = require("request");
var properties = require('./../../server/Config');
var Error_Codes = require('./../../server/Error_Codes');
var logger = require('./../../server/app-logger');
var moment = require('moment-timezone');

module.exports = {
    getCurrentDate: function (dateFormat) {
        let d = '';
        if ('undefined' != typeof dateFormat) {
            d = moment().tz("Asia/Kolkata").format(dateFormat);
        } else {
            d = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
        }
        return d;
    },
    
    getCurrentSlotTime: function () {
        var d = moment().tz("Asia/Kolkata").format('HHmm');
        return d;
    },
    
    getDateFormat: function (dateVal) {
        var monthNames  = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date        = new Date(dateVal);

        if (date.toString() != 'Invalid Date') {
            var day         = date.getDate();
            var monthIndex  = date.getMonth();
            var year        = date.getFullYear();
            if (day < 10) {
               day = '0' + day;
            }
            return day + '-' + monthNames[monthIndex] + '-' + year;
        } else {
            return '';
        }
       
    },
    
    changeDateFormat: function(dateVal, format) {
        let dateObj = new Date(dateVal);
        let momentObj = moment(dateObj);
        if (typeof format != 'undefined') {
            return momentObj.format(format);
        } else {
            return momentObj.format('MMM DD,YYYY'); // 2016-07-15
        }
    },
    
    dateFormatConversion: function(date, format1, format2) {
        return date = moment(date, format1).format(format2);
    },
    
    getDOBFormat: function (dateVal) {
        var monthNames  = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date        = new Date(dateVal);
        var splitDOB    = dateVal.split('-');
        dateVal         = splitDOB[1] + '-' + splitDOB[0] + '-' + splitDOB[2];
        if (date.toString() != 'Invalid Date') {
            var day         = date.getDate();
            var monthIndex  = date.getMonth();
            var year        = date.getFullYear();
            if (day < 10) {
               day = '0' + day;
            }
            return day + '-' + monthNames[monthIndex] + '-' + year;
        } else {
            return '';
        }
       
    },
    
    getMappingFields: function(property) {
        let fields = '';
        for (const [key, value] of Object.entries(property)) {
            fields += key + ',';
        }
        
        fields = fields.slice(0, -1);
        return fields;
    }
}