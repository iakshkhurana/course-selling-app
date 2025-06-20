const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    email : {
        type: String,
        unique : true
    },
    password : {
        type : String,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    }
})

const UserModel = mongoose.model("user", UserSchema); 

module.exports = {UserModel};