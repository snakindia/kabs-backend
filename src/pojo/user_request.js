var properties = {
    id          : '',
    name        : '',
    status      : '',
    createDate  : '',
    updateDate  : '',
};

exports.setID = function (id) {
    properties.id = id;
};

exports.setName = function (name) {
    properties.name = name;
};

exports.setStatus = function (status) {
    properties.status = status;
};

exports.setCreateDate = function (createDate) {
    properties.createDate = createDate;
};

exports.setUpdateDate = function (updateDate) {
    properties.updateDate = updateDate;
};

exports.getUserProp = function () {
    return {
        id          : properties.id,
        name        : properties.name,
        status      : properties.status,
        create_date : properties.createDate,
        update_date : properties.updateDate
    };
};