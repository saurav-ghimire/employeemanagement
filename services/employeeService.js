let employeeModel = require("../models/employee");

let findAll = async function (query) {
    let store = await employeeModel.find(query).populate('designation').populate('department');
    console.log(store);
    return store;

};
let employeeSave = async function (query) {

    return await employeeModel(query).save();
};
let findOne = async function (query) {
    let store = employeeModel.findOne(query);
    return store;
};
let findOneAndUpdate = async function (query, updateData) {
    return await employeeModel.findOneAndUpdate(query, updateData);
}
let deleteOne = async (query) => {
    return await employeeModel.deleteOne(query);
};
module.exports = {
    employeeSave,
    findOne,
    findAll,
    findOneAndUpdate,
    deleteOne
};
