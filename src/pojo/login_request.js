var properties = {
    email       : '',
    password    : ''
};

exports.setEmail = function (email) {
    properties.email = email;
};

exports.setPassword = function (password) {
    properties.password = password;
};

exports.getLoginProp = function () {
    return {
        email       : properties.email,
        password    : properties.password
    };
};