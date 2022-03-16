const { validationResult } = require('express-validator');
let { mkDirByPathSync, removeFile } = require("../helper/commonHelper");
let randtoken = require('rand-token');

let userService = require("../services/userService");
let { sendMail } = require("../services/emailService");
const { isValidObjectId } = require('mongoose');


// for saving
let Save = async function (req, res, next) {
    try {
        // get data from the form and save in database
        // after saving redirect to home page
        const errors = validationResult(req);
        let userData = req.body
        if (!errors.isEmpty()) {
            req.flash('inputData', userData);
            req.flash('errors', errors.array());
            return res.redirect('/users/add');
        }

        let token = randtoken.generate(10);
        userData.token = token;
        userData.tokenExpiry = new Date().getTime() + (1 * 60 * 60 * 1000);

        let store = await userService.saveUser(userData);
        let activationLink = "<a href='http://localhost:5000/users/cms/auth/" + token + "/verify'>Click To Activate</a>";

        let emailDetails = {
            to: userData.email,
            subject: "Activate Account",
            html: "Dear " + userData.name + ", Your account created in our application. Please click below link to activate your account.<br><br>" + activationLink + "<br><br>Thank you.",
        }
        await sendMail(emailDetails);


        req.flash('success_msg', 'User created successfully');
        return res.redirect('/users/add');
    }
    catch (err) {

        console.log('Actual Error: ', err);

        // req.flash('errors', 'User registration failed');
        return res.redirect('/users/add');
    }
}

let verifyAccount = async function (req, res, next) {
    let token = req.params.token;
    let user = await userService.findOne({ token: token });
    if (!user) {
        req.flash("error_msg", "Token is invalid");
        return res.redirect('/users/add');
    }
    if (user.tokenExpiry < new Date()) {
        req.flash("error_msg", "Token is expired");
        return res.redirect('/users/add');
    }
    let updateData = {
        status: "active",
        token: "",
        tokenExpiry: null
    }

    await userService.findOneAndUpdateService({ _id: user._id }, updateData);
    req.flash("success_msg", "Your account is activated. Please login to continue.");
    return res.redirect('/users/add');
}
let listing = async function (req, res, next) {
    let store = await userService.findAll({});
    res.render('users/index', { userslist: store });
}
let deleteUser = async function (req, res, next) {
    await userService.deleteOne({ _id: req.params.id });
    req.flash("success_msg", "Account Deleted Successfully");
    res.redirect('/users/');
}
module.exports = {
    verifyAccount,
    Save,
    listing,
    deleteUser
}