var properties = {
    title           : '',
    description     : '',
    status          : 'To Do',
    createdBy       : '',
    assignedTo      : '',
    id              : ''
};

exports.setTitle = function (title) {
    properties.title = title;
};

exports.setDescription = function (description) {
    properties.description = description;
};

exports.setStatus = function (status) {
    properties.status = status;
};

exports.setCreatedBy = function (createdBy) {
    properties.createdBy = createdBy;
};

exports.setAssignedTo = function (assignedTo) {
    properties.assignedTo = assignedTo;
};

exports.setID = function (id) {
    properties.id = id;
};

exports.getID = function () {
    return properties.id;
};

exports.getTaskProp = function () {
    return {
        title       : properties.title,
        description : properties.description,
        status      : properties.status,
        created_by  : properties.createdBy,
        assigned_to : properties.assignedTo
    };
};