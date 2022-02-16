const { checkSchema } = require('express-validator');

let employeeService = require("../services/employeeService");

let createEmployeeValidation = checkSchema({
    'firstname': {
        isLength: {
            errorMessage: 'First Name is required',
            options: { min: 1 }
        }
    },
    'lastname': {
        isLength: {
            errorMessage: 'Last Name is required',
            options: { min: 1 }
        }
    },
    'age': {
        isLength: {
            errorMessage: 'Age is required',
            options: { min: 1 }
        }
    },
    'department': {
        isLength: {
            errorMessage: 'Department is required',
            options: { min: 1 }
        }
    },
    'designation': {
        isLength: {
            errorMessage: 'Designation is required',
            options: { min: 1 }
        }
    },
    'contactaddress': {
        isLength: {
            errorMessage: 'Address is required',
            options: { min: 1 }
        }
    },
    'contactphone': {
        isLength: {
            errorMessage: 'Phone Number is required',
            options: { min: 1 }
        }
    },
    'contactemail': {
        isLength: {
            errorMessage: 'Email is required',
            options: { min: 1 }
        },
        isEmail: {
            errorMessage: 'Not a valid email'
        },
        custom: {
            options: (value, { req }) => {
                return new Promise((resolve, reject) => {
                    let whereCondition = { contactemail: value };
                    employeeService.findOne(whereCondition).then(user => {
                        if (user === null) {
                            resolve(true);
                        } else {
                            reject('Email already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },

});

module.exports = { createEmployeeValidation };
