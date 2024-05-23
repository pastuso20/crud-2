const errorHandler = (res, error) => {
    res.status(400).send({ error: error.message });
};

module.exports = errorHandler;

