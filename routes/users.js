var express = require('express');
var router = express.Router();
let userContoller = require("../controllers/customUser");
let { createUserValidation } = require("../validators/userValidator");

/* GET users listing. */
router.get('/', userContoller.listing);
router.get('/add', async function (req, res, next) {
  res.render('users/add');
});

router.post('/add', [createUserValidation], userContoller.Save);

router.get('/cms/auth/:token/verify', userContoller.verifyAccount);

router.delete('/delete/:id', userContoller.deleteUser)

module.exports = router;
