const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
const { JWT_ADMIN_PASSWORD } = require("../config");
const jwt = require("jsonwebtoken");

adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;
    
    try {
        await adminModel.create({
            email,
            password,
            firstName,
            lastName,
        });
    } catch (error) {
        return res.status(400).json({
            message: "You are already signup!",
        });
    }

    res.status(201).json({
        message: "Signup successful!",
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

module.exports = {
    adminRouter: adminRouter,
};