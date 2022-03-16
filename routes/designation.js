var express = require('express');
var router = express.Router();
let companyController = require("../controllers/companyDesignation");
let { createDesignationValidation } = require("../validators/designationValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");
const designation = require('../models/designation');
let { checkPermission } = require("../middleware/permissionMiddleware");

/* GET designation listing page. */
router.get('/', [checkPermission('designation.create')], companyController.designationPage);

// get designation add page
router.get('/add', [checkPermission('designation.create'), isLoggedIn], companyController.addPage);

router.post('/add', [checkPermission('designation.create'), isLoggedIn, createDesignationValidation], companyController.addDesignation);

// designation delete
router.delete('/:id', [checkPermission('designation.delete')], companyController.designationDelete);

// show designation edit page
router.get('/edit/:id', [checkPermission('designation.edit'), isLoggedIn], companyController.designationEdit);
// update designation
router.put('/edit/:id', [checkPermission('designation.edit'), isLoggedIn, createDesignationValidation], companyController.designationUpdate);

module.exports = router;
