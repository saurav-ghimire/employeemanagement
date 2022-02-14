
const { checkSchema } = require('express-validator');
let featureServices = require("../services/featureServices");

let createDepartmentValidation = checkSchema({
    'title': {
        isLength: {
            errorMessage: 'Department Name is required',
            options: { min: 3 }
        },
        custom: {
            options: (value, { req }) => {
                return new Promise((resolve, reject) => {
                    let whereCondition = { title: value };
                    featureServices.findOne(whereCondition).then(user => {
                        if (user === null) {
                            resolve(true);
                        } else {
                            reject('Department Name already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },
});

module.exports = { createDepartmentValidation };