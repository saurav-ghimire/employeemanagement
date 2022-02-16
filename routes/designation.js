var express = require('express');
var router = express.Router();
let companyController = require("../controllers/companyDesignation");
let { createDesignationValidation } = require("../validators/designationValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");
const designation = require('../models/designation');

/* GET designation listing page. */
router.get('/', companyController.designationPage);

// get designation add page
router.get('/add', [isLoggedIn], companyController.addPage);

router.post('/add', [isLoggedIn, createDesignationValidation], companyController.addDesignation);

// designation delete
router.delete('/:id', companyController.designationDelete);

// show designation edit page
router.get('/edit/:id', [isLoggedIn], companyController.designationEdit);
// update designation
router.put('/edit/:id', [isLoggedIn, createDesignationValidation], companyController.designationUpdate);

module.exports = router;
