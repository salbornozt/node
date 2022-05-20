module.exports.Sucess = function(req, resp, message, status) {
    const mStatus = status || 500;
    resp.status(status).send({
        error: false,
        body: message,
        status: mStatus
    })
}

module.exports.Error = function(req, resp, message, status) {
    const mStatus = status || 500;
    resp.status(status).send({
        error: true,
        body: message,
        status: mStatus
    })
}