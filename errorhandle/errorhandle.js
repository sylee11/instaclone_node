module.exports.notFoundHandler = (req, res, next) => {
    res.status(404);
    res.json({ error: 'Not found' });
};

module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.statusCode)
    res.send({ error: err.message })
};
