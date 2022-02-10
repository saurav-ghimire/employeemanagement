let userModel = require("../models/user");
let saveUser = async function (query) {
    return await userModel(query).save();
};
let findOne = async function (query) {
    let user = userModel.findOne(query);
    return user;
}
let findOneAndUpdateService = async function (query, updateData) {
    return await userModel.findOneAndUpdate(query, updateData);

}
module.exports = {
    saveUser,
    findOne,
    findOneAndUpdateService
}