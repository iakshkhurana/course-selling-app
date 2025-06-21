const {Router} = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const UserRouter = Router();
const {UserModel} = require("../db/user");
const {JWT_USER_PASSWORD} = require("../config");
const {userMiddleware} = require("../middlewares/user");

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

// Fetch purchased courses for the logged-in user
UserRouter.get("/purchases", userMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('purchasedCourses');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Map the populated courses to match the frontend structure
        const formattedCourses = user.purchasedCourses.map(course => ({
            id: course._id,
            name: course.title,
            description: course.description,
            img: course.imageUrl,
            price: course.price,
            // You can add more fields like purchaseDate if you store them
        }));
        
        res.json(formattedCourses);

    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = {UserRouter: UserRouter};