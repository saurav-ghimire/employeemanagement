const { validationResult } = require('express-validator');
let { mkDirByPathSync, removeFile } = require("../helper/commonHelper");
let randtoken = require('rand-token');

let userService = require("../services/userService");
let { sendMail } = require("../services/emailService");

// for register page
let register = async function (req, res, next) {
    return res.render('auth/register');
}

// for login page
let signinPage = async function (req, res, next) {
    return res.render('auth/login');
}

let signin = async function (req, res, next) {

    return res.redirect("/dashboard");
}

let logout = async function (req, res, next) {
    req.logout();
    req.flash('error_msg', 'You have been logged out.');
    return res.redirect("/login");
}


// for saving
let saveUsers = async function (req, res, next) {
    try {
        // get data from the form and save in database
        // after saving redirect to home page
        const errors = validationResult(req);
        let userData = req.body
        if (!errors.isEmpty()) {
            req.flash('inputData', userData);
            req.flash('errors', errors.array());
            return res.redirect('/register');
        }

        let token = randtoken.generate(10);
        userData.token = token;
        userData.tokenExpiry = new Date().getTime() + (1 * 60 * 60 * 1000);
        let store = await userService.saveUser(userData);
        let activationLink = "<a href='http://localhost:5000/auth/" + token + "/verify'>Click To Activate</a>";

        let emailDetails = {
            to: userData.email,
            subject: "Activate Account",
            html: "Dear " + userData.name + ", Your account created in our application. Please click below link to activate your account.<br><br>" + activationLink + "<br><br>Thank you.",
        }
        await sendMail(emailDetails);


        req.flash('success_msg', 'User created successfully');
        return res.redirect('/register');
    }
    catch (err) {

        console.log('Actual Error: ', err);

        // req.flash('errors', 'User registration failed');
        return res.redirect('/register');
    }

}
let verifyAccount = async function (req, res, next) {
    let token = req.params.token;
    let user = await userService.findOne({ token: token });
    if (!user) {
        req.flash("error_msg", "Token is invalid");
        return res.redirect("/register");
    }
    if (user.tokenExpiry < new Date()) {
        req.flash("error_msg", "Token is expired");
        return res.redirect("/register");
    }
    let updateData = {
        status: "active",
        token: "",
        tokenExpiry: null
    }

    await userService.findOneAndUpdateService({ _id: user._id }, updateData);
    req.flash("success_msg", "Your account is activated. Please login to continue.");
    return res.redirect("/register");
}

// profile page
let profilepage = async function (req, res, next) {
    res.render('./profile', { userdetails: req.user });
}
let profileedit = async function (req, res, next) {
    res.render('./profile-edit', { userInfo: req.user });
}
let profileUpdate = async function (req, res, next) {
    let id = req.params.id;
    let user = await userService.findOne({ _id: id });

    let updateData = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
    };
    if (req.files) {
        let dir = "public/uploads/";
        mkDirByPathSync(dir); // It will automatically create directory if missing
        let image = req.files.image;
        let imageName = image.name;
        let imageNameSplit = imageName.split(".");
        let updatedName = "";
        let ext;
        for (let i = 0; i < imageNameSplit.length; i++) {
            let name = imageNameSplit[i];
            if (i == (imageNameSplit.length - 1)) {
                ext = name;
            } else {
                if (i == 0) {
                    updatedName = name;
                } else {
                    updatedName = updatedName + "-" + name;
                }
            }
        }
        imageName = updatedName + "-" + randtoken.generate(5); // concat random string to name
        imageName = imageName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() + "." + ext;

        // save image
        image.mv(dir + imageName, function (err) {
            if (err) { imageName = ''; }
        });

        if (user.image) {
            removeFile(dir + user.image);
        }
        updateData['image'] = imageName;
    }
    let data = await userService.findOneAndUpdateService({ _id: req.params.id }, updateData);
    req.flash('success_msg', "Profile Updated Successfully.");
    res.redirect('/profile-edit');
}
let forgetPage = async function (req, res, next) {
    res.render('forgetpassword');
}
let forgetSendEmail = async function (req, res, next) {
    let email = req.body.email;
    let userData = await userService.findOne({ email: email });
    if (!userData) {
        req.flash('error_msg', "User Not Found");
        res.redirect('forgetpassword');
    } else {
        let token = randtoken.generate(10);
        userData.token = token;
        userData.tokenExpiry = new Date().getTime() + (1 * 60 * 60 * 1000);
        let activationLink = "<a href='http://localhost:5000/reset/" + token + "'>Click To Reset your password</a>";

        let emailDetails = {
            to: userData.email,
            subject: "Reset Account",
            html: "Dear " + userData.name + ", To reset your account please click below link.<br><br>" + activationLink + "<br><br>Thank you.",
        }
        await sendMail(emailDetails);
        let updateData = {
            token: token,
            tokenExpiry: new Date().getTime() + (1 * 60 * 60 * 1000)
        };
        await userService.findOneAndUpdateService({ email: req.body.email }, updateData);
        req.flash('success_msg', 'Reset Link has been Sent in your email');
        return res.redirect('/forgetpassword');
    }

}
module.exports = {
    register,
    signinPage,
    saveUsers,
    verifyAccount,
    signin,
    logout,
    profilepage,
    profileedit,
    profileUpdate,
    forgetPage,
    forgetSendEmail
}