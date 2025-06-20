const {Router} = require("express");

const UserRouter = Router();

// Signup Router
UserRouter.post("/signup",function(req,res){
    res.json({
        message: "Signup Endpoint"
    })
})

//Signin Router
UserRouter.post("/signin",function(req,res){
    res.json({
        message: "Signin Endpoint"
    })
})

// Fetch purchased courses
UserRouter.get("/purchases",function(req,res){
    res.json({
        message: "Courses Endpoint"
    })
})

module.exports =  {UserRouter : UserRouter}