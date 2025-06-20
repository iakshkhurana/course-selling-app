require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require("mongoose");


//Routers Import
const { CourseRouter} = require("./routes/course");
const {UserRouter} = require("./routes/user")
const {adminRouter} = require("./routes/admin");

//Models Import
const {AdminModel} = require("./db/admin");
const {CourseModel} = require("./db/course");
const {PurchaseModel} = require("./db/purchase");
const {UserModel} = require("./db/user");

//Routers use
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/course", CourseRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
async function main(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to the database");
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch(err){
        console.error("An error occured ",err);
    }
}

main();