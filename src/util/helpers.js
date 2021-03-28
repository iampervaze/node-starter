//
// Error utilities
//

//const logger = require('winston'); // require **winston** - this retrieves the default logger configured in util/log !!

function reject(message) {
    return Promise.reject(err(message));
}

function err(message) {
    return {status: 400, message, showMessage: true}
}

function handleResult(req/*currently not used*/, res, data, entity) {
    if (!data) {
        return reject(entity + " not found");
    }

    res.json(data);
}

function handleError(next, err, context) {
    if (context) {
        err.context = context;
    }

    next(err);
}

function handlers(entity, context) {
    return {
        handle: (req, res, user) => handleResult(req, res, user, entity),
        handleErr: (next, err, operation) => handleError(next, err, context + ':' + operation)
    };
}

function id(req) {
    return req.params.id;
}

module.exports = {reject, err, handleResult, handleError, handlers, id};