
const { checkSchema } = require('express-validator');
let designationServices = require("../services/designationService");

let createDesignationValidation = checkSchema({
    'title': {
        isLength: {
            errorMessage: 'Designation Name is required',
            options: { min: 3 }
        },
        custom: {
            options: (value, { req }) => {
                return new Promise((resolve, reject) => {
                    let whereCondition = { title: value };
                    designationServices.findOne(whereCondition).then(user => {
                        if (user === null) {
                            resolve(true);
                        } else {
                            reject('Designation Name already exists');
                        }
                    }).catch(() => {
                        resolve(true);
                    });
                });
            }
        }
    },
});

module.exports = { createDesignationValidation };