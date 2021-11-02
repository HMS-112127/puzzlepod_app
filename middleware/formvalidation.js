const Joi = require("joi");
const { jsonResponse } = require("../controller/commonController");
const formschema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone_no: Joi.string().min(10).max(11).required(),
  // password: Joi.string().required().min(8).max(20),
});

const formvalidator = (req, res, next) => {
  try{
    const data = {
      email: req.body.email,
      phone_no: req.body.phone_no,
      // password: req.body.password,
    };
    const { error } = formschema.validate(data);
    if (error) {
      jsonResponse(res, "invalid inputs");
      throw new Error("invalid inputs");
    }
    next();
  } catch (error) {
    console.log(error);
}
};

module.exports = formvalidator;
