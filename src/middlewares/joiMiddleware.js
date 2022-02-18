const joiMiddleware = (schema) =>
  function (req, res, next) {
    const { error, value } = schema.validate(req, { allowUnknown: true });

    if (error) {
      next(error);
      return;
    }

    req.headers = value.headers;
    req.params = value.params;
    req.query = value.query;
    req.body = value.body;

    next();
  };

module.exports = joiMiddleware;
