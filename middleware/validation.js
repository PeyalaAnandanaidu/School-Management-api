const { body, query, validationResult } = require("express-validator");


 /* Validation rules for Add School API */
 
const addSchoolValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("School name is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("School name must be between 2 and 255 characters")
    .matches(/^[a-zA-Z0-9\s\-\.,'()&]+$/)
    .withMessage("School name contains invalid characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 5, max: 500 })
    .withMessage("Address must be between 5 and 500 characters"),

  body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90")
    .toFloat(),

  body("longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180")
    .toFloat(),
];

/* Validation rules for List Schools API */
const listSchoolsValidation = [
  query("latitude")
    .notEmpty()
    .withMessage("User latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90")
    .toFloat(),

  query("longitude")
    .notEmpty()
    .withMessage("User longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180")
    .toFloat(),
];

/* Middleware to handle validation errors */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }

  next();
};

module.exports = {
  addSchoolValidation,
  listSchoolsValidation,
  handleValidationErrors,
};