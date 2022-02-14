
const { checkSchema } = require('express-validator');
// let featureServices = require("../services/featureServices");

let createDepartmentValidation = checkSchema({
    'title': {
        isLength: {
            errorMessage: 'Department Name is required',
            options: { min: 10 }
        }
    },
});

module.exports = { createDepartmentValidation };