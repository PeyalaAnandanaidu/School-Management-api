const { pool } = require("../config/database");
const { sortSchoolsByDistance } = require("../utils/distanceCalculator");

/* Add a new school : POST /api/v1/addSchool */
const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Check for duplicate school (same name and address)
        const [existingSchools] = await pool.execute(
            "SELECT id FROM schools WHERE name = ? AND address = ?",
            [name.trim(), address.trim()]
        );

        if (existingSchools.length > 0) {
            return res.status(409).json({
                success: false,
                message: "A school with the same name and address already exists",
                data: null,
            });
        }

        // Insert new school
        const insertQuery = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;

        const [result] = await pool.execute(insertQuery, [
            name.trim(),
            address.trim(),
            parseFloat(latitude),
            parseFloat(longitude),
        ]);

        // Fetch the newly created school
        const [newSchool] = await pool.execute(
            "SELECT * FROM schools WHERE id = ?",
            [result.insertId]
        );

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            data: {
                school: newSchool[0],
            },
        });
    } catch (error) {
        console.error("Error in addSchool:", error);

        // Handle MySQL specific errors
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Duplicate entry - School already exists",
                data: null,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error while adding school",
            error:
                process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

/* Get all schools sorted by proximity to user location : GET /api/v1/listSchools */

const listSchools = async (req, res) => {
    try {
        const userLatitude = parseFloat(req.query.latitude);
        const userLongitude = parseFloat(req.query.longitude);

        // Fetch all schools from database
        const [schools] = await pool.execute(
            "SELECT id, name, address, latitude, longitude FROM schools ORDER BY id ASC"
        );

        // Handle empty database
        if (schools.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No schools found in the database",
                data: {
                    user_location: {
                        latitude: userLatitude,
                        longitude: userLongitude,
                    },
                    total_schools: 0,
                    schools: [],
                },
            });
        }

        // Sort schools by distance from user location
        const sortedSchools = sortSchoolsByDistance(
            schools,
            userLatitude,
            userLongitude
        );

        return res.status(200).json({
            success: true,
            message: "Schools retrieved and sorted by proximity successfully",
            data: {
                user_location: {
                    latitude: userLatitude,
                    longitude: userLongitude,
                },
                total_schools: sortedSchools.length,
                schools: sortedSchools,
            },
        });
    } catch (error) {
        console.error("Error in listSchools:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching schools",
            error:
                process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

/* Get a single school by ID : GET /api/v1/school/:id */

const getSchoolById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid school ID is required",
                data: null,
            });
        }

        const [school] = await pool.execute(
            "SELECT * FROM schools WHERE id = ?",
            [parseInt(id)]
        );

        if (school.length === 0) {
            return res.status(404).json({
                success: false,
                message: `School with ID ${id} not found`,
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "School retrieved successfully",
            data: {
                school: school[0],
            },
        });
    } catch (error) {
        console.error("Error in getSchoolById:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

/* Delete a school by ID : DELETE /api/v1/school/:id */

const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                success: false,
                message: "Valid school ID is required",
            });
        }

        const [existing] = await pool.execute(
            "SELECT id FROM schools WHERE id = ?",
            [parseInt(id)]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: `School with ID ${id} not found`,
            });
        }

        await pool.execute("DELETE FROM schools WHERE id = ?", [parseInt(id)]);

        return res.status(200).json({
            success: true,
            message: `School with ID ${id} deleted successfully`,
        });
    } catch (error) {
        console.error("Error in deleteSchool:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error:
                process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
};

module.exports = {
    addSchool,
    listSchools,
    getSchoolById,
    deleteSchool,
};