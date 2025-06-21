const {Router} = require("express");
const {CourseModel} = require("../db/course");
const CourseRouter = Router();

// You would expect the user to pay you money
CourseRouter.get("/purchases",function(req,res){
    res.json({
        message:"Purchase a new course"
    })
})

// ALl courses fetcher
CourseRouter.post("/preview",async function(req,res){
    try {
        const courses = await CourseModel.find({});
        // Map fields to match frontend expectations
        const formattedCourses = courses.map(course => ({
            id: course._id,
            name: course.title,
            description: course.description,
            img: course.imageUrl,
            price: course.price
        }));
        res.json(formattedCourses);
    } catch (e) {
        console.error("Error fetching courses for preview: ", e);
        res.status(500).json({ message: "Error fetching courses" });
    }
})

module.exports = {CourseRouter : CourseRouter};