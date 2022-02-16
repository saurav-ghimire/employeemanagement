let designationModel = require("../models/designation");

let findAll = async function (query) {
    let store = await designationModel.find(query);
    return store;
};
let save = async function (query) {
    return await designationModel(query).save();
};
let findOne = async function (query) {
    let store = await designationModel.findOne(query);
    return store;
};
let findOneAndUpdate = async function (query, updateData) {
    return await designationModel.findOneAndUpdate(query, updateData);
}
let deleteOne = async (query) => {
    return await designationModel.deleteOne(query);
};
module.exports = {
    save,
    findOne,
    findAll,
    findOneAndUpdate,
    deleteOne
};
