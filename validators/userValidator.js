
const { checkSchema } = require('express-validator');
let userService = require("../services/userService");

let createUserValidation = checkSchema({
    'name': {
        isLength: {
            errorMessage: 'Name is required',
            options: { min: 1 }
        }
    },
    'email': {
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
                    let whereCondition = { email: value };
                    userService.findOne(whereCondition).then(user => {
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
    'password': {
        custom: {
            options: (value, { req }) => {
                if (value === '' || value == undefined) {
                    throw new Error('Password is required');
                } else {
                    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;

                    if (regex.test(value)) {
                        return true;
                    } else {
                        throw new Error('Minimum eight characters Password, at least one letter and one number', 'password', 422);
                    }
                }
            }
        }
    },
});

module.exports = { createUserValidation };