

const notFoundHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 404) {
        res.status(404).send("not found")
    }
    next(err)
}

const unauthorized = (err, req, res, next) => {
    if (err.httpStatusCode === 401) {
        res.status(401).send("unauthorized")
    }
    next(err)
}

const forbiddenHandler = (err, req, res, next) => {
    if (err.httpStatusCode === 403) {
        res.status(403).send("forbiddenHandler")
    }
    next(err)
}

const catchAllHandler = (err, req, res, next) => { }

module.exports = {
    notFoundHandler,
    unauthorized,
    forbiddenHandler,
    catchAllHandler
}