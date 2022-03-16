let router = require('express').Router();
let roleController = require("../controllers/roleController");
let { checkPermission } = require("../middleware/permissionMiddleware");
let { roleValidation } = require("../validators/roleValidators");
let { isLoggedIn } = require("../middleware/authenticateMiddleware");

router.get('/', [checkPermission('roles.view'), isLoggedIn], roleController.index);

router.get('/add', [checkPermission('roles.create'), isLoggedIn], roleController.add);

router.post('/add', [checkPermission('roles.create'), isLoggedIn], roleController.addRole);

router.get('/edit/:id', [checkPermission('roles.edit'), isLoggedIn], roleController.edit);

router.put('/edit/:id', [checkPermission('roles.edit'), isLoggedIn], roleController.update);

router.delete('/:id', [checkPermission('roles.delete'), isLoggedIn], roleController.deleteRole);

module.exports = router;