let departmentModel = require("../models/department");

let departmentSave = async function (query) {
    try {
        return await departmentModel(query).save();
    }
    catch (err) {
        console.log('Actual Error: ', err);

        // req.flash('errors', 'User registration failed');
        return res.redirect('/departments');
    }
};
let findOne = async function (query) {
    let store = departmentModel.findOne(query);
    return store;
};

module.exports = {
    departmentSave,
    findOne
};
