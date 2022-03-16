var express = require('express');
var router = express.Router();
let passport = require("passport");
let userController = require("../controllers/userController");
let companyController = require("../controllers/companyEmployee");
let { createUserValidation } = require("../validators/userValidator");
let { createEmployeeValidation } = require("../validators/employeeValidators");
let { createUpdateEmployeeValidation } = require("../validators/updateEmployeeValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");
let { checkPermission } = require("../middleware/permissionMiddleware");

/* GET Employee listing page. */
router.get('/', [checkPermission('employees.view')], companyController.employeeList);

// get employee add page
router.get('/add', [checkPermission('employees.create'), isLoggedIn], companyController.addPage);

// insert employee data
router.post('/add', [checkPermission('employees.create'), isLoggedIn, createEmployeeValidation], companyController.createEmployee);

// for delete
router.delete('/delete/:id', [checkPermission('employees.delete'), isLoggedIn], companyController.delete);

// get edit page
router.get('/edit/:id', [checkPermission('employees.edit'), isLoggedIn], companyController.updatePage);

router.put('/update/:id', [checkPermission('employees.edit'), isLoggedIn, createUpdateEmployeeValidation], companyController.update)
module.exports = router;
