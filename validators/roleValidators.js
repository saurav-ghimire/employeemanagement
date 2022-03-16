
const { checkSchema } = require('express-validator');

let roleValidation = checkSchema({

    'name': {
        isLength: {
            errorMessage: 'Role Name is required',
            options: { min: 3 }
        }
    },
    'slug': {
        isLength: {
            errorMessage: 'Slug is required',
            options: { min: 3 }
        }
    },
});

module.exports = { roleValidation };