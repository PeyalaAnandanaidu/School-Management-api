const express = require("express");
const router = express.Router();

const {
  addSchool,
  listSchools,
  getSchoolById,
  deleteSchool,
} = require("../controllers/schoolController");

const {
  addSchoolValidation,
  listSchoolsValidation,
  handleValidationErrors,
} = require("../middleware/validation");



/* POST /api/v1/addSchool */

router.post(
  "/addSchool",
  addSchoolValidation,
  handleValidationErrors,
  addSchool
);

/* GET /api/v1/listSchools */

router.get(
  "/listSchools",
  listSchoolsValidation,
  handleValidationErrors,
  listSchools
);

/* GET /api/v1/school/:id */

router.get("/school/:id", getSchoolById);

/* DELETE /api/v1/school/:id  */

router.delete("/school/:id", deleteSchool);

module.exports = router;