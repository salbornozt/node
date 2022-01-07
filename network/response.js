module.exports.Sucess = function(req, resp, message, status) {
    resp.status(status).send({
        error: false,
        body: message,
        status: status
    })
}

module.exports.Error = function(req, resp, message, status) {
    resp.status(status).send({
        error: true,
        body: message,
        status: status
    })
}