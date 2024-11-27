import Joi from 'joi';

const typeDoctorSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

export const validateTypeDoctor = (req, res, next) => {
  const { error } = typeDoctorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }
  next();
};
