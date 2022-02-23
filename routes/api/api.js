var express = require('express');
var router = express.Router();
let employee = require('../../services/employeeService')
router.get('/test', async function (req, res, next) {
    return res.json({ data: "this is jason test" })
})
router.get('/employee', async function (req, res, next) {
    try {
        let employeeList = await employee.findAll({});

        return res.json({ "message": employeeList });
    } catch (err) {
        return res.status(500).json({ status: 'error', message: err.message, error: err });
    }
})
module.exports = router;