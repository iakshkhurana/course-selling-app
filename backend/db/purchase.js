const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const PurchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId,
})

const PurchaseModel = mongoose.model("purchase",PurchaseSchema);

module.exports = {PurchaseModel};