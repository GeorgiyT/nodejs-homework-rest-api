const { HttpCode } = require("../helpers/constants");

exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart]);
    if (result.error) {
      return res.status(HttpCode.BAD_REQUEST).send(result.error);
    }
    next();
  };
};