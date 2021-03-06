let mongoose = require('mongoose');

let dbConnection = async () => {
    mongoose.Promise = global.Promise;
    mongoose.set('returnOriginal', true);
    console.log(process.env.MONGO_CONNECTION);
    await mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch(err => {
            console.error("***** Error while connecting database: " + err.message + " *****");
        });
};

dbConnection();