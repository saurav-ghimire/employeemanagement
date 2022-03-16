let userModel = require("../models/user");
let saveUser = async function (query) {
    return await userModel(query).save();
};
let findOne = async function (query) {
    let user = userModel.findOne(query);
    return user;
}
let deleteOne = async function (query) {
    let user = userModel.deleteOne(query);
    return user;
}
let findOneAndUpdateService = async function (query, updateData) {
    return await userModel.findOneAndUpdate(query, updateData);

}
let findAll = async function () {
    return await userModel.find({
        $nor: [
            {
                name: "Admin User"
            }
        ]
    });
}

module.exports = {
    saveUser,
    findOne,
    findOneAndUpdateService,
    findAll,
    deleteOne
}