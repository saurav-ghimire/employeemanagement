let express = require('express');
let featureService = require("../services/featureServices");
let designationService = require("../services/designationService");
let employeeService = require("../services/employeeService");
const { validationResult } = require('express-validator');

let employee = {
    addPage: async function (res, res, next) {
        let department = await featureService.findAll({});
        let designation = await designationService.findAll({});
        res.render('feature/employees-add', { departmentList: department, designation: designation });
    },
    employeeList: async function (req, res, next) {
        let data = await employeeService.findAll({});
        res.render('feature/employees-list', { employee: data });
    },
    createEmployee: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            let userData = req.body
            if (!errors.isEmpty()) {
                req.flash('inputData', userData);
                req.flash('errors', errors.array());
                return res.redirect('/employees/add');
            }
            await employeeService.employeeSave(userData)
            req.flash('success_msg', 'Employee Updated Successfully');
            return res.redirect('/employees/add');
        }
        catch (err) {

            console.log('Actual Error: ', err);
            return res.redirect('/add');
        }
    },
    delete: async function (req, res, next) {
        let id = req.params.id;
        await employeeService.deleteOne({ _id: id });
        req.flash('success_msg', "Employee deleted successfully.");
        res.redirect("/employees");
    },
    updatePage: async function (req, res, next) {
        let id = req.params.id;
        let store = await employeeService.findOne({ _id: id });
        let department = await featureService.findAll({});
        let designation = await designationService.findAll({});
        res.render('feature/employees-edit', { employeyList: store, departmentList: department, designation: designation });
    },
    update: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            let userData = req.body
            let id = req.params.id;
            if (!errors.isEmpty()) {
                req.flash('inputData', userData);
                req.flash('errors', errors.array());
                return res.redirect('/employees/edit/' + id);
            }
            await employeeService.findOneAndUpdate({ _id: id }, userData)
            req.flash('success_msg', 'employee Updated Successfully');
            return res.redirect('/employees/edit/' + id);
        }
        catch (err) {

            console.log('Actual Error: ', err);
            return res.redirect('/employees/');
        }
    }
}

module.exports = employee;


