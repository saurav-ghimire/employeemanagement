let LocalStrategy = require("passport-local");
let User = require("../models/user");

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ email: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false, "Password does not match");
                }
                if (user.status == "inactive") {
                    return done(null, false, "Account is not active. Please activate your account first.");
                }
                return done(null, user);
            });
        }
    ));
};