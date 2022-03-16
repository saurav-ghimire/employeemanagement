var express = require('express');
var router = express.Router();
let passport = require("passport");
let userController = require("../controllers/userController");
let companyController = require("../controllers/companyDeparment");
let { createUserValidation } = require("../validators/userValidator");
let { createDepartmentValidation } = require("../validators/departmentValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");
const department = require('../models/department');
let { checkPermission } = require("../middleware/permissionMiddleware");

/* GET home page. */
router.get('/', [isLoggedIn], userController.dashboard);
router.get('/dashboard', [isLoggedIn], userController.dashboard);

// register page
router.get('/register', userController.register);
// register save
router.post('/register', [createUserValidation], userController.saveUsers)

// verify token
router.get('/auth/:token/verify', userController.verifyAccount);

// login
router.get('/login', userController.signinPage);

router.post('/auth/login', async (req, res, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (!user) {
      let msg = info && info.message ? info.message : 'Incorrect Email/Password';
      req.flash('error_msg', msg);
      return res.redirect('/login');
    }
    return req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

// 403
router.get('/403', async function (req, res, next) {
  res.render("403")
})

// logout
router.get('/logout', userController.logout);

// profile Details
router.get('/profile', [isLoggedIn], userController.profilepage);

// profile edit
router.get('/profile-edit', [isLoggedIn], userController.profileedit);

// profile update
router.put('/profileupdate/:id', [isLoggedIn], userController.profileUpdate);

// forget page
router.get('/forgetpassword', [createUserValidation], userController.forgetPage);

router.post('/forget', [createUserValidation], userController.forgetSendEmail);

router.get('/reset', async function (req, res, next) {
  res.sendStatus(403)
});

router.get('/reset/:token', [createUserValidation], userController.resetPage);

router.put('/reset/:token', [createUserValidation], userController.changePassword);

// company details
// -------------------------

// department page
router.get('/departments', [checkPermission('departments.view'), isLoggedIn], companyController.departmentPage);

// department save
router.post('/departments', [checkPermission('departments.create'), isLoggedIn, createDepartmentValidation], companyController.departmentSave);

// department list page
router.get('/departments-list', [checkPermission('departments.view'), isLoggedIn], companyController.departmentList);

// department edit page
router.get('/departments-edit/:id', [checkPermission('departments.edit'), isLoggedIn], companyController.departmentEdit);

// department update
router.put('/departments-edit/:id', [checkPermission('departments.edit'), isLoggedIn, createDepartmentValidation], companyController.departmentUpdate);

// department delete
router.delete('/departments-delete/:id', [checkPermission('departments.delete')], companyController.departmentDelete);
module.exports = router;
