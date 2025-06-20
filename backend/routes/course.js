const {Router} = require("express");
const CourseRouter = Router();

// You would expect the user to pay you money
CourseRouter.get("/purchases",function(req,res){
    res.json({
        message:"Purchase a new course"
    })
})

// ALl courses fetcher
CourseRouter.post("/preview",function(req,res){
    res.json({
        message: "All courses"
    })
})

module.exports = {CourseRouter : CourseRouter};