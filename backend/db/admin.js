const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const AdminSchema = new Schema({
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

const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = {AdminModel};