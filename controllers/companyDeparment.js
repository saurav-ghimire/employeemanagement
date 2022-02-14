let featureService = require("../services/featureServices");
let departments = {
    departmentPage: async function (req, res, next) {
        res.render('feature/departments');
    },
    departmentSave: async function (req, res, next) {
        await featureService.departmentSave(req.body)
        req.flash('success_msg', 'Department Added Successfully');
        return res.redirect('/departments')
    }
}
module.exports = departments;