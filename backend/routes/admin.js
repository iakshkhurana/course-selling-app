const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
const { JWT_ADMIN_PASSWORD, ADMIN_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const { CourseModel } = require("../db/course");

adminRouter.post("/signup", function (req, res) {
    const { email, password, secretKey } = req.body;

    if (secretKey !== ADMIN_SECRET_KEY) {
        return res.status(403).json({
            message: "Invalid secret key. Admin signup forbidden."
        });
    }

    adminModel.create({
        email: email,
        password: password
    }).then(function () {
        res.status(200).json({
            message: "Signup successful!",
        });
    }).catch(function (error) {
        return res.status(400).json({
            message: "You are already signup!",
        });
    });
});

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (!admin) {
        return res.status(403).json({
            message: "Invalid Credentials!",
        });
    }

    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
    res.status(200).json({
        token: token,
    });
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId,
    });
    res.status(201).json({
        message: "Course created!",
        courseId: course._id,
    });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const { courseId, title, description, imageUrl, price } = req.body;
    
    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId,
    });

    if (!course) {
        return res.status(404).json({
            message: "Course not found!",
        });
    }

    await courseModel.updateOne(
        {
            _id: courseId,
            creatorId: adminId,
        },
        { 
            title: title || course.title, 
            description: description || course.description, 
            imageUrl: imageUrl || course.imageUrl, 
            price: price || course.price,
         } 
    );

    res.status(200).json({
        message: "Course updated!",
    });
});

adminRouter.delete("/course", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;
    const { courseId } = req.body;

    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId,
    });

    if (!course) {
        return res.status(404).json({
            message: "Course not found!",
        });
    }

    await courseModel.deleteOne({
        _id: courseId,
        creatorId: adminId,
    });

    res.status(200).json({
        message: "Course deleted!",
    });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.adminId;

    const courses = await courseModel.find({
        creatorId: adminId,
    });

    res.status(200).json({
        courses: courses,
    });
});

// Route to create a new course
adminRouter.post('/courses', adminMiddleware, async (req, res) => {
    try {
        const { title, description, price, imageUrl } = req.body;

        if (!title || !description || !price || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCourse = new CourseModel({
            title,
            description,
            price,
            imageUrl,
            creatorId: req.adminId, // From adminMiddleware
        });

        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', courseId: newCourse._id });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = {
    adminRouter: adminRouter,
};