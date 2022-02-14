let featureService = require("../services/featureServices");
const { validationResult } = require('express-validator');
let departments = {
    departmentPage: async function (req, res, next) {
        res.render('feature/departments');
    },
    departmentSave: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            let userData = req.body
            if (!errors.isEmpty()) {
                req.flash('inputData', userData);
                req.flash('errors', errors.array());
                return res.redirect('/departments');
            }
            await featureService.departmentSave(req.body)
            req.flash('success_msg', 'Department Added Successfully');
            return res.redirect('/departments')
        }
        catch (err) {

            console.log('Actual Error: ', err);

            // req.flash('errors', 'User registration failed');
            return res.redirect('/register');
        }
    },
    departmentList: async function (req, res, next) {
        let store = await featureService.findAll({});
        res.render('feature/departments-list', { departments: store });
    },
    departmentEdit: async function (req, res, next) {
        let id = req.params.id;
        let store = await featureService.findOne({ _id: id });
        res.render('feature/departments-edit', { data: store });
    },
    departmentUpdate: async function (req, res, next) {
        let id = req.params.id;
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.array());
                return res.redirect("/departments-edit/" + id);
            }
            await featureService.findOneAndUpdate({ _id: id }, { title: req.body.title });
            req.flash('success_msg', "Department updated successfully.");
            return res.redirect("/departments-edit/" + id);
        }
        catch (err) {
            console.log('Actual Error: ', err);
            return res.redirect("/departments-edit/" + id);
        }

    },
    departmentDelete: async function (req, res, next) {
        let id = req.params.id;
        await featureService.deleteOne({ _id: id });
        req.flash('success_msg', "Todo deleted successfully.");
        res.redirect("/departments-list");
    }
}
module.exports = departments;