var express = require('express');
var router = express.Router();
let passport = require("passport");
let userController = require("../controllers/userController");
let { createUserValidation } = require("../validators/userValidator");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");
const { get } = require('mongoose');

/* GET home page. */
router.get('/', [isLoggedIn], function (req, res, next) {
  res.render('index', { title: 'Welcome to home page', name: req.user.name });
});

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

// logout
router.get('/logout', userController.logout);

// profile Details
router.get('/profile', [isLoggedIn], userController.profilepage);

// profile edit
router.get('/profile-edit', [isLoggedIn], userController.profileedit);

// profile update
router.put('/profileupdate/:id', [isLoggedIn], userController.profileUpdate);

// forget page
router.get('/forgetpassword', userController.forgetPage);

router.post('/forget', userController.forgetSendEmail);

router.get('/reset/:token', async function (req, res, next) {
  console.log(req.params.token);
})

module.exports = router;
