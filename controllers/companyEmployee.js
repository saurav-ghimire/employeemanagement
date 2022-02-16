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
        let data = await employeeService.findAll({}).populate('designation');
        console.log('Name : ', data);
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
}

module.exports = employee;


