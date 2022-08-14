const express = require("express");
const { User, Course } = require("./models");
const {authenticateUser} = require("./middleware/user-auth")
const {asyncHandle} = require("./middleware/async-Handler")

const router = express.Router();


router.get('/users', authenticateUser, asyncHandle(async (req, res) => {
        const user = req.currentUser;
        res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        });
    }));

router.post(
    "/users",
    asyncHandle(async (req, res) => {
        try {
            console.log(req.body);
            await User.create(req.body);
            res.status(201).location("/").end();
        } catch (error) {
            console.log("Error:", error.name);

            if (
                error.name === "SequelizeUniqueConstraintError" ||
                error.name === "SequelizeValidationError"
            ) {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } 
            else {
                throw error;
            }
        }
    }));
//-------------COURSES------------//

router.get(
    "/courses",
    asyncHandle(async (req, res) => {
        const courses = await Course.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });
        res.status(200).json(courses);
    })
);

router.get(
    "/courses/:id",
    asyncHandle(async (req, res) => {
        const course = await Course.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });
        res.status(200).json(course);
    })
);

router.post(
    "/courses",
    asyncHandle(async (req, res) => {
        try {
            await Course.create(req.body);
            res.status(201).location(`/courses/${Course.id}`).end();
        } catch (error) {
            console.log("Error:", error);
            if (
                error.name === "SequelizeValidationError" ||
                error.name === "SequelizeUniqueConstraintError"
            ) {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);

router.put(
    "/courses/:id",
    asyncHandle(async (req, res) => {
        let course = await Course.findByPk(req.params.id);
        let user = req.currentUser;
        try {
            if (course) {
                if (course.userId === user.id) {
                    await course.update(course);
                    res.status(204).end();
                } else {
                    res.status(401).json({
                        error: { message: "something happend" },
                    });
                }
            } else {
                console.log("you cant update!");
            }
        } catch (error) {
            console.log("Error:", error);
            if (
                error.name === "SequelizeValidationError" ||
                error.name === "SequelizeUniqueConstraintError"
            ) {
                const errors = error.errors.map((err) => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            }
        }
    })
);
module.exports = router;
