const {Router} = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const UserRouter = Router();
const {UserModel} = require("../db/user");
const {JWT_USER_PASSWORD} = require("../config");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

// Signup Router
UserRouter.post("/signup", async function(req, res) {
    try {
        const {email, password, firstName, lastName} = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await UserModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
        
        res.json({message: "Signup succeeded"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Signin Router
UserRouter.post("/signin", async function(req, res) {
    try {
        const {email, password} = signinSchema.parse(req.body);
        const user = await UserModel.findOne({email: email});
        
        if (!user) {
            return res.status(403).json({message: "User not found"});
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(403).json({message: "Incorrect credentials"});
        }
        
        const token = jwt.sign({id: user._id}, JWT_USER_PASSWORD);
        res.json({token: token});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Fetch purchased courses
UserRouter.get("/purchases", function(req, res) {
    res.json({message: "Courses Endpoint"});
});

module.exports = {UserRouter: UserRouter};