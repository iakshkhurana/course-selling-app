const {AdminModel} = require("./admin");
const {CourseModel} = require("./course");
const {PurchaseModel} = require("./purchase");
const {UserModel} = require("./user");

module.exports = {
    adminModel: AdminModel,
    courseModel: CourseModel,
    purchaseModel: PurchaseModel,
    userModel: UserModel
}; 