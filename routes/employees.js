var express = require('express');
var router = express.Router();
let passport = require("passport");
let userController = require("../controllers/userController");
let companyController = require("../controllers/companyEmployee");
let { createUserValidation } = require("../validators/userValidator");
let { createEmployeeValidation } = require("../validators/employeeValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");

/* GET Employee listing page. */
router.get('/', companyController.employeeList);

// get employee add page
router.get('/add', [isLoggedIn], companyController.addPage);

// insert employee data
router.post('/add', [isLoggedIn, createEmployeeValidation], companyController.createEmployee);

module.exports = router;
