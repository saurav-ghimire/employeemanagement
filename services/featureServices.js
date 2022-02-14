let departmentModel = require("../models/department");

let findAll = async function (query) {
    let store = await departmentModel.find(query);
    return store;
};
let departmentSave = async function (query) {

    return await departmentModel(query).save();
};
let findOne = async function (query) {
    let store = departmentModel.findOne(query);
    return store;
};
let findOneAndUpdate = async function (query, updateData) {
    return await departmentModel.findOneAndUpdate(query, updateData);
}
let deleteOne = async (query) => {
    return await departmentModel.deleteOne(query);
};
module.exports = {
    departmentSave,
    findOne,
    findAll,
    findOneAndUpdate,
    deleteOne
};
