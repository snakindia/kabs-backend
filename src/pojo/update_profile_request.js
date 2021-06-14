var properties = {
    anniversaryDate : '',
    DOB             : '',
    emailAddress    : '',
    mobileNumber    : '',
    deviceTokenID   : '',
    deviceType      : '',
};

exports.setAnniversaryDate = function (anniversaryDate) {
    properties.anniversaryDate = anniversaryDate;
};

exports.setDOB = function (DOB) {
    properties.DOB = DOB;
};

exports.setEmailAddress = function (emailAddress) {
    properties.emailAddress = emailAddress;
};

exports.setMobileNumber = function (mobileNumber) {
    properties.mobileNumber = mobileNumber;
};

exports.setDeviceTokenID = function (deviceTokenID) {
    properties.deviceTokenID = deviceTokenID;
};

exports.setDeviceType = function (deviceType) {
    properties.deviceType = deviceType;
};

exports.getUpdateProfileProps = function () {
    return {
        anniversaryDate : properties.anniversaryDate,
        DOB             : properties.DOB,
        emailAddress    : properties.emailAddress,
        mobileNumber    : properties.mobileNumber,
        deviceType      : properties.deviceType,
        deviceTokenID   : properties.deviceTokenID
    };
};