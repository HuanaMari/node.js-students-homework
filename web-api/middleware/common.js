logger = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
};

routError = (req, res, next) => {
    var error = new Error('not found.Try with another route');
    error.status = 404;
    next(error);
}

hendler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    }
    res.status(err.status || 500).send(errorObj);
}

module.exports = {
    logger,
    routError,
    hendler
}