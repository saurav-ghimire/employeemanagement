const { groupBy, isEmpty } = require('lodash');
let roleService = require("../services/roleService");
const modules = require('../config/cmsConfig').modules;
const { validationResult } = require('express-validator');
const { count } = require('../models/user');
let roleController = {};

roleController.index = async (req, res, next) => {
    let roles = await roleService.findAll({});
    return res.render('role/index', { data: roles });
}

roleController.add = async (req, res, next) => {
    const permissions = await roleService.findPermissions();

    const permission = groupBy(permissions, 'module');
    let allPermissions = {};
    for (let key in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, key) && Object.prototype.hasOwnProperty.call(permission, key)) {
            allPermissions[key] = permission[key];
        }
    }
    return res.render('role/add', { permissions: allPermissions });
}

roleController.addRole = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        let userData = req.body
        // console.log(userData);
        if (!errors.isEmpty()) {
            req.flash('inputData', userData);
            req.flash('errors', errors.array());
            return res.redirect('role/add');
        }
        const permissions = await roleService.findPermissions();

        const permission = groupBy(permissions, 'module');
        let allPermissions = {};
        for (let key in modules) {
            if (Object.prototype.hasOwnProperty.call(modules, key) && Object.prototype.hasOwnProperty.call(permission, key)) {
                allPermissions[key] = permission[key];
            }
        }
        let role = await roleService.create(req.body);
        req.flash('success_msg', 'Role created Successfully');
        return res.redirect('/roles/add');
    } catch (err) {
        next(err);
    }

}

roleController.edit = async (req, res, next) => {
    id = req.params.id;
    let store = await roleService.findOne({ _id: id });
    const permissions = await roleService.findPermissions();

    const permission = groupBy(permissions, 'module');
    let allPermissions = {};
    for (let key in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, key) && Object.prototype.hasOwnProperty.call(permission, key)) {
            allPermissions[key] = permission[key];
        }
    }


    res.render("role/edit", { data: store, permissions: allPermissions });
}


roleController.update = async (req, res, next) => {
    let id = req.params.id;
    console.log(req.body)
    try {
        let store = await roleService.findOne({ _id: id });
        const permissions = await roleService.findPermissions();

        const permission = groupBy(permissions, 'module');
        let allPermissions = {};
        for (let key in modules) {
            if (Object.prototype.hasOwnProperty.call(modules, key) && Object.prototype.hasOwnProperty.call(permission, key)) {
                allPermissions[key] = permission[key];
            }
        }
        req.flash('success_msg', 'Role clicked Successfully');

        res.redirect("/role/edit/" + id, { data: store, permissions: allPermissions });

    }
    catch (err) {
        next(err);
    }
}

roleController.deleteRole = (req, res, next) => {
    let id = req.params.id;
    roleService.deleteOne({ _id: id });
    req.flash('success_msg', 'Role Deleted Successfully');
    res.redirect("/roles");
}

module.exports = roleController;