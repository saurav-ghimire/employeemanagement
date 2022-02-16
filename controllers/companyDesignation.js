let designationService = require("../services/designationService");
const { validationResult } = require('express-validator');

let employee = {
    addPage: async function (res, res, next) {
        res.render('feature/designation-add');
    },
    addDesignation: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            let userData = req.body
            if (!errors.isEmpty()) {
                req.flash('inputData', userData);
                req.flash('errors', errors.array());
                return res.redirect('/designation/add');
            }
            await designationService.save(req.body)
            req.flash('success_msg', 'Designation Added Successfully');
            return res.redirect('/designation/add');
        }
        catch (err) {

            console.log('Actual Error: ', err);
            return res.redirect('/add');
        }
    },
    designationPage: async function (req, res, next) {
        let store = await designationService.findAll({});
        res.render('feature/designation-list', { list: store });
    },
    designationDelete: async function (req, res, next) {
        let id = req.params.id;
        await designationService.deleteOne({ _id: id });
        req.flash('success_msg', "Designation deleted successfully.");
        res.redirect("/departments-list");
    },
    designationEdit: async function (req, res, next) {
        let id = req.params.id;
        let user = await designationService.findOne({ _id: id });
        res.render('feature/designationEdit', { data: user });
    },
    designationUpdate: async function (req, res, next) {

        try {
            const errors = validationResult(req);
            let userData = req.body
            let id = req.params.id;
            if (!errors.isEmpty()) {
                req.flash('inputData', userData);
                req.flash('errors', errors.array());
                return res.redirect('/designation/edit/' + id);
            }
            await designationService.findOneAndUpdate({ _id: id }, userData)
            req.flash('success_msg', 'Designation Updated Successfully');
            return res.redirect('/designation/edit/' + id);
        }
        catch (err) {

            console.log('Actual Error: ', err);
            return res.redirect('/add');
        }
    }
}

module.exports = employee;


