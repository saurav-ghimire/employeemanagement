let router = require('express').Router();

let roleController = require("../controllers/roleController");
let { checkPermission } = require("../middleware/permissionMiddleware");

router.get('/', roleController.index);

router.get('/add', roleController.add);

router.post('/add', [checkPermission('roles.create')], roleController.addRole);

router.get('/:id/edit', [checkPermission('roles.edit')], roleController.edit);

router.post('/:id/edit', [checkPermission('roles.edit')], roleController.editRole);

router.delete('/:id/delete', [checkPermission('roles.delete')], roleController.deleteRole);

module.exports = router;